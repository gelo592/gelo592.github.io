$(function() {
  function attachListeners() {
    $("#playlist").on("click", "tr", function(e) {
      e = e.currentTarget;

      var title = $(e).data("title");
      var src = $(e).data("src");
      var extra = $(e).data("extra");
      var date = $(e).data("date");

      $("#show-title").text(title);
      $("#show-date").text(date);

      $("#audio").attr("src", src);

      $(".extra.active").hide();
      $(".extra.active").removeClass("active");

      $("#"+extra).addClass("active");
      $("#"+extra).show();

      $("tr.active").removeClass("active");
      $(e).addClass("active");
    });
  }

  attachListeners();
});