'use strict';

/* Int Med JS
 * ============================================================================= */

$(function() {
  function attachListeners() {
    var carousel = $("#myCarousel");

    if(carousel.length > 0) {
      $(window).resize(function() {
        var h = carousel.height();
        var w = carousel.width();
        console.log(h, w);
        $(".info-blob").height(h * 0.85);
        $(".info-blob").width(h * 0.85);
        $(".blob-title").css("font-size", h * 0.15);
        $(".blob-info").css("font-size", h * 0.092);
        $(".blob-info-sm").css("font-size", h * 0.06);
      });
    }

    $(".playlist").on("click", "tr.clickable", function(e) {
      e = e.currentTarget;

      var title = $(e).data("title");
      var src = $(e).data("src");

      $("#show-title").text(title);

      $("#audio").attr("src", src);

      $("tr.active").removeClass("active");
      $(e).addClass("active");
    });

    $(".playlist").on("dblclick", "tr.clickable", function(e) {
      e = e.currentTarget;

      var title = $(e).data("title");
      var src = $(e).data("src");

      $("#show-title").text(title);

      $("#audio").attr("src", src);

      $("tr.active").removeClass("active");
      $(e).addClass("active");
      $("audio")[0].play();
    });

    $('#tabbes a').click(function (e) {
      e.preventDefault()
      $(this).tab('show')
    })
  }

  attachListeners();

  var img = new Image();
  img.src = "img/slide1-min.jpg";

  img.onload = function() {
    var carousel = $("#myCarousel");

    var ho = carousel.height();
    var wo = carousel.width();

    $(".info-blob").height(ho * 0.85);
    $(".info-blob").width(ho * 0.85);
    $(".blob-title").css("font-size", ho * 0.15);
    $(".blob-info").css("font-size", ho * 0.092);
    $(".blob-info-sm").css("font-size", ho * 0.06);
  }
});
