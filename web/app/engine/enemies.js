var enemies = {
    enemyTypes: [
        {
            img : 'media/images/enemies/mummy_color.png',
            moveSpeed : 0.05,
            rotSpeed : 1,
            totalStates : 5
        },
        {
            img : 'media/images/enemies/mummy.png',
            moveSpeed : 0.05,
            rotSpeed : 0.5,
            totalStates : 5
        },
        {
            img : 'media/images/enemies/metal_skeleton.png',
            moveSpeed : 0.05,
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
            enemies.enemies.push(enemy);
            screen.appendChild(img);
        }
    },

    reloadMap: function() {
        /*for(var i=0; i<this.mapEnemies.length; i++){
            this.mapEnemies[i].parentNode.removeChild(this.mapEnemies[i]);
        }*/
        this.mapEnemies = maps.levels[maps.active.level].enemies;
    },

    renderEnemies: function() {
        for (var i=0;i<this.enemies.length;i++) {
            var enemy = this.enemies[i];
            var img = enemy.img;

            var dx = enemy.x - player.x;
            var dy = enemy.y - player.y;

            var angle = Math.atan2(dy, dx) - player.rot;

            if (angle < -Math.PI) angle += 2*Math.PI;
            if (angle >= Math.PI) angle -= 2*Math.PI;

            // is enemy in front of player? Maybe use the FOV value instead.
            if (angle > -Math.PI*0.5 && angle < Math.PI*0.5) {
                var distSquared = dx*dx + dy*dy;
                var dist = Math.sqrt(distSquared);
                var size = render.viewDist / (Math.cos(angle) * dist);

                if (size <= 0) continue;

                var x = Math.tan(angle) * render.viewDist;

                var style = img.style;
                var oldStyles = enemy.oldStyles;

                // height is equal to the sprite size
                if (size != oldStyles.height) {
                    style.height =  size + "px";
                    oldStyles.height = size;
                }

                // width is equal to the sprite size times the total number of states
                var styleWidth = size * enemy.totalStates;
                if (styleWidth != oldStyles.width) {
                    style.width = styleWidth + "px";
                    oldStyles.width = styleWidth;
                }

                // top position is halfway down the screen, minus half the sprite height
                var styleTop = ((render.screenHeight-size)/2);
                if (styleTop != oldStyles.top) {
                    style.top = styleTop + "px";
                    oldStyles.top = styleTop;
                }

                // place at x position, adjusted for sprite size and the current sprite state
                var styleLeft = (render.screenWidth/2 + x - size/2 - size*enemy.state);
                if (styleLeft != oldStyles.left) {
                    style.left = styleLeft + "px";
                    oldStyles.left = styleLeft;
                }

                var styleZIndex = 1000000 - ((distSquared*1000)>>0);
                if (styleZIndex != oldStyles.zIndex) {
                    style.zIndex = styleZIndex;
                    oldStyles.zIndex = styleZIndex;
                }

                var styleDisplay = "block";
                if (styleDisplay != oldStyles.display) {
                    style.display = styleDisplay;
                    oldStyles.display = styleDisplay;
                }

                eSize = (size*0.05)<<0;
                var styleClip = "rect(0, " + (eSize*(enemy.state+1)) + ", " + eSize + ", " + (eSize*(enemy.state)) + ")";
                if (styleClip != oldStyles.clip) {
                    style.clip = styleClip;
                    oldStyles.clip = styleClip;
                }

            } else {
                var styleDisplay = "none";
                if (styleDisplay != enemy.oldStyles.display) {
                    img.style.display = styleDisplay;
                    enemy.oldStyles.display = styleDisplay;
                }
            }
        }
    },

    ai: function() {
        for (var i=0; i < this.enemies.length; i++) {
            var enemy = this.enemies[i];
            var dx = player.x - enemy.x;
            var dy = player.y - enemy.y;
            // Distance from enemy to to player
            var dist = Math.sqrt(dx*dx + dy*dy);
            // If distance is more than X, then enemy must chase player
            if (dist > 2) {
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
            this.move(this.enemies[i], i);
        }
    },
    isBlocking: function(x,y){
        if (y < 0 || y >= maps.active.height || x < 0 || x >= maps.active.width) {
            return true;
        }
        return (maps.levels[maps.active.level].walls[Math.floor(y)][Math.floor(x)] != 0);
    },
    move: function(enemy, i) {
        var moveStep = enemy.speed * enemy.moveSpeed;
        this.rot += enemy.rot * enemy.rotSpeed;

        var newX = enemy.x + Math.cos(enemy.rot) * moveStep;
        var newY = enemy.y + Math.sin(enemy.rot) * moveStep;

        if (this.isBlocking(newX, newY)) return;

        //miniMap.update();

        enemy.x = newX;
        enemy.y = newY;
    },
    debug: function(){
        console.log(enemies);
    },
}