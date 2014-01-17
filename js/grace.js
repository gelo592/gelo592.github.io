$(document).ready(function () {
	var numLangs;
	var langList = [];
	var i = 0;  //counter that picks language from list

	function setup() {
		//pulling all different language id's
		$(".welcomeBlock").each(function() {
			langList.push(this.id);
		});

		numLangs = langList.size;
	}

	function switchLanguage () {
		window.setTimeout(function() {
			$('#' + langList[i]).hide();
			i = (i+1) % numLangs;
			$('#' + langList[i]).show();
			switchLanguage();
		}, 5000);
	}

	setup();
	switchLanguage();
});