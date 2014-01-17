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
			console.log(i);

			ele = '#' + langList[i];
			console.log(ele);
			$('#' + langList[i]).hide();

			i = (i+1) % numLangs;
			console.log(i);

			ele = '#' + langList[i];
			console.log(ele);

			$('#' + langList[i]).show();
			
			switchLanguage();
		}, 5000);
	}

	setup();
	switchLanguage();
});