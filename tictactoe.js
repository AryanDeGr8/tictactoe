console.log("Hello World!");

let game = {
  hasBeenWon: false,
  hasStarted: false,
  playerTurn: 0,
  turns: 0,
};

let boardSquaresArray = document.querySelectorAll(".boardSquare");
let boardArray = array2Dfy(boardSquaresArray, 3);

boardSquaresArray.forEach(function (element) {
  element.addEventListener("click", function () {
    oneTimeBoardClickFunction(game, element);
    updateTurnText(game);
  });
});

let onesTurn = document.getElementById("onesTurn");
let twosTurn = document.getElementById("twosTurn");
let board = document.getElementById("board");
let startText = document.getElementById("startText");

document.addEventListener("keydown", function (event) {
  startGame(game, event, boardSquaresArray);
});

function checkIfGameHasBeenWon(boardArray, game) {
  let scoreCounts = {
    X: 0,
    O: 0,
  };
  // for rows
  for (let i = 0; i < boardArray.length; i++) {
    for (let j = 0; j < boardArray[0].length; j++) {
      if (boardArray[i][j].textContent === "X") {
        scoreCounts.X++;
      } else if (boardArray[i][j].textContent === "O") {
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

  for (let j = 0; j < boardArray[0].length; j++) {
    for (let i = 0; i < boardArray.length; i++) {
      if (boardArray[i][j].textContent === "X") {
        scoreCounts.X++;
      } else if (boardArray[i][j].textContent === "O") {
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
  for (let i = 0; i < boardArray.length; i++) {
    if (boardArray[i][i].textContent === "X") {
      scoreCounts.X++;
    } else if (boardArray[i][i].textContent === "O") {
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

  for (let i = 0; i < boardArray.length; i++) {
    if (boardArray[i][boardArray.length - i - 1].textContent === "X") {
      scoreCounts.X++;
    } else if (boardArray[i][boardArray.length - i - 1].textContent === "O") {
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

function oneTimeBoardClickFunction(game, element) {
  if (element.textContent === "") {
    element.textContent = crossOrOval(game);
    game.turns++;

    if (!checkIfGameHasBeenWon(boardArray, game) && game.turns === 9) {
      endGame(game);

      return;
    } else if (checkIfGameHasBeenWon(boardArray, game)) {
      switch (checkIfGameHasBeenWon(boardArray, game)) {
        case 1:
          startText.textContent = "Player 1 Won! Press Space to Restart";
          break;
        case 2:
          startText.textContent = "Player 2 Won! Press Space to Restart";
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
  if (event.key === " " && !game.hasStarted) {
    game.hasStarted = true;
    game.hasBeenWon = false;
    game.playerTurn = 0;
    game.turns = 0;

    boardSquaresArray.forEach(function (element) {
      element.textContent = "";
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
