var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

document.body.appendChild(canvas);

//create game objects
var hero = {
	speed: 256
}

var oracle = {}
var oracle2 = {}

var portal2 = {}
var portal = {}

//background image
var bgReady = false;
var bgImage = new Image();
bgImage.onload = function () {
	bgReady = true;
};

bgImage.src = "images/background.png";

//background2 image
var bg2Ready = false;
var bg2Image = new Image();
bg2Image.onload = function () {
	bg2Ready = true;
};

bg2Image.src = "images/background2.png";

//portal image
var portalReady = false;
var portalImage = new Image();
portalImage.onload = new function () {
	portalReady = true;
	portal.height = portalImage.height;
	portal.width = portalImage.width;
};

portalImage.src = "images/portal.png";

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

//oracle2 image
var oracle2Ready = false;
var oracle2Image = new Image();
oracle2Image.onload = function () {
	oracle2Ready = true;
	oracle2.height = this.height;
	oracle2.width = this.width;
};

oracle2Image.src = "images/oracle2.png";

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

var update = function (modifier, page) {
	if (37 in keysDown && hero.left >= 10) { //holding left arrow
		hero.left -= Math.floor(hero.speed * modifier); 
		hero.right = hero.left + heroImage.width;
	}
	if (38 in keysDown && hero.top >= 10) { //holding up arrow
		hero.top -= Math.floor(hero.speed * modifier); 
		hero.bottom = hero.top + heroImage.height;
	}
	if (39 in keysDown && hero.right <= (canvas.width - 10)) { //holding right arrow
		hero.left += Math.floor(hero.speed * modifier); 
		hero.right = hero.left + heroImage.width;
	}
	if (40 in keysDown && hero.bottom <= (canvas.height - 10)) { //holding down arrow
		hero.top += Math.floor(hero.speed * modifier); 
		hero.bottom = hero.top + heroImage.height;
	}

	//can we talk to the oracle??
	if (hero.left <= oracle.right
			&& hero.right >= oracle.left
			&& hero.top <= oracle.bottom
			&& hero.bottom >= oracle.top && page) {
		bubble = true;
	}
	else {
		bubble = false;
	}

	//can we travel through space and time?!
	if (hero.left <= portal.right
			&& hero.right >= portal.left
			&& hero.top <= portal.bottom
			&& hero.bottom >= portal.top && page) {
		console.log("hit p1");
		hitPortal = true;
	}
	//can we travel through space and time?!
	else if (hero.left <= portal2.right
			&& hero.right >= portal2.left
			&& hero.top <= portal2.bottom
			&& hero.bottom >= portal2.top && !page) {
		hitPortal = true;
	}
	else {
		hitPortal = false;
	}
}

var talk = function () {
	if (textBubbleReady) {
		ctx.drawImage(textBubble, oracle.right, oracle.top - textBubble.height + 20);
	}
};

var travelThroughTimeAndSpace = function () {
	if (hitPortal) {
		clearInterval(mainInterval);
		main = function () {
			var now = Date.now();
			var timeDelta = now - then;

			update(timeDelta / 1000, true);

			render();

			then = now;
		}
		mainInterval = setInterval(main, 1);
	}
	else {
		if (bg2Ready) {
			ctx.drawImage(bg2Image, 0, 0);
		}

		if (oracle2Ready) {
			ctx.drawImage(oracle2Image, 42, 42);
		}

		if (heroReady) {
			ctx.drawImage(heroImage, hero.left, hero.top);
		}

		if (portalReady) {
			ctx.drawImage(portalImage, portal2.left, portal2.top);
		}
	}
};

var render = function () {
	console.log(hitPortal);
	if (hitPortal) {
		console.log("travelingthroughsppppaaace");
		page2 = true;
		page1 = false;
		clearInterval(mainInterval);
		hitPortal = false;
		main = function () {
			var now = Date.now();
			var timeDelta = now - then;

			update(timeDelta / 1000, false);

			travelThroughTimeAndSpace();

			then = now;
		}
		mainInterval = setInterval(main, 1);
	}
	else{
		if (bgReady) {
			ctx.drawImage(bgImage, 0, 0);
		}

		if (heroReady) {
			ctx.drawImage(heroImage, hero.left, hero.top);
		}

		if (oracleReady) {
			ctx.drawImage(oracleImage, oracle.left, oracle.top);
		}

		if (portalReady) {
			ctx.drawImage(portalImage, portal.left, portal.top);
		}

		if (bubble) {
			talk();
		}
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

	portal.left = 606;
	portal.right = portal.left + 101;
	portal.top = 599;
	portal.bottom = portal.top + 171;

	portal2.left = 55;
	portal2.top = 62;
	portal2.right = portal2.left + 101;
	portal2.bottom = portal2.top + 171;
};

var main = function () {
	var now = Date.now();
	var timeDelta = now - then;

	update(timeDelta / 1000, true);

	render();

	then = now;
};

var then = Date.now();
var bubble = false;
var hitPortal = false;
var page1 = true;
var page2 = false;
init();
var mainInterval = setInterval(main, 1);