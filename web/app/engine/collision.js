var collision = {
   checkCollision: function(enemy, newX, newY, radius){
        var pos = {
            x : enemy.x,
            y : enemy.y
        };

        /*lowX = Math.floor(newX);
        lowY = Math.floor(newY);
        highX = Math.floor(newX) +1;
        highY= Math.floor(newY) +1;
        if ( maps.levels[maps.active.level].walls[lowX][lowY] == 0 || maps.levels[maps.active.level].walls[highX][highY] == 0){
          */  pos.x=newX;
            pos.y=newY;

        //}
     return pos;
    },
    isBlocking: function(x,y){
        if (y < 0 || y >= maps.active.height || x < 0 || x >= maps.active.width) {
            return true;
        }
        return (maps.levels[maps.active.level].walls[Math.floor(y)][Math.floor(x)] != 0);
    }
}