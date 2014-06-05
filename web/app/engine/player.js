var player = {
    x : 2,
    y : 2,
    dir : 0,
    rot : 0,
    speed : 0,
    moveSpeed : 0.18,
    rotSpeed : 6 * Math.PI / 180,

    move: function() {
        var moveStep = this.speed * this.moveSpeed;
        this.rot += this.dir * this.rotSpeed;

        var newX = this.x + Math.cos(this.rot) * moveStep;
        var newY = this.y + Math.sin(this.rot) * moveStep;

        if (this.isBlocking(newX, newY)) return;

        miniMap.update();

        this.x = newX;
        this.y = newY;
    },

    isBlocking: function(x,y){
        if (y < 0 || y >= maps.active.height || x < 0 || x >= maps.active.width) {
            return true;
        }
        return (maps.levels[maps.active.level].walls[Math.floor(y)][Math.floor(x)] != 0);
    },

    debug: function(){
        console.log(this.x, this.y);
    },
}