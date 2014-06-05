/*
    ----------------------------------------------------------------------------

        HACKATHON
        RATHAUS

        abstract: HTML5 Canvas 2D Turn-based Game Engine
        created: 05-06-2015
        licence: do what you want and dont bother us

    ----------------------------------------------------------------------------
*/

var game = {

	STATE: 'game',
	minimap: {
		scale: 8,
		canvas:null,
		ctx:null
	},

	init: function(){
		// init map
		maps.init();

		// draw minimap
		this.drawMiniMap();	
	},

	drawMiniMap: function() {

		this.miniMap.canvas = document.getElementById('minimap');
		this.miniMap.canvas.width = maps.active.width * this.miniMap.scale;
		this.miniMap.canvas.height = maps.active.height * this.miniMap.scale;		
        this.miniMap.ctx = this.miniMap.canvas.getContext('2d');

		for (var y=0; y < maps.active.height; y++) {
			for (var x=0; x < maps.active.width; x++) {
				var wall = maps.levels[maps.active.level][y][x];
				// If there is a wall block at this (x,y)…
				if (wall > 0) {
					ctx.fillStyle = 'rgb(200,200,200)';
					// …Then draw a block on the minimap
					ctx.fillRect(
						x * this.miniMap.scale,
						y * this.miniMap.scale,
						this.miniMap.scale, this.miniMap.scale
					);
				}
			}
		}
	},
}

game.init();