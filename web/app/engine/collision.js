var collision = {
   checkCollision: function(enemy, newX, newY, radius){
        var pos = {
            x : enemy.x,
            y : enemy.y
        };
        pos.x=newX;
        pos.y=newY;
     return pos;
   },
   isBlocking: function(x,y){
        if (y < 0 || y >= maps.active.height || x < 0 || x >= maps.active.width) {
            return true;
        }
        return (maps.levels[maps.active.level].walls[Math.floor(y)][Math.floor(x)] != 0);
    }
}