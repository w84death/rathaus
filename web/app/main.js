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
    },

    init: function(){
        // init map
        maps.init();
        this.bindKeys();

        // draw minimap
        this.drawMiniMap();

        // main cycle
        this.gameCycle();
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
        $('.viewport').append(mapDiv);
    },

    bindKeys: function() {
        document.onkeydown = function(e) {
            e = e || window.event;
            // Which key was pressed?
            switch (e.keyCode) {
                // Up, move player forward, ie. increase speed
                case 38:
                    player.speed = 1; break;
                // Down, move player backward, set negative speed
                case 40:
                    player.speed = -1; break;
                // Left, rotate player left
                case 37:
                    player.dir = -1; break;
                // Right, rotate player right
                case 39:
                    player.dir = 1; break;
            }
        }
        // Stop the player movement/rotation
        // when the keys are released
        document.onkeyup = function(e) {
            e = e || window.event;
            switch (e.keyCode) {
                case 38:
                case 40:
                    player.speed = 0; break;
                case 37:
                case 39:
                    player.dir = 0; break;
            }
        }
    },

    gameCycle: function() {
        player.move();
        
        // DEBUG STUFF
        player.debug();
        setTimeout(game.gameCycle,1000/30); // Aim for 30 FPS
    }


}

game.init();