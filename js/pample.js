var map;
var hero;
var heroKey = "hero";
var templateKey = "noam";
var mapsKey = "maps";


var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

canvas.id = "can";

document.body.appendChild(canvas);

function initializeMap() {
	var toLoad = map.mapItems.length + 2;
	var loaded = 0;

	onImageLoad = function() {
		loaded ++;
		if(loaded == toLoad) { 
			ctx.globalAlpha = 1;
			ctx.drawImage(map.backgroundImage, 0, 0);
			map.mapItems.forEach(function(item) {
				ctx.drawImage(item.image, 31*item.x, 23*item.y);
			});
			ctx.drawImage(hero.image, 31*hero.x, 23*hero.y);
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
	img.src = hero.imageSrc;
	img.onload = onImageLoad;
	hero.image = img;
}

function drawMap() {
	ctx.drawImage(map.backgroundImage, 0, 0);
	map.mapItems.forEach(function(item) {
		ctx.drawImage(item.image, 31*item.x, 23*item.y);
	});
	ctx.drawImage(hero.image, 31*hero.x, 23*hero.y);
}

function moveHero(e) {
	if (e.keyCode == 37 && !onEdge['left']) { //holding left arrow
		if(!map.collisionMap[hero.x-1][hero.y]) {
			hero.x -= 1; 
			drawMap();
		}	
		else {
			itemHit = map.itemMap[hero.x-1][hero.y];
			if(itemHit != 1) {
				itemHit.onCollision();
			}
		}
	}
	if (e.keyCode == 38 && !onEdge['top']) { //holding up arrow
		if(!map.collisionMap[hero.x][hero.y-1]) {
			hero.y -= 1;
			drawMap(); 
		}	
		else {
			itemHit = map.itemMap[hero.x][hero.y-1];
			if(itemHit != 1) {
				itemHit.onCollision();
			}
		}
	}
	if (e.keyCode == 39 && !onEdge['right']) { //holding right arrow
		if(!map.collisionMap[hero.x+1][hero.y]) {
			hero.x += 1;
			drawMap(); 
		}	
		else {
			itemHit = map.itemMap[hero.x+1][hero.y];
			if(itemHit != 1) {
				itemHit.onCollision();
			}
		}	
	}
	if (e.keyCode == 40 && !onEdge['bottom']) { //holding down arrow
		if(!map.collisionMap[hero.x][hero.y+1]) {
			hero.y += 1;
			drawMap(); 
		}	
		else {
			itemHit = map.itemMap[hero.x][hero.y+1];
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
	this.heroName;
	this.vocab = [];
	this.listeningLvl = 0;
	this.readingLvl = 0;
	this.speakingLvl = 0;
	this.writingLvl = 0;
	this.gameState = {
		x : 10,
		y : 10,
		map : landing
	};
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

map = landing;

mapTable = {
	"jumpland": jumpLand,
	"landing": landing
};

onEdge = {  'left' : false,
			'right' : false,
			'top' : false,
			'bottom' : false };

//++++++++++++++++++++++++++++++++++++++++++SAVE++++++++++++++++++++++++++++++++++++++++++++++++++++++//
function signInError(key) {
	document.getElementById("signInError").innerHTML = key + "?";
	document.getElementById("signInError").style.display = "block";
	document.getElementById("plusButt").style.display = "inline";	
	document.getElementById("newChar").style.paddingleft = 81.5;
}

function getObjKeys(obj) {
	var keys = [];
	for(var k in obj) {
		keys.push(k);
	}
	return keys;
}

function getKey() {
	return document.getElementById("boxInput").value.toLowerCase();
}

function createNewPlayer() {
	var nameKey = getKey();

	var heroData = JSON.parse(localStorage[templateKey]);
	heroData["name"] = nameKey;
	parsePlayer(heroData);
	console.log(hero);
	saveGame();
	loadGame();
}

function signIn() {
	var nameKey = getKey();
	console.log(nameKey);
	var heroData = localStorage[heroKey];
	if(heroData) {
		console.log("in storage");
		heroData = JSON.parse(heroData);
		console.log(heroData["heroName"]);
		if (heroData["heroName"] == nameKey) {
			console.log("boooooo" );
			parsePlayer(heroData);
			loadGame();
			console.log(hero);
		}
	}
	else {
		signInError(nameKey);
	}
}

function parsePlayer(heroData) {
	hero = new Hero();

	hero.heroName = heroData["name"];
	hero.readingLvl = heroData["reading"];
	hero.writingLvl = heroData["writing"];
	hero.speakingLvl = heroData["speaking"];
	hero.listeningLvl = heroData["listening"];
	hero.vocab = heroData["vocab"];
	console.log(heroData);
	hero.x = heroData["gameState"]["x"];
	hero.y = heroData["gameState"]["y"];

	map = mapTable[heroData["gameState"]["map"]];
	console.log("something broken?");
}

function loadGame() {
	console.log("did i get here?");
	document.getElementById("signIn").style.display = "none";

	initializeMap();
	drawMap();
	window.setInterval(saveGame, 30000);
}

function saveGame() {
	localStorage[heroKey] = JSON.stringify(hero);
}

function initializeLocalStorage() {
	maps = localStorage[mapsKey];
	if(maps == null) {
		$.getJSON(
			"data/maps.json",
			function(data) {
				localStorage[mapsKey] = JSON.stringify(data);
			});
	}

	hero = localStorage[templateKey];
	if(hero == null) {
		$.getJSON(
			"data/hero.json",
			function(data) {
				localStorage[templateKey] = JSON.stringify(data);
			});
	}
}

function startErUp() {
	var toLoad = 1;
	var loaded = 0;

	onImageLoad = function() {
		loaded ++;
		if(loaded == toLoad) { 
			ctx.globalAlpha = 0.5;
			ctx.drawImage(map.backgroundImage, 0, 0);
		}
	};

	var img = new Image();
	img.src = map.backgroundImageSrc;
	img.onload = onImageLoad;
	map.backgroundImage = img;
}

function attachEventListeners() {
	var el = document.getElementById("thumbButt");
	el.addEventListener("click", signIn, false);

	$("#boxInput").keyup(function(e){
    	if(e.keyCode == 13){
        	$("#thumbButt").click();
    	}
	});

	el = document.getElementById("plusButt");
	el.addEventListener("click", createNewPlayer, false);
}

$(document).ready(function() {
	attachEventListeners();
	startErUp();
	initializeLocalStorage();
});

