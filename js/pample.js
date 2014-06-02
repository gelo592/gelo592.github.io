var map;
var noam;

var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

document.body.appendChild(canvas);

function initializeMap() {
	var toLoad = map.mapItems.length + 2;
	var loaded = 0;

	onImageLoad = function() {
		loaded ++;
		if(loaded == toLoad) { 
			ctx.drawImage(map.backgroundImage, 0, 0);
			map.mapItems.forEach(function(item) {
				ctx.drawImage(item.image, 31*item.x, 23*item.y);
			});
			ctx.drawImage(noam.image, 31*noam.x, 23*noam.y);
		}
	};

	var img = new Image();
	img.src = map.backgroundImageSrc;
	img.onload = onImageLoad;
	map.backgroundImage = img;

	map.mapItems.forEach(function(item) {
		img = new Image();
		img.src = item.imageSrc;
		img.onload = onImageLoad;
		item.image = img;
	});

	img = new Image();
	img.src = noam.imageSrc;
	img.onload = onImageLoad;
	noam.image = img;
}

function drawMap() {
	ctx.drawImage(map.backgroundImage, 0, 0);
	map.mapItems.forEach(function(item) {
		ctx.drawImage(item.image, 31*item.x, 23*item.y);
	});
	ctx.drawImage(noam.image, 31*noam.x, 23*noam.y);
}

function moveHero(e) {
	if (e.keyCode == 37 && !onEdge['left']) { //holding left arrow
		if(!map.collisionMap[noam.x-1][noam.y]) {
			noam.x -= 1; 
			drawMap();
		}	
		else {
			itemHit = map.itemMap[noam.x-1][noam.y];
			if(itemHit != 1) {
				itemHit.onCollision();
			}
		}
	}
	if (e.keyCode == 38 && !onEdge['top']) { //holding up arrow
		if(!map.collisionMap[noam.x][noam.y-1]) {
			noam.y -= 1;
			drawMap(); 
		}	
		else {
			itemHit = map.itemMap[noam.x][noam.y-1];
			if(itemHit != 1) {
				itemHit.onCollision();
			}
		}
	}
	if (e.keyCode == 39 && !onEdge['right']) { //holding right arrow
		if(!map.collisionMap[noam.x+1][noam.y]) {
			noam.x += 1;
			drawMap(); 
		}	
		else {
			itemHit = map.itemMap[noam.x+1][noam.y];
			if(itemHit != 1) {
				itemHit.onCollision();
			}
		}	
	}
	if (e.keyCode == 40 && !onEdge['bottom']) { //holding down arrow
		if(!map.collisionMap[noam.x][noam.y+1]) {
			noam.y += 1;
			drawMap(); 
		}	
		else {
			itemHit = map.itemMap[noam.x][noam.y+1];
			if(itemHit != 1) {
				itemHit.onCollision();
			}
		}
	}
}

window.addEventListener('keydown', moveHero);

//Globals
mapWidth = 48; //tiles
mapHeight = 32;

function buildCollisionMap(mapItems) {
	var map = [];

	//initialize the collision map with default values
	for (var i = mapWidth - 1; i >= 0; i--) {
		map[i] = [];
		for (var j = mapHeight - 1; j >= 0; j--) {
			if(i == 0 || i == mapWidth - 1 || j == 0 || j == mapHeight - 1) {
				map[i][j] = true;  //will cause 'collision'
			}
			else {
				map[i][j] = false;  //no collision here
			}
		};
	};

	//add each map item to the collision map
	mapItems.forEach(function(item) {
		map[item.x][item.y] = true;
	});

	return map;
}

function buildItemMap(mapItems) {
	var map = [];

	//initialize the collision map with default values
	for (var i = mapWidth - 1; i >= 0; i--) {
		map[i] = [];
		for (var j = mapHeight - 1; j >= 0; j--) {
			if(i == 0 || i == mapWidth - 1 || j == 0 || j == mapHeight - 1) {
				map[i][j] = 1;  //will cause 'collision' with edge
			}
			else {
				map[i][j] = 0;  //no collision here
			}
		};
	};

	//add each map item to the collision map
	mapItems.forEach(function(item) {
		map[item.x][item.y] = item; //collision with an item
	});

	return map;
}

function Map (mapItems, src, heroX, heroY) {
	this.mapItems = mapItems;
	this.backgroundImageSrc = src;
	this.backgroundImage;
	this.width = mapWidth;
	this.height = mapHeight;
	this.heroX = heroX;
	this.heroY = heroY;

	this.collisionMap = buildCollisionMap(this.mapItems);
	this.itemMap = buildItemMap(this.mapItems);
}

Map.prototype.draw = function () { 
	ctx.drawImage(this.bg, 0, 0);
	for(item in this.mapItems) {
		ctx.drawImage(item.image, item.x, item.y);
	}
};

Map.prototype.update = function () { };

function Hero () { 
	this.vocab = [];
	this.listeningLvl = 0;
	this.readingLvl = 0;
	this.speakingLvl = 0;
	this.writingLvl = 0;
	this.x = 10;
	this.y = 10;
	this.imageSrc = "images/hero.png";
	this.image;
}

//Base class for NPC, portals, and obstacles
function MapItem (x, y, src) { 
	this.x = x;
	this.y = y;
	this.imageSrc = src;
	this.image;
}

MapItem.prototype.onCollision = function () { alert("generic collision happening"); };

//Non-human characters that our hero can interact with
function Non_Human(x, y, src, speech) { 
	MapItem.call(this, x, y, src);
	this.speech = speech;
}

Non_Human.prototype = Object.create(MapItem.prototype);

Non_Human.prototype.onCollision = function () { 
	alert("glerbaskdjfh glob bwat");
	//window.appendChild(<div)
};

//Doorways to other worlds, dimensions, and times
function Portal (x, y, src, destination) { 
	MapItem.call(this, x, y, src);
	this.unlocked = true;
	this.destination = destination; //lookup key string for map object in map table
}

Portal.prototype = Object.create(MapItem.prototype);

Portal.prototype.onCollision = function () { 
	if(this.unlocked) {
		map = mapTable[this.destination];
		initializeMap();
	}
};

function Obstruction (x, y, src) {
	MapItem.call(this, x, y);
}

Obstruction.prototype = Object.create(MapItem.prototype);

Obstruction.prototype.onCollision = function () { alert("ouch... that doesn't do anything."); };

//Setting the scenes...

landingOracle = new Non_Human(10, 15, "images/oracle2.png", "gerbldi gert fwomp bwat");
landingPortal = new Portal(18, 17, "images/portal.png", "jumpland");

landingItems = [landingOracle, landingPortal];

jumpLandOracle = new Non_Human(15, 10, "images/oracle.png", "snerp snarp grumpt sfut");
jumpLandPortal = new Portal(28, 29, "images/portal.png", "landing");

jumpLandItems = [jumpLandOracle, jumpLandPortal];

landing = new Map(landingItems, "images/landing.png", 14, 14);
jumpLand = new Map(jumpLandItems, "images/jumpland.png", 60, 60);

mapTable = {
	"jumpland": jumpLand,
	"landing": landing
};

onEdge = {  'left' : false,
			'right' : false,
			'top' : false,
			'bottom' : false };

noam = new Hero();
map = landing;

initializeMap();