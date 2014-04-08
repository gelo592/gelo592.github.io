var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

document.body.appendChild(canvas);

//create game objects
var hero = {
	speed: 256
}

var oracle = { }
//background image
var bgReady = false;
var bgImage = new Image();
bgImage.onload = function () {
	bgReady = true;
};

bgImage.src = "images/background.png";

//hero image
var heroReady = false;
var heroImage = new Image();
heroImage.onload = function () {
	heroReady = true;
	hero.height = this.height;
	hero.width = this.width;
};

heroImage.src = "images/hero.png";

//oracle image
var oracleReady = false;
var oracleImage = new Image();
oracleImage.onload = function () {
	oracleReady = true;
	oracle.height = this.height;
	oracle.width = this.width;
};

oracleImage.src = "images/oracle.png";

//text bubble image
var textBubbleReady = false;
var textBubble = new Image();
textBubble.onload = function () {
	textBubbleReady = true;
};

textBubble.src = "images/textbubble.png";

//handle keyboard controls
var keysDown = {};

addEventListener("keydown", function (e) {
	keysDown[e.keyCode] = true;
}, false);

addEventListener("keyup", function (e) {
	delete keysDown[e.keyCode]
}, false);

var update = function (modifier) {
	if (37 in keysDown && hero.left >= 10) { //holding left arrow
		hero.left -= hero.speed * modifier; 
		hero.right = hero.left + heroImage.width;
	}
	if (38 in keysDown && hero.top >= 10) { //holding up arrow
		hero.top -= hero.speed * modifier; 
		hero.bottom = hero.top + heroImage.height;
	}
	if (39 in keysDown && hero.right <= (canvas.width - 10)) { //holding right arrow
		hero.left += hero.speed * modifier; 
		hero.right = hero.left + heroImage.width;
	}
	if (40 in keysDown && hero.bottom <= (canvas.height - 10)) { //holding down arrow
		hero.top += hero.speed * modifier; 
		hero.bottom = hero.top + heroImage.height;
	}

	//can we talk to the oracle??
	if (hero.left <= oracle.right
			&& hero.right >= oracle.left
			&& hero.top <= oracle.bottom
			&& hero.bottom >= oracle.top) {
		bubble = true;
	}
	else {
		bubble = false;
	}
}

var talk = function () {
	if (textBubbleReady) {
		ctx.drawImage(textBubble, oracle.right, oracle.top);
	}
};

var render = function () {
	if (bgReady) {
		ctx.drawImage(bgImage, 0, 0);
	}

	if (heroReady) {
		ctx.drawImage(heroImage, hero.left, hero.top);
	}

	if (oracleReady) {
		ctx.drawImage(oracleImage, oracle.left, oracle.top - textBubble.height + 10);
	}

	if (bubble) {
		talk();
	}
};

var init = function () {
	hero.left = 10;
	hero.right = hero.left + 31;
	hero.top = 10;
	hero.bottom = hero.top + 53;

	oracle.left = 382;
	oracle.right = oracle.left + 31;
	oracle.top = 441;
	oracle.bottom = oracle.top + 53;
};

var main = function () {
	var now = Date.now();
	var timeDelta = now - then;

	update(timeDelta / 1000);

	render();

	then = now;
};

var poo = true;
var then = Date.now();
var bubble = false;
init();
setInterval(main, 1);
