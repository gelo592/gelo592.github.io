$(function () {

  var homeIntervalID;
  var projIntervalID;
  var contactIntervalID;

  function startHomeMeeps(meepDex, actionIndex) {
    $("#home-meep").show();
    $(".streak").attr({fill: "#000"});

    var meepers = ["Welcome to Grace dot cat",
      "Bienvenue à Grace point chat",
      "グレイス ドット 猫 へ ようこそ",
      "Willkommen auf Grace Punkte Katze",
      "Bienvenido a Grace punto gato",
      "Välkommen till Grace Punkt Katt",
      "Benvinguda a Grace punt gat"];

    var meepWords = meepers[meepDex].split(" ");
    for(var i = 0; i < meepWords.length; i++) {
      $($(".meep")[i]).text(meepWords[i]);
    }

    var actionArray = [0,1,2,3,4,6,6,14,13,12,11,10,6,6,6,5];

    homeIntervalID = setInterval(function() {
      var whichMeep = actionArray[actionIndex];
      if(whichMeep <= 4) {
        $($(".meep")[whichMeep]).removeClass("meep-down");
        $($(".meep")[whichMeep]).addClass("meep-up");
      }
      else if(whichMeep == 5) {
        meepDex = (meepDex + 1) % 5;

        var meepWords = meepers[meepDex].split(" ");

        for(var i = 0; i < meepWords.length; i++) {
          $($(".meep")[i]).text(meepWords[i]);
        }
      }
      else if(whichMeep >= 10) {
        $($(".meep")[whichMeep - 10]).removeClass("meep-up");
        $($(".meep")[whichMeep - 10]).addClass("meep-down");
      }
      actionIndex = (actionIndex + 1) % actionArray.length;
    }, 197);
  }

  function stopHomeMeeps() {
    clearInterval(homeIntervalID);
    $(".meep").removeClass("meep-up");
    $(".meep").removeClass("meep-down");
    $("#home-meep").hide();
  }

  function startProjMeeps() {
    $("#proj-meep").show();
    $(".streak").attr({fill: "#64B774"});

  }

  function stopProjMeeps() {
    $("#proj-meep").hide();
  }

  function startContactMeeps() {
    $("#contact-meep").show();
    $(".streak").attr({fill: "#CE78AE"});

  }

  function stopContactMeeps() {
    $("#contact-meep").hide();
  }

  function switchMeeps(e) {
    e = e.currentTarget;
    togs = e.dataset["toogle"];

    $(".narvlet").removeClass("active");
    $(e).addClass("active");

    switch (togs) {
      case "home":
        stopProjMeeps();
        stopContactMeeps();
        startHomeMeeps(0, 0);
        break;
      case "proj":
        stopContactMeeps();
        stopHomeMeeps();
        startProjMeeps();
        break;
      case "contact":
        stopHomeMeeps();
        stopProjMeeps();
        startContactMeeps();
        break;
    }
  }

  $(".narvlet").click(switchMeeps);

  startHomeMeeps(0,0);

});