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

    init: function(){
        // init map
        maps.init();
        miniMap.init();
        render.init();
        enemies.initEnemies();

        this.bindKeys();
        console.log(':: game initialized');
        
        console.log(':: starting game cycle..');
        this.gameCycle();
    },
    lastUpdate: Date.now(),
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
                case 78:
                    maps.nextMap();
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
        render.render();

        var now = Date.now();
        var dt = now - this.lastUpdate;
        enemies.ai(dt);
        enemies.renderEnemies();

        setTimeout(game.gameCycle,1000/30); // Aim for 30 FPS
    }


}

game.init();