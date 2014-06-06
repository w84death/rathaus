var sounds = {
    playingFootstep : 0,
    playingBlood: 0,
    heartBeat: 0,

    bassItems: ["bass1","bass2","bass3","bass4","bass5","bass6"],
    padItems: ["pad1","pad2","pad3"],
    keyItems: ["key1","key2","key3"],

    playFootstep: function() {
        if (this.playingFootstep == 0) {
            this.playingFootstep = 1;
            var items = Array("footstep1", "footstep2", "footstep3", "footstep4");
            var item = items[Math.floor(Math.random()*items.length)];
            audio.play({sound:item});
            window.setTimeout(function() {sounds.playingFootstep = 0}, 450);
        }
    },

    playDoor: function() {
        audio.play({sound:'door'});
    },

    playBlood: function() {
        if (this.playingBlood== 0) {
            if (this.heartBeat == 0) {
                audio.play({sound:'heartbeat'});
                window.setTimeout(function() {sounds.heartBeat = 0;}, 30000);
            }

            this.playingBlood = 1;
            var items = Array("purr", "horror1", "horror2");
            var item = items[Math.floor(Math.random()*items.length)];

            audio.play({sound:item});

            window.setTimeout(function() {sounds.playingBlood = 0;}, 3000);
        }
    },
    playAmbient: function() {
        var bassItem = this.bassItems[Math.floor(Math.random()*this.bassItems.length)];      
        var keyItem = this.bassItems[Math.floor(Math.random()*this.keyItems.length)];    
        var padItem = this.bassItems[Math.floor(Math.random()*this.padItems.length)];
       
        audio.play({sound:bassItem});
        audio.play({sound:keyItem});
        audio.play({sound:padItem});

        window.setTimeout(function() {sounds.playAmbient()}, 6000);
    }
}
