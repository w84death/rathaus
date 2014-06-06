var sounds = {
    playingFootstep : 0,
    playingBlood: 0,
    heartBeat: 0,

    bassItems: ["1.wav","2.wav","3.wav","4.wav","5.wav","6.wav","7.wav","8.wav"],
    padItems: ["1.wav","2.wav","3.wav","4.wav"],
    keyItems: ["1.wav","2.wav","3.wav","4.wav"],

    playFootstep: function() {
        if (this.playingFootstep == 0) {
            this.playingFootstep = 1;
            var items = Array("footstep_1.wav", "footstep_2.wav", "footstep_3.wav", "footstep_4.wav");
            var item = items[Math.floor(Math.random()*items.length)];

            var snd = new Audio("media/sounds/"+item); // buffers automatically when created
            snd.play();
            window.setTimeout(function() {sounds.playingFootstep = 0}, 450);
        }
    },
    playDoor: function() {
        var snd = new Audio("media/sounds/door.wav"); // buffers automatically when created
        snd.play();
    },

    playBlood: function() {
        if (this.playingBlood== 0) {
            if (this.heartBeat == 0) {
                var snd2 = new Audio("media/sounds/heartbeat-speeding-up-02.wav"); // buffers automatically when created
                snd2.play();

                window.setTimeout(function() {sounds.heartBeat = 0;}, 30000);

            }

            this.playingBlood = 1;
            var items = Array("purr.wav", "horror004.wav", "horror005.wav");
            var item = items[Math.floor(Math.random()*items.length)];

            var snd = new Audio("media/sounds/"+item); // buffers automatically when created
            snd.play();

            window.setTimeout(function() {sounds.playingBlood = 0;}, 3000);
        }
    },
    playAmbient: function() {
        var bassItem = this.bassItems[Math.floor(Math.random()*this.bassItems.length)];
        var bass = new Audio("media/sounds/ambient/bass/"+bassItem); // buffers automatically when created

        var keyItem = this.bassItems[Math.floor(Math.random()*this.keyItems.length)];
        var key = new Audio("media/sounds/ambient/key/"+keyItem); // buffers automatically when created

        var padItem = this.bassItems[Math.floor(Math.random()*this.padItems.length)];
        var pad = new Audio("media/sounds/ambient/pad/"+padItem); // buffers automatically when created


        bass.play(); pad.play(); key.play();
        window.setTimeout(function() {sounds.playAmbient()}, 6000);


    }
}
