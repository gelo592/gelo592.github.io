$(document).ready(function () {
	function switchLanguage () {
		var langList = [];
		$(".welcomeBlock").each(function() {
			langList.push(this.id);
		});
		console.log(langList);
	}
})