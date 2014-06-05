var miniMap = {

    scale: 8,
    div: null,
    ctx: null,
    canvas: null,

	init: function() {

        this.div = $("<div class='map'></div>");
        this.canvas = $('<canvas width="' + maps.active.width * this.scale +
            '" height="' + maps.active.height * this.scale + '"></canvas>');
        this.ctx = this.canvas[0].getContext('2d');

 		this.update();

        this.div.append(this.canvas);
        $('.viewport').append(this.div);

        console.log(':: miniMap initialized');
    },

    update: function(){
    	for (var y=0; y < maps.active.height; y++) {
            for (var x=0; x < maps.active.width; x++) {
                var wall = maps.levels[maps.active.level][y][x];
                if (wall > 0) {
                    colorValue = wall * 15;
                    this.ctx.fillStyle = 'rgb(' + colorValue + ',' + colorValue + ',' + colorValue + ')';

                    this.ctx.fillRect(
                        x * this.scale,
                        y * this.scale,
                        this.scale, this.scale
                    );
                }
            }
        }

        // render player position
    },
}