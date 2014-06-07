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
	alert("got some heros");
}