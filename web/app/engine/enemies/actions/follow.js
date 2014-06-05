var follow = function(entity) {
    var dx = player.x - entity.x;
    var dy = player.y - entity.y;
    // Distance from entity to to player
    var dist = Math.sqrt(dx*dx + dy*dy);
    // If distance is more than X, then entity must chase player
    if (dist > 3 && dist < 6 ) {
        var angle = Math.atan2(dy, dx);
        entity.rotDeg = angle * 180 / Math.PI;
        entity.rot = angle;
        entity.speed = 1;
        var walkCycleTime = 1000;
        var numWalkSprites = 4;
        entity.state = Math.floor((new Date() % walkCycleTime) / (walkCycleTime / numWalkSprites)) + 1;

        return 1;
    }

    return 0;
}