var enemies = {
    enemyTypes: [
        {
            img : 'media/images/enemies/mummy_color.png',
            moveSpeed : 0.09,
            rotSpeed : 1,
            totalStates : 5
        },
        {
            img : 'media/images/enemies/mummy.png',
            moveSpeed : 0.06,
            rotSpeed : 0.5,
            totalStates : 5
        },
        {
            img : 'media/images/enemies/metal_skeleton.png',
            moveSpeed : 0.1,
            rotSpeed : 2,
            totalStates : 5
        },
        {
            img : 'media/images/enemies/vampire.png',
            moveSpeed : 0.12,
            rotSpeed : 1,
            totalStates : 7
        },
        {
            img : 'media/images/enemies/cthulhu.png',
            moveSpeed : 0.03,
            rotSpeed : 0.1,
            totalStates : 5
        }
    ],

    mapEnemies: [],

    enemies: [],

    initEnemies: function() {
        var screen = document.getElementById('screen');
        for (var i=0; i < this.mapEnemies.length; i++) {
            var enemy = this.mapEnemies[i];
            var type = this.enemyTypes[enemy.type];
            var enemyCanvas = $('<div width="' + 1 +
            '" height="' + 1 + '" class="enemyWrapper"></div>');
            var img = document.createElement('img');
            img.src = type.img;
            enemyCanvas.css('position', 'absolute');
            enemyCanvas.css('display', 'none');
            enemyCanvas.css('overflow', 'hidden');

            enemy.state = 0;
            enemy.rot = 0;
            enemy.rotDeg = 0;
            enemy.dir = 0;
            enemy.speed = 0;
            enemy.moveSpeed = type.moveSpeed;
            enemy.rotSpeed = type.rotSpeed;
            enemy.totalStates = type.totalStates;
            enemy.oldStyles = {
                left : 0,
                top : 0,
                width : 0,
                height : 0,
                clip : '',
                display : 'none',
                zIndex : 0
            };
            enemy.img = img;
            enemy.canvas = enemyCanvas[0];
            enemies.enemies.push(enemy);
            enemyCanvas.append(img);
            screen.appendChild(enemyCanvas[0]);
        }
    },

    nextEnemiesFrame : function() {
        for (var i = enemies.enemies.length - 1; i >= 0; i--) {
            var newState = enemies.enemies[i].state + 1;

            if (newState == enemies.enemies[i].totalStates) {
                newState = 0;
            }

            enemies.enemies[i].state = newState;
        };
    },

    flushEnemies : function () {
        var oldEnemies = $('.enemyWrapper');
        oldEnemies.empty();
        oldEnemies.remove();
        this.enemies = [];
    },

    reloadMap: function() {
        /*for(var i=0; i<this.mapEnemies.length; i++){
            this.mapEnemies[i].parentNode.removeChild(this.mapEnemies[i]);
        }*/
        this.mapEnemies = maps.levels[maps.active.level].enemies;
        this.flushEnemies();
        this.initEnemies();
    },

    renderEnemies: function() {
        var viewDist = (render.screenWidth/2) / Math.tan((render.fov / 2));

        for (var i=0;i<this.enemies.length;i++) {
            var enemy = this.enemies[i];
            var img = enemy.img;
            var canvas = enemy.canvas;

            var dx = enemy.x - player.x;
            var dy = enemy.y - player.y;

            var angle = Math.atan2(dy, dx) - player.rot;

            if (angle < -Math.PI) angle += 2*Math.PI;
            if (angle >= Math.PI) angle -= 2*Math.PI;

            // is enemy in front of player? Maybe use the FOV value instead.
            if (angle > -render.fov && angle < render.fov) {
                var distSquared = dx*dx + dy*dy;
                var dist = Math.sqrt(distSquared);
                var size = viewDist / (Math.cos(angle) * dist);

                if (size <= 0) continue;

                var x = Math.tan(angle) * viewDist;

                var style = img.style;
                var canvasStyle = canvas.style;
                var oldStyles = enemy.oldStyles;

                // height is equal to the sprite size
                if (size != oldStyles.height) {
                    style.height = size + "px";
                    canvasStyle.height = size + "px";
                    oldStyles.height = size;
                }

                // width is equal to the sprite size times the total number of states
                var styleWidth = size * enemy.totalStates;
                if (styleWidth != oldStyles.width) {
                    style.width = styleWidth + "px";
                    canvasStyle.width = size + "px";
                    oldStyles.width = styleWidth;
                }

                // top position is halfway down the screen, minus half the sprite height
                var styleTop = ((render.screenHeight-size)/2);
                if (styleTop != oldStyles.top) {
                    style.top = styleTop + "px";
                    canvasStyle.top = styleTop + "px";
                    oldStyles.top = styleTop;
                }

                // place at x position, adjusted for sprite size and the current sprite state
                var styleLeft = (render.screenWidth/2 + x - size/2 - size*enemy.state);
                if (styleLeft != oldStyles.left) {
                    style.left = styleLeft + "px";
                    canvasStyle.left = ((render.screenWidth - size)/2 + x) + "px";
                    oldStyles.left = styleLeft;
                }

                var styleZIndex = 1000000 - ((distSquared*1000)>>0);
                if (styleZIndex != oldStyles.zIndex) {
                    style.zIndex = styleZIndex;
                    canvasStyle.zIndex = styleZIndex;
                    oldStyles.zIndex = styleZIndex;
                }

                var styleDisplay = "block";
                if (styleDisplay != oldStyles.display) {
                    style.display = styleDisplay;
                    canvasStyle.display = styleDisplay;
                    oldStyles.display = styleDisplay;
                }

                var styleClip = "rect(0, " + (100*(enemy.state + 1)) + ", 120, " + (size*(enemy.state)) + ")";

                if (styleClip != oldStyles.clip) {
                    style.marginLeft = (-size * enemy.state) + 'px';

                    style.clip = styleClip;
                    oldStyles.clip = styleClip;
                }

            } else {
                var styleDisplay = "none";
                if (styleDisplay != enemy.oldStyles.display) {
                    img.style.display = styleDisplay;
                    canvas.style.display = styleDisplay;
                    enemy.oldStyles.display = styleDisplay;
                }
            }
        }
    },

    ai: function() {
        for (var i=0; i < this.enemies.length; i++) {
            var entity = this.enemies[i];
            npcAi.think(entity);
            this.move(entity);
        }
    },
    isBlocking: function(x,y){
        if (y <= 0 || y >= maps.active.height || x <= 0 || x >= maps.active.width) {
            return true;
        }
        return (maps.levels[maps.active.level].walls[Math.floor(y)][Math.floor(x)] != 0);
    },
    move: function(enemy) {
        var moveStep = enemy.speed * enemy.moveSpeed;
        this.rot += enemy.rot * enemy.rotSpeed;

        var newX = enemy.x + Math.cos(enemy.rot) * moveStep;
        var newY = enemy.y + Math.sin(enemy.rot) * moveStep;

        if (this.isBlocking(newX, newY)) {
            // increase probability of reverse move
            probability.decrease(enemy);
            return
        } else {
            // increase probability of the same move
            probability.increase(enemy);
        }

        var pos = collision.checkCollision(enemy, newX, newY, 0.35);

        enemy.x = pos.x;
        enemy.y = pos.y;
    },
    debug: function(){
        console.log(enemies);
    },
}

setInterval(enemies.nextEnemiesFrame, 1000);