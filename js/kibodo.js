var kibodo = {
  controls: false,
  autoplay: false,
  loop: false,
  currentClip: "",
  currentHue: 0,
  currentPlaybackRate: 1,

  play: function() {
    return true;
  },

  pause: function() {
    return true;

  },

  seek: function() {

  },

  currentTiem: function () {
    return true;

  },

  duration: function() {
    return true;

  },

  toggleLoop: function() {
    this.loop = !this.loop;
  },

  toggleAutoplay: function() {
    this.autoplay = !this.autoplay;

    if(this.autoplay) {
      this.vid.autoplay = "autoplay";
    }
    else {
      this.vid.autoplay = "";
    }
  },

  changePlaybackSpeed: function(rate) {
    console.log("here");
    var newRate = this.currentPlaybackRate + parseFloat(rate);
    this.currentPlaybackRate = newRate < .25 ? .25 : newRate > 3 ? 3 : newRate;
    console.log("boop");
    console.log(this.currentPlaybackRate);
    document.getElementById("vid").playbackRate = this.currentPlaybackRate;
  },

  clearFilters: function() {
    this.currentHue = 0;
    this.invert = false;
    this.greyscale = false;
    $("#vid").css("filter", "");
  },

  rotateHue: function(hue) {
    var newHue = this.currentHue + hue;

    this.clearFilters();
    this.currentHue = newHue;

    $("#vid").css("filter", "hue-rotate(" + newHue + "deg)");
  },

  setHue: function(hue) {
    this.clearFilters();
    this.currentHue = hue;

    $("#vid").css("filter", "hue-rotate(" + hue + "deg)");
  },

  toggleGrey: function() {
    var tempGrey = !this.greyscale;

    this.clearFilters();
    this.greyscale = tempGrey;

    if(this.greyscale) {
      $("#vid").css("filter", "grayscale(1)");
    }
    else {
      $("#vid").css("filter", "grayscale(0)");
    }
  },

  toggleInvert: function() {
    var tempInvert = !this.invert;

    this.clearFilters();
    this.invert = tempInvert;

    if(this.invert) {
      $("#vid").css("filter", "invert(1)");
    }
    else {
      $("#vid").css("filter", "invert(0)");
    }
  },

  setClip: function(clip) {
    //if(clip != this.currentClip) {
      this.currentClip = clip;
      $("#vid")[0].src = "clips/" + clip + ".mp4";
    /*}
    else {
      //seek to beginning
    }*/
  }
};

$(window).keyup(function(e){
  var keyVal = e.key;

  $(".key").each(function(i,e) {
    var key = $(e).data('key');

    if(key == keyVal) {
      if($(e).hasClass("big-key")) {
        $("#"+e.id).css("background-position-x", -24);
      }
      else {
        $("#"+e.id).css("background-position-y", 0);
      }
    }
  });
});

$(window).keydown(function(e){
  var keyVal = e.key;

  $(".key").each(function(i,e){
    var key = $(e).data('key');
    var action = $(e).data('function');
    var data = $(e).data('keystuffs');

    console.log(action);

    if(key == keyVal) {
      kibodo[action](data);

      if($(e).hasClass("big-key")) {
        $("#"+e.id).css("background-position-x", 0);
      }
      else {
        $("#"+e.id).css("background-position-y", -24);
      }
    }
  });
});