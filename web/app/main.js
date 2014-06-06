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

    STATE: 'menu',
    audio: true,
    lastMap: 1,

    init: function(){
        sounds.playAmbient();
        // init map
        maps.init();
        miniMap.init();
        hud.init();
        render.init();
        audio.init();

        this.bindKeys();
        console.log(':: game initialized');

        console.log(':: starting game cycle..');
        this.gameCycle();

    },
    lastUpdate: Date.now(),
    bindKeys: function() {
        document.onkeydown = function(e) {
            if(game.STATE == 'game'){
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
        }
        // Stop the player movement/rotation
        // when the keys are released
        document.onkeyup = function(e) {
            e = e || window.event;
            if(game.STATE == 'game'){
                switch (e.keyCode) {
                    case 78:
                        game.nextMap(); break;
                    case 38:
                    case 40:
                        player.speed = 0; break;
                    case 37:
                    case 39:
                        player.dir = 0; break;
                    case 77:
                        game.goToMenu(); break;
                    case 27:
                        game.goToMenu(); break;
                }
            }
            if(game.STATE == 'menu'){
                switch (e.keyCode) {
                    case 13:
                        game.startGame(); break;
                }
            }
        }
    },

    goToMenu: function(){
        document.getElementById('minimap').style.display = 'none';
        document.getElementById('menu').style.display = 'block';
        document.getElementById('rat').style.display = 'none';
        document.getElementById('currentItem').style.display = 'none';
        document.getElementById('description').style.display = 'none';
        this.STATE = 'menu';
    },

    nextMap: function(){
        maps.nextMap();
        hud.reset();
    },

    startGame: function(){
        document.getElementById('minimap').style.display = 'block';
        document.getElementById('menu').style.display = 'none';
        document.getElementById('rat').style.display = 'block';
        if(hud.isDescription){
            document.getElementById('description').style.display = 'block';
        }
        if(player.item){
            document.getElementById('currentItem').style.display = 'block';
        }
        game.STATE = 'game';
        if(maps.active.level === 0){
            maps.nextMap();
        }
        hud.reset();
    },

    gameCycle: function() {
        player.move();
        render.render();

        var now = Date.now();
        var dt = now - this.lastUpdate;
        enemies.ai(dt);

        setTimeout(game.gameCycle,1000/30);
    }
}

game.init();