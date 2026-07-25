console.log("Hello World!");

let game = {
  hasBeenWon: false,
  hasStarted: false,
  playerTurn: 0,
  turns: 0,
  board: [
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ],
};

let boardSquaresArray = document.querySelectorAll(".boardSquare");
let boardArray = array2Dfy(boardSquaresArray, 3);

function addListenersToGame() {
  for (let i = 0; i < boardSquaresArray.length; i++) {
    boardSquaresArray[i].addEventListener("click", function (event) {
      event.stopPropagation();
      oneTimeBoardClickFunction(game, i);

      updateTurnText(game);
      console.log([Math.floor(i / 3), i % 3]);
      renderBoard(game);
    });
  }
}

let onesTurn = document.getElementById("onesTurn");
let twosTurn = document.getElementById("twosTurn");
let board = document.getElementById("board");
let startText = document.getElementById("startText");

document.addEventListener("click", function (event) {
  startGame(game, event, boardSquaresArray);
});

function checkIfGameHasBeenWon(game) {
  let scoreCounts = {
    X: 0,
    O: 0,
  };
  // for rows
  for (let i = 0; i < game.board.length; i++) {
    for (let j = 0; j < game.board[0].length; j++) {
      if (game.board[i][j] === "X") {
        scoreCounts.X++;
      } else if (game.board[i][j] === "O") {
        scoreCounts.O++;
      }
    }

    if (scoreCounts.X === 3) {
      return 1;
    } else if (scoreCounts.O === 3) {
      return 2;
    } else {
      scoreCounts.X = 0;
      scoreCounts.O = 0;
    }
  }

  // for columns

  for (let j = 0; j < game.board[0].length; j++) {
    for (let i = 0; i < game.board.length; i++) {
      if (game.board[i][j] === "X") {
        scoreCounts.X++;
      } else if (game.board[i][j] === "O") {
        scoreCounts.O++;
      }
    }

    if (scoreCounts.X === 3) {
      return 1;
    } else if (scoreCounts.O === 3) {
      return 2;
    } else {
      scoreCounts.X = 0;
      scoreCounts.O = 0;
    }
  }

  // for diagonals
  for (let i = 0; i < game.board.length; i++) {
    if (game.board[i][i] === "X") {
      scoreCounts.X++;
    } else if (game.board[i][i] === "O") {
      scoreCounts.O++;
    }
  }

  if (scoreCounts.X === 3) {
    return 1;
  } else if (scoreCounts.O === 3) {
    return 2;
  } else {
    scoreCounts.X = 0;
    scoreCounts.O = 0;
  }

  for (let i = 0; i < game.board.length; i++) {
    if (game.board[i][game.board.length - i - 1] === "X") {
      scoreCounts.X++;
    } else if (game.board[i][game.board.length - i - 1] === "O") {
      scoreCounts.O++;
    }
  }

  if (scoreCounts.X === 3) {
    return 1;
  } else if (scoreCounts.O === 3) {
    return 2;
  } else {
    scoreCounts.X = 0;
    scoreCounts.O = 0;
  }

  return false;
}

function oneTimeBoardClickFunction(game, currentClickedSquare) {
  let i = Math.floor(currentClickedSquare / 3);
  let j = currentClickedSquare % 3;
  if (game.board[i][j] === null) {
    game.board[i][j] = crossOrOval(game);
    game.turns++;

    if (!checkIfGameHasBeenWon(game) && game.turns === 9) {
      startText.textContent = "It's a Tie! Tap to Restart";

      endGame(game);

      return;
    } else if (checkIfGameHasBeenWon(game)) {
      switch (checkIfGameHasBeenWon(game)) {
        case 1:
          startText.textContent = "Player 1 Won! Tap to Restart";
          break;
        case 2:
          startText.textContent = "Player 2 Won! Tap to Restart";
          break;
      }
      endGame(game);

      return;
    } else {
      game.playerTurn = game.playerTurn ? 0 : 1;
    }
  }
}

function updateTurnText(game) {
  if (game.hasBeenWon) {
    onesTurn.setAttribute("hidden", "");
    board.setAttribute("hidden", "");
    twosTurn.setAttribute("hidden", "");
    startText.removeAttribute("hidden");
  } else {
    if (game.turns === 0) {
      onesTurn.removeAttribute("hidden");
      board.removeAttribute("hidden");
      startText.setAttribute("hidden", "");
    }
    if (game.turns === 9) {
      onesTurn.setAttribute("hidden", "");
      twosTurn.setAttribute("hidden", "");
    } else {
      if (game.playerTurn === 0) {
        onesTurn.removeAttribute("hidden");
        twosTurn.setAttribute("hidden", "");
      } else {
        twosTurn.removeAttribute("hidden");
        onesTurn.setAttribute("hidden", "");
      }
    }
  }
}

function crossOrOval(game) {
  if (game.playerTurn === 0) {
    return "X";
  } else {
    return "O";
  }
}

function array2Dfy(array, n) {
  let twoDArray = [];
  for (let i = 0; i < n * n; i = i + n) {
    let row = [];
    for (j = i; j < i + n; j++) {
      row.push(array[j]);
    }
    twoDArray.push(row);
  }

  return twoDArray;
}

function startGame(game, event, boardSquaresArray) {
  if (!game.hasStarted) {
    game.hasStarted = true;
    game.hasBeenWon = false;
    game.playerTurn = 0;
    game.turns = 0;
    game.board = [
      [null, null, null],
      [null, null, null],
      [null, null, null],
    ];

    boardSquaresArray.forEach(function (element) {
      element.innerHTML = "";
    });

    updateTurnText(game);
  }
}

function display2DArrayContents(array) {
  for (let i = 0; i < array.length; i++) {
    let str = "";
    for (let j = 0; j < array[0].length; j++) {
      str = str + array[i][j].textContent + " ";
    }
    console.log(str);
  }
}

function endGame(game) {
  game.hasBeenWon = true;
  game.hasStarted = false;
  updateTurnText(game);
}

function renderBoard(game) {
  let i = 0;
  game.board.forEach(function (element) {
    element.forEach(function (element) {
      boardSquaresArray[i].innerHTML = "";

      if (element === "X") {
        let img = document.createElement("img");
        img.setAttribute("src", "img/cross.svg");
        boardSquaresArray[i].appendChild(img);
      } else if (element === "O") {
        let img = document.createElement("img");
        img.setAttribute("src", "img/circle.svg");
        boardSquaresArray[i].appendChild(img);
      }
      i++;
    });
  });
}

addListenersToGame();
