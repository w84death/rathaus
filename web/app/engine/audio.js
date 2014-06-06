/* 
    ----------------------------------------------------------------------------
    
        KRZYSZTOF JANKOWSKI && PRZEMYSLAW SIKORSKI
        PIRADICE
    
        abstract: HTML5 Canvas 2D Turn-based Game Engine    
        created: 06-03-2013
        licence: do what you want and dont bother me
        
        webpage: http://piradice.krzysztofjankowski.com
        twitter: @w84death, @rezoner
        
    ----------------------------------------------------------------------------
*/

var audio = {

    pool: [],
    channels: [],
    max_channels: 16,
    type: 'audio/ogg',
    ext: 'ogg',

    init: function(){
        if(game.audio){
            this.pool['bass1'] = {
                audio: this.createChannel('media/sounds/ambient/bass/1.'+this.ext),            
                volume: 1,
                loop: false,
            };
            
            this.pool['bass2'] = {
                audio: this.createChannel('media/sounds/ambient/bass/2.'+this.ext),            
                volume: 0.6
            };

            this.pool['bass3'] = {
                audio: this.createChannel('media/sounds/ambient/bass/3.'+this.ext),            
                volume: 0.6
            };

            this.pool['bass4'] = {
                audio: this.createChannel('media/sounds/ambient/bass/4.'+this.ext),            
                volume: 0.6
            };
            
            this.pool['bass5'] = {
                audio: this.createChannel('media/sounds/ambient/bass/5.'+this.ext),            
                volume: 0.6
            };

            this.pool['bass6'] = {
                audio: this.createChannel('media/sounds/ambient/bass/6.'+this.ext),            
                volume: 0.6
            };

            this.pool['pad'] = {
                audio: this.createChannel('media/sounds/ambient/pad/1.'+this.ext),            
                volume: 0.6
            };
            
            this.pool['pad2'] = {
                audio: this.createChannel('media/sounds/ambient/pad/2.'+this.ext),            
                volume: 0.6
            };

            this.pool['pad3'] = {
                audio: this.createChannel('media/sounds/ambient/pad/3.'+this.ext),            
                volume: 0.6
            };

            this.pool['key1'] = {
                audio: this.createChannel('media/sounds/ambient/key/1.'+this.ext),            
                volume: 0.6
            };
            
            this.pool['key2'] = {
                audio: this.createChannel('media/sounds/ambient/key/2.'+this.ext),            
                volume: 0.7
            };

            this.pool['key3'] = {
                audio: this.createChannel('media/sounds/ambient/key/3.'+this.ext),            
                volume: 1
            };

            this.pool['footstep1'] = {
                audio: this.createChannel('media/sounds/footstep_1.'+this.ext),            
                volume: 0.5
            };

            this.pool['footstep2'] = {
                audio: this.createChannel('media/sounds/footstep_2.'+this.ext),            
                volume: 0.5
            };

            this.pool['footstep3'] = {
                audio: this.createChannel('media/sounds/footstep_3.'+this.ext),            
                volume: 0.5
            };

            this.pool['footstep4'] = {
                audio: this.createChannel('media/sounds/footstep_4.'+this.ext),            
                volume: 0.5
            };

            this.pool['door'] = {
                audio: this.createChannel('media/sounds/door.'+this.ext),            
                volume: 0.7
            };

            this.pool['heartbeat'] = {
                audio: this.createChannel('media/sounds/heartbeat.'+this.ext),            
                volume: 0.8
            };

            this.pool['purr'] = {
                audio: this.createChannel('media/sounds/purr.'+this.ext),            
                volume: 0.4
            };

            this.pool['horror1'] = {
                audio: this.createChannel('media/sounds/horror1.'+this.ext),            
                volume: 0.4
            };

            this.pool['horror2'] = {
                audio: this.createChannel('media/sounds/horror2.'+this.ext),            
                volume: 0.4
            };

            this.pool['pickup'] = {
                audio: this.createChannel('media/sounds/pickup.'+this.ext),            
                volume: 0.7
            };

            this.pool['drop'] = {
                audio: this.createChannel('media/sounds/drop.'+this.ext),            
                volume: 0.7
            };
        }

        console.log(':: audio initialized');
    },

    enableMP3: function(){
        this.type = 'audio/mpeg';
        this.ext = 'mp3';
    },

    enableOGG: function(){
        this.type = 'audio/ogg';
        this.ext = 'ogg';
    },

    createChannel: function(src){
        var audio = document.createElement('audio');         
        //document.body.appendChild(audio);
        
        // loading
        // this.channels[i].addEventLitener('canplaythrough',channelLoaded, false);        
        audio.setAttribute('src', src);        
        return audio;
    },

    play: function(args){
        console.log(args.sound)
        var create_channel = true;
        if(game.audio){
            if(this.pool[args.sound]){

                for (var i = 0; i < this.channels.length; i++) {
                    if(this.channels[i].sound == args.sound && this.channels[i].audio.ended){
                       this.channels[i].audio.volume = this.pool[args.sound].volume;
                       this.channels[i].audio.play();                       
                       create_channel = false; 
                       return true;
                    }
                };

                if(create_channel){
                    if(this.channels.length < this.max_channels){
                        var temp_channel = document.createElement('audio'),
                            loop = this.pool[args.sound].loop;
                        temp_channel.setAttribute('src', this.pool[args.sound].audio.src);
                        temp_channel.setAttribute('type',this.type);
                        temp_channel.volume = this.pool[args.sound].volume;                        
                        temp_channel.play();
                        this.channels.push({
                            audio: temp_channel,
                            sound: args.sound,
                            loop: loop
                        });

                        if(loop){
                            this.channels[this.channels.length-1].audio.addEventListener('ended',audio.replay,false);
                        }

                    }else{
                        for (var i = 0; i < this.channels.length; i++) {
                            if((this.channels[i].audio.ended || !this.channels[i].audio.playing) && !this.channels[i].loop){
                                this.channels[i].audio.src = this.pool[args.sound].audio.src;
                                this.channels[i].sound = args.sound;
                                this.channels[i].audio.play();
                                return true;
                            }
                        }
                    }
                }

            }
        }
    },

    changeVolume: function(args){
        if(game.audio){
            for (var i = 0; i < this.channels.length; i++) {
                if(this.channels[i].sound == args.sound){
                    this.channels[i].audio.volume = args.volume;
                }
            }
            this.pool[args.sound].volume = args.volume;
        }
    },

    stop: function(args){
        if(game.audio){
            for (var i = 0; i < this.channels.length; i++) {
                if(this.channels[i].sound == args.sound){
                    this.channels[i].audio.pause();                
                }
            }
        }
    },

    replay: function(){
        if(game.audio){
            for (var i = 0; i < audio.channels.length; i++) {
                if(audio.channels[i].loop && (audio.channels[i].audio.ended || !audio.channels[i].audio.playing)){
                    audio.channels[i].audio.play();
                }
            }
        }
    },

}