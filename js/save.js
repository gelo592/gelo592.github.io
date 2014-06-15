heroKey = "";

function getKey() {
	heroKey = document.getElementById("boxInput").value;
}

function save() {
	window.localStorage.saveItem();	
}

function initializeLocalStorage() {
	maps = window.localStorage.getItem("maps");
	if(maps == null) {
		$.getJSON("data/maps.json", parseMap);
	}

	heros = window.localStorage.getItem("heros");
	if(heros == null) {
		$.getJSON("data/heros.json", parseHeros);
	}
}

function parseMap(data) {
	alert("got some data :D");
}

function parseHeros(data) {
	var heroData = data["heros"][heroKey];
	if(heroData != null) {
		noam.listeningLvl = heroData["listening"];
		console.log(heroData["listening"]);
		noam.readingLvl = heroData["reading"];
		console.log(heroData["reading"]);
		noam.speakingLvl = heroData["speaking"];
		console.log(heroData["speaking"]);
		noam.writingLvl = heroData["writing"];
		console.log(heroData["writing"]);
		noam.vocab = heroData["vocab"];
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
}


function signIn() {
	var el = document.getElementById("boxInput");
	var heroKey = el.value;
}

function attachEventListeners() {
	var el = document.getElementById("thumbButt");
	el.addEventListener("click", getKey, false);
}

$(document).ready(function() {
	attachEventListeners();
	startErUp();
	initializeLocalStorage();
});
