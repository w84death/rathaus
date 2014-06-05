var idle = function(entity) {
    entity.state = 0;
    entity.speed = 0;


    // increase probability for this move
    entity.behaviourPattern[4].value += Math.floor((Math.random() * 5));
}