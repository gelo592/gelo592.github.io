var puzzle = puzzle || {};

puzzle.main = {
  imageArr: ['url("img/duck.jpg")', 'url("img/duuuck.jpg")', 'url("img/goose.jpg")'],
  imgIndex: 0,
  puzzle_board: [], //initial unshuffled puzzle board
  emptyX: null,
  emptyY: null,
  emptyIndex: null,
  n: null,
  tileWidth: null,

  canMove: function (tileX, tileY) {
    //check that clicked tile is adjacent to empty tile
    if((this.emptyY == tileY && Math.abs(this.emptyX - tileX) == 1) || (this.emptyX == tileX && Math.abs(this.emptyY - tileY) == 1)) {
      return true;
    }

    return false;
  },

  moveTile: function (index, tileX, tileY) {
    //swap clicked tile and empty tile in puzzle array
    var emptyValue = this.puzzle_board[this.emptyIndex];
    this.puzzle_board[this.emptyIndex] = this.puzzle_board[index];
    this.puzzle_board[index] = emptyValue;

    //update empty tile position
    this.emptyX = tileX;
    this.emptyY = tileY;
    this.emptyIndex = index;

    this.increaseMoves();
    this.drawPuzzleBoard();

    //check if puzzle array is sorted aka solved
    if(this.checkSorted()) {
      alert("yay");
    }
  },

  getSwappables: function (index) {
    var swappables = [],
      tileX = index % this.n,
      tileY = Math.floor((index / this.n));

    //up swap
    if(tileY + 1 < this.n) {
      swappables.push(((tileY + 1) * this.n) + tileX);
    }
    //down swap
    if(tileY - 1 >= 0) {
      swappables.push(((tileY - 1) * this.n) + tileX);
    }
    //left swap
    if(tileX - 1 >= 0) {

      swappables.push((tileY * this.n) + (tileX - 1));
    }
    //right swap
    if(tileX + 1 < this.n) {
      swappables.push((tileY * this.n) + (tileX + 1));
    }

    return swappables;
  },

  shufflePuzzleBoard: function () {
    var counter = 1000, //some arbitrary high number to give greater mixing potential
      cryptoArr = new Uint8Array(1),
      cryptoObj = window.crypto || window.msCrypto,
      swapIndex,
      neighborIndex,
      emptyValue,
      swappables;

    while(counter > 0) {
      swappables = this.getSwappables(this.emptyIndex);

      //of the valid neighbor tiles randomly choose one
      swapIndex = Math.floor(cryptoObj.getRandomValues(cryptoArr)[0] / 256 * swappables.length);
      neighborIndex = swappables[swapIndex];

      //swap random neighbor tile and empty tile in puzzle array
      emptyValue = this.puzzle_board[this.emptyIndex];
      this.puzzle_board[this.emptyIndex] = this.puzzle_board[neighborIndex];
      this.puzzle_board[neighborIndex] = emptyValue;
      counter--;

      this.emptyIndex = neighborIndex;
    }

    this.emptyX = this.emptyIndex % this.n;
    this.emptyY = Math.floor(this.emptyIndex / this.n);
  },

  buildPuzzleHTML: function () {
    //reset board
    var $puzzle_tile_wrap = $(".puzzle-tile-wrap");
    $puzzle_tile_wrap.remove();
    this.puzzle_board = []
    $("#move-counter")[0].innerHTML = 0;

    var boardSize = this.n * this.n,
      bgOffsetX,
      bgOffsetY;

    for(var i = 0; i < boardSize - 1; i++) {
      //add item to puzzle board
      this.puzzle_board.push(i);

      //calculare tile image offsets
      bgOffsetX = (100/(this.n - 1)) * (i % this.n);
      bgOffsetY = (100/(this.n - 1)) * (Math.floor(i / this.n));

      //add div to puzzle box
      var divHTML = '<div style="background-position:' + bgOffsetX + '% ' + bgOffsetY + '%;" class="puzzle-tile-wrap puzzle-img" data-index=' + i + '>' +
                      '<div class="puzzle-tile">' + (i+1) + '</div>' +
                    '</div>';
      $(".puzzle-box").append(divHTML);
    }
    this.puzzle_board.push(boardSize - 1);
    this.emptyIndex = boardSize - 1;

    $(".puzzle-img").css("background-image", this.imageArr[this.imgIndex % 3]);
    this.imgIndex++;
  },

  drawPuzzleBoard: function () {
    var offsetX = 0,
      offsetY = 0,
      index,
      boardWidth = $(".puzzle-box").width();

    //for each tile set left & top based on position in puzzle array
    $(".puzzle-tile-wrap").each($.proxy(function(i, e) {
      index = this.puzzle_board.indexOf(i);

      offsetX = (boardWidth / this.n) * (index % this.n);
      offsetY = (boardWidth / this.n) * Math.floor((index / this.n));

      e.style.left = offsetX + "px";
      e.style.top = offsetY + "px";
      e.style.width = this.tileWidth + "%";
      e.style.height = this.tileWidth + "%";
    }, this));

    $(".puzzle-box").css("display", "inline-block");
  },

  checkSorted: function () {
    for(var i = 0; i < this.puzzle_board.length - 1; ++i) {
      if(this.puzzle_board[i] > this.puzzle_board[i+1]) {
        return false;
      }
    }
    return true;
  },

  increaseMoves: function () {
    var $move_counter = $("#move-counter");
    $move_counter[0].innerHTML = parseInt($move_counter[0].innerHTML) + 1;
  },

  attachHandlers: function () {
    $(".puzzle-tile-wrap").click($.proxy(this.clickHandler, this));
    $("#showImgBtn").mousedown(function(e){$(".puzzle-hint").css("display", "inline-block");});
    $("#showImgBtn").mouseup(function(e){$(".puzzle-hint").css("display", "none");});
    $("#showNumberBtn").mousedown(function(e){$(".puzzle-tile").css("display", "inline-block");});
    $("#showNumberBtn").mouseup(function(e){$(".puzzle-tile").css("display", "none");});
    $(window).resize($.proxy(this.drawPuzzleBoard, this));
  },

  clickHandler: function (e) {
    console.log("hi");
    var domIndex = parseInt(e.currentTarget.dataset['index']),
      tileIndex = this.puzzle_board.indexOf(domIndex),
      tileX = tileIndex % this.n,
      tileY = Math.floor(tileIndex / this.n);

    console.log( "hi hi", tileX, tileY );
    //check that tile is andjacent then move
    if(this.canMove(tileX, tileY)) {
      console.log( "move me!", tileX, tileY );
      this.moveTile(tileIndex, tileX, tileY);
    }
  },

  playPuzzle: function(boardSquare) {
    this.n = boardSquare;
    this.tileWidth = 100 / this.n;

    this.buildPuzzleHTML();
    this.shufflePuzzleBoard();
    this.drawPuzzleBoard();
    this.attachHandlers();
  }
};


//bug when using this button (emptyX and emptyY are incorrect :/)
$("#newGameBtn").click(function(e){puzzle.main.playPuzzle(4);});
puzzle.main.playPuzzle(4);