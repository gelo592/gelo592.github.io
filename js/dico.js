google.load('search', '1');

var imageSearch, rgbNext;

function changeTextColor(e) {
      var box = e.target.id;
      var rgb, r, g, b;
      if (box === "blackBox") {
            r = g = b = 0;
            rgb = 'rgb(' + r + ', ' + g + ', ' + b + ')';
      }
      else if (box === "whiteBox") {
            r = g = b = 255;
            rgb = 'rgb(' + r + ', ' + g + ', ' + b + ')';
      }
      else if (box === "colorBox") { 
            var rgb = $(this).css('color');

            r = Math.ceil(Math.random()*256);
            g = Math.ceil(Math.random()*256);
            b = Math.ceil(Math.random()*256);
            $(this).css('color', 'rgb(' + r + ', ' + g + ', ' + b + ')');


      }

      $('input').css('color', rgb);
      $('.textPos').css('color', rgb);
}

function searchComplete() {

      // Check that we got results
      if (imageSearch.results && imageSearch.results.length > 0) {

            // Grab our content div, clear it.
            var contentDiv = $('#content');

            // Loop through our results, printing them to the page.
            var results = imageSearch.results;
            var result = results[0];

            var newImg = $('#background');
            console.log(result.url);
            // There is also a result.url property which has the escaped version
            newImg.css('background-image', 'url(' + result.url + ')');
      }
}

function OnLoad(e) {
      console.log(e.keyCode);
      if(e.keyCode == 13) {
            var inputText = document.getElementById("word").value;
            console.log(inputText);
            // Create an Image Search instance.
            imageSearch = new google.search.ImageSearch();

            // Set searchComplete as the callback function when a search is 
            // complete.  The imageSearch object will have results in it.
            imageSearch.setSearchCompleteCallback(this, searchComplete, null);


            // Find me a beautiful car.
            imageSearch.execute(inputText);

            // Include the required Google branding

      }
}

function setHandler() {
      window.addEventListener('keydown', OnLoad);
      $('#colorBox').click(changeTextColor);
      $('#whiteBox').click(changeTextColor);
      $('#blackBox').click(changeTextColor);
      google.search.Search.getBranding('branding');
}

google.setOnLoadCallback(setHandler);
