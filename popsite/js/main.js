'use strict';

/* Int Med JS
 * ============================================================================= */

$(function() {
  function attachListeners() {
    $(window).on("scroll resize", scrollyWatch);

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

  function scrollyWatch() {
    var scrollHead = $('#scroll-head');
    var height = scrollHead.outerHeight();

    var berries = $('#berries').offset().top;
    //var end = $('#scroll-head-end').offset().top;
    var dirty = $('#dirty').offset().top;
    //var clean = $('#clean').offset().top;
    var scroll = (window).scrollY;

    if(scroll >= berries - height && scroll < dirty - height)
    {
      //$('#scroll-head h3')[0].innerHTML = 'Foods to Eat Often';
      $('#scroll-head').addClass('scroll-heading');
    }
/*  ADD THIS BACK WHEN BOTTOM PICTURES DONT LOOK LIKE TURDS
    else if(scroll >= dirty - height && scroll < clean - height) {
      $('#scroll-head h3')[0].innerHTML = 'Dirty Dozen';
      $('#scroll-head').addClass('scroll-heading');
    }
    else if(scroll >= clean - height) {
      $('#scroll-head h3')[0].innerHTML = 'Clean Fifteen';
      $('#scroll-head').addClass('scroll-heading');
    } */
    else {
      $('#scroll-head').removeClass('scroll-heading');
    }
  }

  attachListeners();
});
