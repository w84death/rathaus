var probability = {
    increase: function(entity) {
        // increase probability for this move
        entity.behaviourPattern[entity.lastAction].value +=  Math.floor((Math.random() * 5));
    },
    decrease: function(entity) {
        var random = Math.floor((Math.random() * 10));
        entity.behaviourPattern[entity.lastAction].value = 1;

        entity.behaviourPattern[entity.reverseAction].value += random;
        for (i = 0; i < entity.behaviourPattern.length; i++) {
            if (i != entity.lastAction && i != entity.reverseAction) {
                entity.behaviourPattern[i].value +=  Math.floor((Math.random() * 5));
            }
        }
    }
}
