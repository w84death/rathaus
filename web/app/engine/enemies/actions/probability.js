var probability = {
    increase: function(entity) {
        // increase probability for this move
        entity.behaviourPattern[entity.lastAction].value += Math.floor((Math.random() * 5));
    },
    decrease: function(entity) {
        var random = Math.floor((Math.random() * 10));
        entity.behaviourPattern[entity.lastAction].value -= random * 2;
        if (entity.behaviourPattern[entity.lastAction].value < 0) {
            entity.behaviourPattern[entity.lastAction].value = 0;
        }

        entity.behaviourPattern[entity.reverseAction].value += random;
    }
}
