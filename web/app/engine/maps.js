var maps = {

	levels: [],
	active: {
		level: 0,
		width: 0,
		height: 0
	},
	
	init: function(){
		this.initMaps();
		this.loadMap(0);
	},

	loadMap: function(level){
		this.active.level = level;
		this.active.width = this.levels[level][0].length;
		this.active.height = this.levels[level].length;
	},

	initMaps: function(){
		this.levels.push([
			[1,1,1,1,1,1,1],
			[1,0,0,0,0,0,1],
			[1,0,2,3,4,5,1],
			[1,0,0,0,0,0,1],
			[1,0,0,0,0,0,1],
			[1,0,0,0,0,0,1],
			[1,0,0,0,0,0,1],
			[1,0,0,0,0,0,1],
			[1,0,0,0,0,0,1],
			[1,0,0,0,0,0,1],
			[1,0,0,0,0,0,1],
			[1,0,0,0,0,0,1],
			[1,1,1,1,1,1,1]
		]);
	}
}