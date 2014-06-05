var render = {
	
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
		var screen = $('screen');
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
		// Make sure the angle is between 0 and 360 degrees
		rayAngle %= this.twoPI;
		if (rayAngle > 0) rayAngle += this.twoPI;

		// Moving right/left? up/down? Determined by
		// which quadrant the angle is in
		var right = (rayAngle > this.twoPI * 0.75 || rayAngle < this.twoPI * 0.25);
		var up = (rayAngle < 0 || rayAngle > Math.PI);

		var angleSin = Math.sin(rayAngle), angleCos = Math.cos(rayAngle);

		// The distance to the block we hit
		var dist = 0;
		// The x and y coord of where the ray hit the block
		var xHit = 0, yHit = 0;
		// The x-coord on the texture of the block,
		// i.e. what part of the texture are we going to render
		var textureX;
		// The (x,y) map coords of the block
		var wallX;
		var wallY;

		// First check against the vertical map/wall lines
		// we do this by moving to the right or left edge
		// of the block we’re standing in and then moving
		// in 1 map unit steps horizontally. The amount we have
		// to move vertically is determined by the slope of
		// the ray, which is simply defined as sin(angle) / cos(angle).

		// The slope of the straight line made by the ray
		var slope = angleSin / angleCos;
		// We move either 1 map unit to the left or right
		var dX = right ? 1 : -1;
		// How much to move up or down
		var dY = dX * slope;

		// Starting horizontal position, at one
		// of the edges of the current map block
		var x = right ? Math.ceil(player.x) : Math.floor(player.x);
		// Starting vertical position. We add the small horizontal
		// step we just made, multiplied by the slope
		var y = player.y + (x - player.x) * slope;

		while (x >= 0 && x < mapWidth && y >= 0 && y < mapHeight) {
			var wallX = Math.floor(x + (right ? 0 : -1));
			var wallY = Math.floor(y);

			// Is this point inside a wall block?
			if (map[wallY][wallX] > 0) {
				var distX = x - player.x;
				var distY = y - player.y;
				// The distance from the player to this point, squared
				dist = distX*distX + distY*distY;

				// Save the coordinates of the hit. We only really
				// use these to draw the rays on minimap
				xHit = x;
				yHit = y;
				break;
			}
			x += dX;
			y += dY;
		}

		// Horizontal run snipped,
		// basically the same as vertical run

		if (dist)
		drawRay(xHit, yHit);
	},

	render: function(){
		
	}   
}