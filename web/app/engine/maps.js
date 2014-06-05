var maps = {

	levels: [],
	active: {
		level: 0,
		width: 0,
		height: 0
	},
	
	init: function(){
		this.initMaps();
	},

	loadMap: function(level){
		this.active.level = level;
		this.active.width = levels[level][0].length;
		this.active.height = levels[level].length;
	},

	initMaps: function(){
		this.levels.push([
			[1,1,1,1,1,1,1],
			[1,0,0,0,0,0,1],
			[1,0,0,0,0,0,1],
			[1,0,0,0,0,0,1],
			[1,1,1,1,1,1,1]
		]);
	}


}