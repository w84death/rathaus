var collision = {
    checkCollision: function(newX, newY, radius){
        var pos = {
            x : this.x,
            y : this.y
        };
        if (newY < 0 || newY >= maps.active.height || newX < 0 || newX >= maps.active.width) {
            return pos;
        }
        var blockX = Math.floor(newX);
        var blockY = Math.floor(newY);
        if (this.isBlocking(blockX,blockY)) {
            return pos;
        }
        var blockTop = this.isBlocking(blockX,blockY-1);
        var blockBottom = this.isBlocking(blockX,blockY+1);
        var blockLeft = this.isBlocking(blockX-1,blockY);
        var blockRight = this.isBlocking(blockX+1,blockY);

        if (blockTop != 0 && newY - blockY < radius) {
            newY = pos.y = blockY + radius;
        }
        if (blockBottom != 0 && blockY+1 - newY < radius) {
            newY = pos.y = blockY + 1 - radius;
        }
        if (blockLeft != 0 && newX - blockX < radius) {
            newX = pos.x = blockX + radius;
        }
        if (blockRight != 0 && blockX+1 - newX < radius) {
            newX = pos.x = blockX + 1 - radius;
        }
        // is tile to the top-left a wall
        if (this.isBlocking(blockX-1,blockY-1) != 0 && !(blockTop != 0 && blockLeft != 0)) {
            var dx = newX - blockX;
            var dy = newY - blockY;
            if (dx*dx+dy*dy < radius*radius) {
                if (dx*dx > dy*dy)
                    newX = pos.x = blockX + radius;
                else
                    newY = pos.y = blockY + radius;
            }
        }
        // is tile to the top-right a wall
        if (this.isBlocking(blockX+1,blockY-1) != 0 && !(blockTop != 0 && blockRight != 0)) {
            var dx = newX - (blockX+1);
            var dy = newY - blockY;
            if (dx*dx+dy*dy < radius*radius) {
                if (dx*dx > dy*dy)
                    newX = pos.x = blockX + 1 - radius;
                else
                    newY = pos.y = blockY + radius;
            }
        }
        // is tile to the bottom-left a wall
        if (this.isBlocking(blockX-1,blockY+1) != 0 && !(blockBottom != 0 && blockBottom != 0)) {
            var dx = newX - blockX;
            var dy = newY - (blockY+1);
            if (dx*dx+dy*dy < radius*radius) {
                if (dx*dx > dy*dy)
                    newX = pos.x = blockX + radius;
                else
                    newY = pos.y = blockY + 1 - radius;
            }
        }
        // is tile to the bottom-right a wall
        if (this.isBlocking(blockX+1,blockY+1) != 0 && !(blockBottom != 0 && blockRight != 0)) {
            var dx = newX - (blockX+1);
            var dy = newY - (blockY+1);
            if (dx*dx+dy*dy < radius*radius) {
                if (dx*dx > dy*dy)
                    newX = pos.x = blockX + 1 - radius;
                else
                    newY = pos.y = blockY + 1 - radius;
            }
        }
        pos.x=newX;
        pos.y=newY;

        //var newItem = this.checkItemPickup(newX, newY);

//        if (newItem) {
//            this.updateItem(newItem);
//        }

        return pos;
    },
    isBlocking: function(x,y){
        if (y < 0 || y >= maps.active.height || x < 0 || x >= maps.active.width) {
            return true;
        }
        return (maps.levels[maps.active.level].walls[Math.floor(y)][Math.floor(x)] != 0);
    }
}