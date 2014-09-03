google.load('search', '1');

      var imageSearch;

      function changeTextColor() {
        var r = Math.ceil(Math.random()*255);
        var g = Math.ceil(Math.random()*255);
        var b = Math.ceil(Math.random()*255);
        var rgb = 'rgb(' + r + ', ' + g + ', ' + b + ')';

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
        $('#colorBox').addEventListener('click', changeTextColor);
        google.search.Search.getBranding('branding');
      }

      google.setOnLoadCallback(setHandler);
