var render = {

	screenStrips: [],
	screenWidth: 320,
	screenHeight: 200,
	stripWidth: 2,
	fov: 60 * Math.PI / 180,
	numRays: Math.ceil(this.screenWidth / this.stripWidth),
	fovHalf: this.fov / 2,
	viewDist: (this.screenWidth/2) / Math.tan((this.fov / 2)),
	twoPI: Math.PI * 2,
	numTextures: 4,
		
	init: function(){
		var screen = document.getElementById('screen');

		for (var i=0; i < this.screenWidth; i+=this.stripWidth) {
			var strip = dc('div');
			strip.style.position = 'absolute';
			strip.style.left = i + 'px';
			strip.style.width = this.stripWidth + 'px';
			strip.style.height = '0px';
			strip.style.overflow = 'hidden';

			var img = new Image();
			img.src = 'media/images/walls/walls.png';
			img.style.position = 'absolute';
			img.style.left = '0px';

			strip.appendChild(img);
			// Assign the image to a property on the strip element
			// so we have easy access to the image later
			strip.img = img;

			screenStrips.push(strip);
			screen.appendChild(strip);
		}
		console.log(':: rendering inicialized');
	},

	castRays: function() {
		var stripIdx = 0;
		for (var i=0; i < this.this.numRays; i++) {
			// Where on the screen does ray go through?
			var rayScreenPos = (-this.this.numRays/2 + i) * this.stripWidth;

			// The distance from the viewer to the point
			// on the screen, simply Pythagoras.
			var rayViewDist = Math.sqrt(rayScreenPos*rayScreenPos + this.viewDist*this.viewDist);

			// The angle of the ray, relative to the viewing direction
			// Right triangle: a = sin(A) * c
			var rayAngle = Math.asin(rayScreenPos / rayViewDist);
			this.castSingleRay(
				// Add the players viewing direction
				// to get the angle in world space
				player.rot + rayAngle,
				stripIdx++
			);
		}
	},

	castSingleRay: function(rayAngle) {
		
		// first make sure the angle is between 0 and 360 degrees
		rayAngle %= twoPI;
		if (rayAngle < 0) rayAngle += twoPI;

		// moving right/left? up/down? Determined by which quadrant the angle is in.
		var right = (rayAngle > twoPI * 0.75 || rayAngle < twoPI * 0.25);
		var up = (rayAngle < 0 || rayAngle > Math.PI);

		var wallType = 0;

		// only do these once
		var angleSin = Math.sin(rayAngle);
		var angleCos = Math.cos(rayAngle);

		var dist = 0;	// the distance to the block we hit
		var xHit = 0; 	// the x and y coord of where the ray hit the block
		var yHit = 0;

		var textureX;	// the x-coord on the texture of the block, ie. what part of the texture are we going to render
		var wallX;	// the (x,y) map coords of the block
		var wallY;

		var wallIsHorizontal = false;

		// first check against the vertical map/wall lines
		// we do this by moving to the right or left edge of the block we're standing in
		// and then moving in 1 map unit steps horizontally. The amount we have to move vertically
		// is determined by the slope of the ray, which is simply defined as sin(angle) / cos(angle).

		var slope = angleSin / angleCos; 	// the slope of the straight line made by the ray
		var dXVer = right ? 1 : -1; 	// we move either 1 map unit to the left or right
		var dYVer = dXVer * slope; 	// how much to move up or down

		var x = right ? Math.ceil(player.x) : Math.floor(player.x);	// starting horizontal position, at one of the edges of the current map block
		var y = player.y + (x - player.x) * slope;			// starting vertical position. We add the small horizontal step we just made, multiplied by the slope.

		while (x >= 0 && x < mapWidth && y >= 0 && y < mapHeight) {
			var wallX = Math.floor(x + (right ? 0 : -1));
			var wallY = Math.floor(y);

			// is this point inside a wall block?
			if (map[wallY][wallX] > 0) {
				var distX = x - player.x;
				var distY = y - player.y;
				dist = distX*distX + distY*distY;	// the distance from the player to this point, squared.

				wallType = map[wallY][wallX]; // we'll remember the type of wall we hit for later
				textureX = y % 1;	// where exactly are we on the wall? textureX is the x coordinate on the texture that we'll use later when texturing the wall.
				if (!right) textureX = 1 - textureX; // if we're looking to the left side of the map, the texture should be reversed

				xHit = x;	// save the coordinates of the hit. We only really use these to draw the rays on minimap.
				yHit = y;

				wallIsHorizontal = true;

				break;
			}
			x += dXVer;
			y += dYVer;
		}



		// now check against horizontal lines. It's basically the same, just "turned around".
		// the only difference here is that once we hit a map block, 
		// we check if there we also found one in the earlier, vertical run. We'll know that if dist != 0.
		// If so, we only register this hit if this distance is smaller.

		var slope = angleCos / angleSin;
		var dYHor = up ? -1 : 1;
		var dXHor = dYHor * slope;
		var y = up ? Math.floor(player.y) : Math.ceil(player.y);
		var x = player.x + (y - player.y) * slope;

		while (x >= 0 && x < mapWidth && y >= 0 && y < mapHeight) {
			var wallY = Math.floor(y + (up ? -1 : 0));
			var wallX = Math.floor(x);
			if (map[wallY][wallX] > 0) {
				var distX = x - player.x;
				var distY = y - player.y;
				var blockDist = distX*distX + distY*distY;
				if (!dist || blockDist < dist) {
					dist = blockDist;
					xHit = x;
					yHit = y;

					wallType = map[wallY][wallX];
					textureX = x % 1;
					if (up) textureX = 1 - textureX;
				}
				break;
			}
			x += dXHor;
			y += dYHor;
		}

		if (dist) {
			//drawRay(xHit, yHit);

			var strip = screenStrips[stripIdx];

			dist = Math.sqrt(dist);

			// use perpendicular distance to adjust for fish eye
			// distorted_dist = correct_dist / cos(relative_angle_of_ray)
			dist = dist * Math.cos(player.rot - rayAngle);

			// now calc the position, height and width of the wall strip

			// "real" wall height in the game world is 1 unit, the distance from the player to the screen is viewDist,
			// thus the height on the screen is equal to wall_height_real * viewDist / dist

			var height = Math.round(viewDist / dist);

			// width is the same, but we have to stretch the texture to a factor of stripWidth to make it fill the strip correctly
			var width = height * stripWidth;

			// top placement is easy since everything is centered on the x-axis, so we simply move
			// it half way down the screen and then half the wall height back up.
			var top = Math.round((screenHeight - height) / 2);

			strip.style.height = height+"px";
			strip.style.top = top+"px";

			strip.img.style.height = Math.floor(height * numTextures) + "px";
			strip.img.style.width = Math.floor(width*2) +"px";
			strip.img.style.top = -Math.floor(height * (wallType-1)) + "px";

			var texX = Math.round(textureX*width);

			if (texX > width - stripWidth)
				texX = width - stripWidth;

			strip.img.style.left = -texX + "px";

		}
	},


	render: function(){
		
	}   
}