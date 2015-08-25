'use strict';

/* Int Med JS
 * ============================================================================= */

$(function() {
  function attachListeners() {
    if($("#myCarousel").length > 0) {
      $(window).resize(function() {
        var h = $("#myCarousel").height();
        $(".info-blob").height(h*.9);
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
});
