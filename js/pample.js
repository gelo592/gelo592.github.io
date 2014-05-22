var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

document.body.appendChild(canvas);

function moveHero(e) {
	if (e.code == 37 && !onEdge['left']) { //holding left arrow
		if(!map.collisionMap[noam.x-1][noam.y]) {
			noam.x -= 31; 
			noam.right = noam.x + noam.image.width;
		}	
		else {
			itemHit = map.itemMap[noam.x-1][noam.y];
			itemHit.onCollide();
		}
	}
	if (e.code == 38 && !onEdge['top']) { //holding up arrow
		if(!map.collisionMap[noam.x][noam.y-1]) {
			noam.y -= 23; 
			noam.bottom = noam.y + noam.image.height;
		}	
		else {
			itemHit = map.itemMap[noam.x][noam.y-1];
			itemHit.onCollide();
		}
	}
	if (e.code == 39 && !onEdge['right']) { //holding right arrow
		if(!map.collisionMap[noam.x+1][noam.y]) {
		noam.x += 31; 
			noam.right = noam.x + noam.image.width;
		}	
		else {
			itemHit = map.itemMap[noam.x+1][noam.y];
			itemHit.onCollide();
		}	
	}
	if (e.code == 40 && !onEdge['bottom']) { //holding down arrow
		if(!map.collisionMap[noam.x][noam.y+1]) {
			noam.y += 23; 
			noam.bottom = noam.y + noam.image.height;
		}	
		else {
			itemHit = map.itemMap[noam.x][noam.y+1];
			itemHit.onCollide();
		}
	}
}

window.addEventListener('keydown', moveHero);

//Globals
mapWidth = 63; //tiles
mapHeight = 44;

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
		map[item.x][items.y] = true;
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
		map[item.x][items.y] = item; //collision with an item
	});
}

function Map (mapItems, backgroundImage, heroX, heroY) {
	this.mapItems = mapItems;
	this.bg = backgroundImage;
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
	this.image = 
}

//Base class for NPC, portals, and obstacles
function MapItem (x, y) { 
	this.x = x;
	this.y = y;
}

MapItem.prototype.onCollision = function () { alert("generic collision happening"); };

//Non-human characters that our hero can interact with
function Non_Human(x, y) { 
	MapItem.call(x, y);
}

Non_Human.prototype = new MapItem();
Non_Human.prototype.constructor = Non_Human;

Non_Human.prototype.onCollision = function () { alert("hitting non-humans!"); };

//Doorways to other worlds, dimensions, and times
function Portal (x, y, destination) { 
	MapItem.call(x, y);
	this.unlocked = false;
	this.destination = destination; //lookup key string for map object in map table
}

Portal.prototype = new MapItem();
Portal.prototype.constructor = Portal;

Portal.prototype.onCollision = function () { alert("Traveling through space and time!!"); };

function Obstruction (x, y) {
	MapItem.call(x, y);
}

Obstruction.prototype = new MapItem();
Obstruction.prototype.constructor = Obstruction;

Obstruction.prototype.onCollision = function () { alert("ouch... that doesn't do anything."); };

//Setting the scenes...

landingOracle = new Non_Human(382, 441);
landingPortal = new Portal(606, 599, "jumpland");

landingItems = [landingOracle, landingPortal];

jumpLandOracle = new Non_Human(382, 441);
jumpLandPortal = new Portal(606, 599, "landing");

jumpLandItems = [jumpLandOracle, jumpLandPortal];

landing = new Map(landingItems, "landing.png", 14, 14);
jumpLand = new Map(jumpLandItems, "jumpland.png", 60, 60);

mapTable = {
	"jumpland": jumpLand,
	"landing": landing
};

onEdge = {  'left' : false,
			'right' : false,
			'top' : false,
			'bottom' : false };

noam = new Hero();