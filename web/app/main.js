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
	miniMap: {
		scale: 8,
		id: 'mimimap'
	},

	init: function(){
		// init map
		maps.init();

		// draw minimap
		this.drawMiniMap();	
	},

	drawMiniMap: function() {

        var mapDiv = $("<div class='map'></div>");
        var mapCanvas = $('<canvas width="' + maps.active.width * this.miniMap.scale +
            '" height="' + maps.active.height * this.miniMap.scale + '"></canvas>');
        var ctx = mapCanvas[0].getContext('2d');

		for (var y=0; y < maps.active.height; y++) {
			for (var x=0; x < maps.active.width; x++) {
				var wall = maps.levels[maps.active.level][y][x];

				if (wall > 0) {
					colorValue = wall * 15;
                    ctx.fillStyle = 'rgb(' + colorValue + ',' + colorValue + ',' + colorValue + ')';

					ctx.fillRect(
						x * this.miniMap.scale,
						y * this.miniMap.scale,
						this.miniMap.scale, this.miniMap.scale
					);
				}
			}
		}

		mapDiv.append(mapCanvas);
        $('#minimap').append(mapDiv);
	},



}

game.init();