var goDown = function(entity) {
        var angle = 180;
        entity.rotDeg = angle / Math.PI;
        entity.rot = angle;
        entity.speed = 1;
        var walkCycleTime = 1000;
        var numWalkSprites = 4;
        entity.state = Math.floor((new Date() % walkCycleTime) / (walkCycleTime / numWalkSprites)) + 1;
}