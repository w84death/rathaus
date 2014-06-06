var player = {
    x: 2,
    y: 2,
    dir: 0,
    rot: 0,
    speed: 0,
    moveSpeed: 0.18,
    rotSpeed: 6 * Math.PI / 180,
    item: null,
    pickupThreshold: 0.6,
    doorThreshold: 1.5,
    bloodThreshold: 2.5,

    move: function () {
        var moveStep = this.speed * this.moveSpeed;
        this.rot += this.dir * this.rotSpeed;
        if (this.rot > 2 * Math.PI) {
            this.rot = this.rot - 2 * Math.PI;
        }

        if (this.rot < 0) {
            this.rot = 2 * Math.PI - this.rot;
        }

        var newX = this.x + Math.cos(this.rot) * moveStep;
        var newY = this.y + Math.sin(this.rot) * moveStep;

        var pos = this.checkCollision(newX, newY, 0.35);
        miniMap.update();

        if (newX != this.x || newY != this.y) {
            sounds.playFootstep();

        }
        this.x = pos.x;
        this.y = pos.y;
        this.bloodOnScreen(this.x, this.y);
        this.nearDoor(this.x, this.y);


    },

    isBlocking: function (x, y) {
        if (y < 0 || y >= maps.active.height || x < 0 || x >= maps.active.width) {
            return true;
        }
        return (maps.levels[maps.active.level].walls[Math.floor(y)][Math.floor(x)] != 0);
    },

    checkItemPickup: function (x, y) {
        for (var i = items.currentItems.length - 1; i >= 0; i--) {
            var dx = items.currentItems[i].x + 0.5 - x;
            var dy = items.currentItems[i].y + 0.5 - y;
            var dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < this.pickupThreshold) {
                return items.currentItems[i].item;
            }
        }
        ;

        return false;
    },

    updateItem: function (newItem) {
        if (this.item && this.item.id == newItem.id) {
            return;
        }

        this.item = newItem;

        hud.setCurrentItem(newItem);
        audio.play({sound:'pickup'});
    },

    checkCollision: function (newX, newY, radius) {
        var pos = {
            x: this.x,
            y: this.y
        };
        if (newY < 0 || newY >= maps.active.height || newX < 0 || newX >= maps.active.width) {
            return pos;
        }
        var blockX = Math.floor(newX);
        var blockY = Math.floor(newY);
        if (this.isBlocking(blockX, blockY)) {
            return pos;
        }
        var blockTop = this.isBlocking(blockX, blockY - 1);
        var blockBottom = this.isBlocking(blockX, blockY + 1);
        var blockLeft = this.isBlocking(blockX - 1, blockY);
        var blockRight = this.isBlocking(blockX + 1, blockY);

        if (blockTop != 0 && newY - blockY < radius) {
            newY = pos.y = blockY + radius;
        }
        if (blockBottom != 0 && blockY + 1 - newY < radius) {
            newY = pos.y = blockY + 1 - radius;
        }
        if (blockLeft != 0 && newX - blockX < radius) {
            newX = pos.x = blockX + radius;
        }
        if (blockRight != 0 && blockX + 1 - newX < radius) {
            newX = pos.x = blockX + 1 - radius;
        }
        // is tile to the top-left a wall
        if (this.isBlocking(blockX - 1, blockY - 1) != 0 && !(blockTop != 0 && blockLeft != 0)) {
            var dx = newX - blockX;
            var dy = newY - blockY;
            if (dx * dx + dy * dy < radius * radius) {
                if (dx * dx > dy * dy)
                    newX = pos.x = blockX + radius;
                else
                    newY = pos.y = blockY + radius;
            }
        }
        // is tile to the top-right a wall
        if (this.isBlocking(blockX + 1, blockY - 1) != 0 && !(blockTop != 0 && blockRight != 0)) {
            var dx = newX - (blockX + 1);
            var dy = newY - blockY;
            if (dx * dx + dy * dy < radius * radius) {
                if (dx * dx > dy * dy)
                    newX = pos.x = blockX + 1 - radius;
                else
                    newY = pos.y = blockY + radius;
            }
        }
        // is tile to the bottom-left a wall
        if (this.isBlocking(blockX - 1, blockY + 1) != 0 && !(blockBottom != 0 && blockBottom != 0)) {
            var dx = newX - blockX;
            var dy = newY - (blockY + 1);
            if (dx * dx + dy * dy < radius * radius) {
                if (dx * dx > dy * dy)
                    newX = pos.x = blockX + radius;
                else
                    newY = pos.y = blockY + 1 - radius;
            }
        }
        // is tile to the bottom-right a wall
        if (this.isBlocking(blockX + 1, blockY + 1) != 0 && !(blockBottom != 0 && blockRight != 0)) {
            var dx = newX - (blockX + 1);
            var dy = newY - (blockY + 1);
            if (dx * dx + dy * dy < radius * radius) {
                if (dx * dx > dy * dy)
                    newX = pos.x = blockX + 1 - radius;
                else
                    newY = pos.y = blockY + 1 - radius;
            }
        }
        pos.x = newX;
        pos.y = newY;

        var newItem = this.checkItemPickup(newX, newY);

        if (newItem) {
            this.updateItem(newItem);
        }

        return pos;
    },
    nearDoor: function (x, y) {
        var dx = maps.levels[maps.active.level].door.x - x;
        var dy = maps.levels[maps.active.level].door.y - y;
        var dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < this.doorThreshold) {
            hud.showItemDescription();
            this.jumpToNextMap();
        } else {
            hud.hideItemDescription();
        }
    },
    jumpToNextMap: function () {
        if (this.item != null) {
            if (this.item.id == maps.active.key.item.id) {
                sounds.playDoor();
                maps.nextMap();
                hud.reset();
            }
        }
    },
    bloodOnScreen: function (x, y) {
        var minDist = 100;
        for (var i = 0; i < enemies.enemies.length; i++) {
            var enemy = enemies.enemies[i];
            var dx = enemy.x - x;
            var dy = enemy.y - y;
            var dist = Math.sqrt(dx * dx + dy * dy);
            if (minDist > dist && game.STATE == 'game') {
                minDist = dist;
            }
        }
        if (minDist <this.bloodThreshold*2) {
            sounds.playBlood();
        }
        if (minDist < this.bloodThreshold*0.5 && this.item) {
            items.dropItem();
        }
        if (minDist < this.bloodThreshold) {
            $('#blood')[0].style.opacity = 1 - minDist / 2.5;
        } else {
            $('#blood')[0].style.opacity = 0;
        }
    }



}