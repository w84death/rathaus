var enemies = {
    enemyTypes: [
        {
            img : 'media/images/enemies/mummy_color.png',
            moveSpeed : 0.02,
            rotSpeed : 1,
            totalStates : 5
        },
        {
            img : 'media/images/enemies/mummy.png',
            moveSpeed : 0.01,
            rotSpeed : 0.5,
            totalStates : 5
        },
        {
            img : 'media/images/enemies/metal_skeleton.png',
            moveSpeed : 0.1,
            rotSpeed : 2,
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
            var img = document.createElement('img');
            img.src = type.img;
            img.style.display = 'none';
            img.style.position = 'absolute';

            enemy.state = 0;
            enemy.rot = 0;
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
            enemies.enemies.push(enemy);
            screen.appendChild(img);
        }
    },

    reloadMap: function() {
        this.mapEnemies = maps.levels[maps.active.level].enemies;
    },

    renderEnemies: function() {
        for (var i=0;i<enemies.length;i++) {
            var enemy = enemies[i];
            var img = enemy.img;
            var dx = enemy.x - player.x;
            var dy = enemy.y - player.y;
            // Angle relative to player direction
            var angle = Math.atan2(dy, dx) - player.rot;
            // Make angle from +/- PI
            if (angle < -Math.PI) angle += 2*Math.PI;
            if (angle >= Math.PI) angle -= 2*Math.PI;
            // Is enemy in front of player?
            if (angle > -Math.PI*0.5 && angle < Math.PI*0.5) {
                var distSquared = dx*dx + dy*dy;
                var dist = Math.sqrt(distSquared);
                var size = viewDist / (Math.cos(angle) * dist);
                var x = Math.tan(angle) * viewDist;
                var style = img.style;
                var oldStyles = enemy.oldStyles;

                // Height is equal to the sprite size
                if (size != oldStyles.height) {
                    style.height = size + 'px';
                    oldStyles.height = size;
                }
                // Width is equal to the sprite size
                // times the total number of states
                var styleWidth = size * enemy.totalStates;
                if (styleWidth != oldStyles.width) {
                    style.width = styleWidth + 'px';
                    oldStyles.width = styleWidth;
                }

                // Top position is halfway down the screen,
                // minus half the sprite height
                var styleTop = ((screenHeight-size)/2);
                if (styleTop != oldStyles.top) {
                    style.top = styleTop + 'px';
                    oldStyles.top = styleTop;
                }

                // Place at x position, adjusted for sprite
                // size and the current sprite state
                var styleLeft = (screenWidth/2 + x - size/2 - size*enemy.state);
                if (styleLeft != oldStyles.left) {
                    style.left = styleLeft + 'px';
                    oldStyles.left = styleLeft;
                }

                var styleZIndex = -(distSquared*1000)>>0;
                if (styleZIndex != oldStyles.zIndex) {
                    style.zIndex = styleZIndex;
                    oldStyles.zIndex = styleZIndex;
                }

                var styleDisplay = 'block';
                if (styleDisplay != oldStyles.display) {
                    style.display = styleDisplay;
                    oldStyles.display = styleDisplay;
                }

                var styleClip = 'rect(0, ' +
                    (size*(enemy.state+1)) + ', ' +
                    size + ', ' +
                    (size*(enemy.state)) + ')';
                if (styleClip != oldStyles.clip) {
                    style.clip = styleClip;
                    oldStyles.clip = styleClip;
                }
            } else {
                var styleDisplay = 'none';
                if (styleDisplay != enemy.oldStyles.display) {
                    img.style.display = styleDisplay;
                    enemy.oldStyles.display = styleDisplay;
                }
            }
        }
    },

    ai: function(timeDelta) {
        for (var i=0; i < enemies.length; i++) {
            var enemy = enemies[i];
            var dx = player.x - enemy.x;
            var dy = player.y - enemy.y;
            // Distance from enemy to to player
            var dist = Math.sqrt(dx*dx + dy*dy);
            // If distance is more than X, then enemy must chase player
            if (dist > 4) {
                var angle = Math.atan2(dy, dx);
                enemy.rotDeg = angle * 180 / Math.PI;
                enemy.rot = angle;
                enemy.speed = 1;
                var walkCycleTime = 1000;
                var numWalkSprites = 4;
                enemy.state = Math.floor((new Date() % walkCycleTime) / (walkCycleTime / numWalkSprites)) + 1;
                // If not, then stop.
            } else {
                enemy.state = 0;
                enemy.speed = 0;
            }
            move(enemies[i], timeDelta);
        }
    },
    debug: function(){
        console.log(enemies);
    },
}