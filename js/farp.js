meepUp(0, ["#boop", "#doop", "#foop", "#koop", "#moop"], 0);

function meepUp(meepIdDex, meepIds, meepDex) {
  setTimeout(function() {
    $(meepIds[meepIdDex]).removeClass("meep-down");
    $(meepIds[meepIdDex]).addClass("meep-up");
    if(meepIdDex < meepIds.length) {
      meepUp(++meepIdDex, meepIds, meepDex);
    }
    else {
      meepBetween(0, meepIds, meepDex);
    }
  }, 167);
}

function meepBetween(isInvisible, meepIds, meepDex) {
  setTimeout(function() {
    var meepers = ["Welcome to Grace dot cat",
                "Bienvenue à Grace point chat",
                "グレイス ドット 猫 へ ようこそ",
                "Willkommen auf Grace Punkte Katze",
                "Bienvenido a Grace punto gato",
                "Välkommen till Grace Punkt Katt",
                "Benvinguda a Grace punt gat"];
    var meepWords = meepers[meepDex].split(" ");

    if(isInvisible) {
      for(var i = 0; i < meepWords.length; i++) {
        $(meepIds[i]).text(meepWords[i]);
      }

      meepDex = (meepDex + 1) % meepIds.length;
      meepUp(0, meepIds, ++meepDex);
    }
    else {
      meepDown(meepIds.length-1, meepIds, meepDex);
    }
  }, 1000);
}


function meepDown(meepIdDex, meepIds, meepDex) {
  setTimeout(function() {
    $(meepIds[meepIdDex]).removeClass("meep-up");
    $(meepIds[meepIdDex]).addClass("meep-down");
    if(meepIdDex > 0) {
      meepDown(--meepIdDex, meepIds, meepDex);
    }
    else {
      meepBetween(1, meepIds, meepDex);
    }
  }, 167);
}


