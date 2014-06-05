var npcAi = {
    behaviourPattern: [
        {
            action: goDown,
            value: 1,
            id: 0,
            reverseId: 1
        },
        {
            action: goUp,
            value: 1,
            id: 1,
            reverseId: 0
        },
        {
            action: goRight,
            value: 1,
            id: 2,
            reverseId: 3
        },
        {
            action: goLeft,
            value: 1,
            id: 3,
            reverseId: 2
        },
        {
            action: idle,
            value: 4,
            id: 4,
            reverseId: 0
        },
    ],
    think: function(entity) {

        // init behaviur pattern
        if (!entity.behaviourPattern) {
            this.initBehaviuor(entity);
        }

        // try to follow if can
        if (!follow(entity)) {

            var func = this.randomFrom(entity);
            (func)(entity);
        }
    },
    randomFrom: function(entity) {
        var randomValue = 0;
        var range = [];
        for (i = 0; i < entity.behaviourPattern.length; i++) {
            randomValue += entity.behaviourPattern[i].value;
            if (i == 0 ) {
                range[i] = entity.behaviourPattern[i].value;
            } else {
                range[i] = range[i-1] + entity.behaviourPattern[i].value;
            }
        }
        //console.log(range);
        var random = Math.floor((Math.random() * randomValue));

        if (random <= range[0]) {
            return goUp;
        }

        if (random > range[0] && random <= range[1]) {
            return goDown;
        }

        if (random > range[1] && random <= range[2]) {
            return goRight;
        }

        if (random > range[2] && random <= range[3]) {
            return goLeft;
        }

        return idle;
    },
    initBehaviuor: function(entity) {
        entity.behaviourPattern = this.behaviourPattern;
        entity.lastAction = 1;
        entity.reverseAction = 0;
    }
}
