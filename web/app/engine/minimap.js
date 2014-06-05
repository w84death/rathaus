var miniMap = {

    scale: 6,
    div: null,
    ctx: null,
    canvas: null,

	init: function() {

        this.div = $("<div class='minimap'></div>");
        this.canvas = $('<canvas width="' + maps.active.width * this.scale +
            '" height="' + maps.active.height * this.scale + '"></canvas>');
        this.ctx = this.canvas[0].getContext('2d');

 		this.update();

        this.div.append(this.canvas);
        $('.viewport').append(this.div);

        console.log(':: miniMap initialized');
    },

    update: function(){
        this.ctx.clearRect ( 0 , 0 , maps.active.width * this.scale , maps.active.height * this.scale );

        for (var y=0; y < maps.active.height; y++) {
            for (var x=0; x < maps.active.width; x++) {
                var wall = maps.levels[maps.active.level].walls[y][x];
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

        var startHandX = player.x + 0.25;
        var startHandY = player.y + 0.25;
        var endHandX = player.x + 0.25 + Math.cos(player.rot);
        var endHandY = player.y + 0.25 + Math.sin(player.rot);
        this.ctx.fillStyle = 'yellow';
        this.ctx.fillRect(
            player.x * this.scale,
            player.y * this.scale,
            this.scale * 0.5,
            this.scale * 0.5
        );
        this.ctx.strokeStyle = 'yellow';
        this.ctx.beginPath();
        this.ctx.moveTo(
            startHandX * this.scale,
            startHandY * this.scale
        );
        this.ctx.lineTo(
            endHandX * this.scale,
            endHandY * this.scale
        );
        for (var i = 0; i < maps.levels[maps.active.level].enemies.length; i++) {
            enemy = maps.levels[maps.active.level].enemies[i];
            this.ctx.fillStyle = 'red';
            this.ctx.fillRect(
            enemy.x * this.scale,
            enemy.y * this.scale,
            this.scale * 0.5,
            this.scale * 0.5
            );
        }
        this.ctx.stroke();

    },
}