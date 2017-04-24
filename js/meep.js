$(function () {

  var homeIntervalID;
  var projIntervalID;
  var contactIntervalID;

  function startHomeMeeps(meepDex, actionIndex) {
    $("#herm").show();
    $(".streak").attr({fill: "#000"});

    var meepers = ["Welcome to Grace dot cat",
      "Bienvenue à Grace point chat",
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
    $("#herm").hide();
  }

  function startProjMeeps() {
    $("#perjerkt").show();
    $(".streak").attr({fill: "#64B774"});

  }

  function stopProjMeeps() {
    $("#perjerkt").hide();
  }

  function startContactMeeps() {
    $("#kernterk").show();
    $(".streak").attr({fill: "#CE78AE"});

  }

  function stopContactMeeps() {
    $("#kernterk").hide();
  }

  function startResumeMeeps() {
    $("#svg").hide();
    $("#resume").show();
  }

  function stopResumeMeeps() {
    $("#resume").hide();
    $("#svg").show();
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
        stopResumeMeeps();
        startHomeMeeps(0, 0);
        break;
      case "proj":
        stopContactMeeps();
        stopHomeMeeps();
        stopResumeMeeps();
        startProjMeeps();
        break;
      case "contact":
        stopHomeMeeps();
        stopProjMeeps();
        stopResumeMeeps();
        startContactMeeps();
        break;
      case "resume":
        stopHomeMeeps();
        stopProjMeeps();
        stopContactMeeps();
        startResumeMeeps();
        break;
    }
  }

  function switchPerjekt (e) {
    e = e.currentTarget;
    togs = e.dataset["toggle"];

    switch (togs) {
      case "brain":
        $(".perjerkt-desc").hide();
        $("#brain").show();
        $("#brain-xs").show();
        break;
      case "mail":
        $(".perjerkt-desc").hide();
        $("#mail").show();
        $("#mail-xs").show();
        break;
      case "shoes":
        $(".perjerkt-desc").hide();
        $("#shoes").show();
        $("#shoes-xs").show();
        break;
      case "kermp":
        $(".perjerkt-desc").hide();
        $("#kermp").show();
        $("#kermp-xs").show();
        break;
      case "med":
        $(".perjerkt-desc").hide();
        $("#med").show();
        $("#med-xs").show();
        break;
      case "alienboy":
        $(".perjerkt-desc").hide();
        $("#alienboy").show();
        $("#alienboy-xs").show();
        break;
      case "e-mail":
        $(".perjerkt-desc").hide();
        $("#e-mail").show();
        $("#e-mail-xs").show();
        break;
      case "frands":
        $(".perjerkt-desc").hide();
        $("#frands").show();
        $("#frands").show();
        break;
    }
  }

  function incrementPoints(e) {
    var points = parseInt($("#point-counter")[0].innerHTML);
    points += e.data.points;
    $("#point-counter")[0].innerHTML = points;
  }

  function typeLetter(letter) {
    console.log(letter);
  }

  function handleTyping(e) {
    var key = e.keyCode;
    console.log(key);

    switch (key) {
      case 65://A
        typeLetter('a');
        break;
      case 69://E
        typeLetter('e');
        break;
      case 70://F
        typeLetter('f');
        break;
      case 72://H
        typeLetter('h');
        break;
      case 73://I
        typeLetter('i');
        break;
      case 75://K
        typeLetter('k');
        break;
      case 76://L
        typeLetter('l');
        break;
      case 77://M
        typeLetter('m');
        break;
      case 78://N
        typeLetter('n');
        break;
      case 84://T
        typeLetter('t');
        break;
      case 86://V
        typeLetter('v');
        break;
      case 87://W
        typeLetter('w');
        break;
      case 88://X
        typeLetter('x');
        break;
      case 89://Y
        typeLetter('y');
        break;
      case 90://Z
        typeLetter('z');
        break;
      default:
        console.log(key);
        break;
    }
  }

  $(window).keydown(handleTyping);
  $(".points").one("click", {points : 10}, incrementPoints);
  $(".narvlet").click(switchMeeps);
  $(".perjerkt-name a").click(switchPerjekt);
  startHomeMeeps(0, 0);

});