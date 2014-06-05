var probability = {
    increase: function(entity) {
        // increase probability for this move
        entity.behaviourPattern[entity.lastAction].value += Math.floor((Math.random() * 5));
    },
    decrease: function(entity) {
        var random = Math.floor((Math.random() * 20));
        entity.behaviourPattern[entity.lastAction].value = 0;

        entity.behaviourPattern[entity.reverseAction].value += random;
    }
}
