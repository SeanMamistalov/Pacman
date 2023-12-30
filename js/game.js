"use strict";

const WALL = "🟥";
const FOOD = "🎮";
const EMPTY = " ";
const SUPERFOOD = "🕹️";
const CHERRY = "🍒";
const gGame = {
  score: 0,
  isOn: false,
  isSuperMode: false,
};
var gBoard;
var gFoodCount;
var gCherryInterval;

function init() {
  gFoodCount = 0;
  gBoard = buildBoard();
  gGame.score = 0;
  setScore();
  createPacman(gBoard);
  createGhosts(gBoard);

  gCherryInterval = setInterval(addCherry, 15000);
  renderBoard(gBoard, ".board-container");
  gGame.isOn = true;
}

function foodCount(board) {
  var count = 0;
  for (var i = 1; i < board.length - 1; i++) {
    for (var j = 1; j < board[i].length - 1; j++) {
      if (board[i][j] === FOOD) {
        count++;
      }
    }
  }
  return count;
}

function buildBoard() {
  const size = 10;
  const board = [];

  for (var i = 0; i < size; i++) {
    board.push([]); // board[i] = []

    for (var j = 0; j < size; j++) {
      if (
        i === 0 ||
        i === size - 1 ||
        j === 0 ||
        j === size - 1 ||
        (j === 3 && i > 4 && i < size - 2)
      ) {
        board[i][j] = WALL;
      } else {
        board[i][j] = FOOD;
        gFoodCount++;
      }
      if (
        (i === 1 && j === 1) ||
        (i === 1 && j === size - 2) ||
        (i === size - 2 && j === 1) ||
        (i === size - 2 && j === size - 2)
      ) {
        board[i][j] = SUPERFOOD;
      }
    }
  }
  return board;
}

function updateScore(diff) {
  const elScore = document.querySelector("h2 span");

  // Model
  gGame.score += diff;
  // DOM
  elScore.innerText = gGame.score;
}

function setScore() {
  const elScore = document.querySelector("h2 span");

  elScore.innerText = gGame.score;
}

function gameOver() {
  console.log("Game Over");
  gGame.isOn = false;

  btnGameOverModal();
  clearInterval(gGhostsInterval);
}

function stopGhosts() {
  clearInterval(gGhostsInterval, moveGhosts);
}

function playAgainBtn() {
  const elVictoriousModal = document.getElementById("victoriousModal");
  elVictoriousModal.style.display = "none";

  const elPlayAgainBtn = document.querySelector(".restart");
  elPlayAgainBtn.style.display = "none";
  init();
}

function btnGameOverModal() {
  var elBtn = document.querySelector(".restart");
  elBtn.style.display = "block";
}

function btnShowVictoryModal() {
  const elVictoriousModal = document.getElementById("victoriousModal");
  elVictoriousModal.style.display = "block";
}

function isVictory() {
  btnShowVictoryModal();
  clearInterval(gGhostsInterval, moveGhosts);
}

function eatGhosts(nextLocation) {
  for (var i = 0; i < gGhosts.length; i++) {
    var currGhost = gGhosts[i];
    if (
      currGhost.location.i === nextLocation.i &&
      currGhost.location.j === nextLocation.j
    ) {
      gGhosts.splice(i,1)
      gDeadGhosts = currGhost
      break      
      // var returnedGhost = currGhost
      //break
    }
  }
}
// once i finish supermode 5 sec later the ghosts are back.
//   setTimeout(() => {
//     gGhosts.push(...gDeadGhosts);
// //     //gBoard[returnedGhost.location.i][returnedGhost.location.j] = GHOST
// //     //renderCell(returnedGhost.location, getGhostHTML(returnedGhost))
// //     // return (gPacman.isSuper = false);
//   }, 5000);
// }

// function createCherries() {
//   clearInterval(gIntervalCherries)
//   gIntervalCherries = setInterval(addCherry, 3000)
// }

function addCherry() {
  const emptyLocation = getRandomEmptyCellPosition(gBoard);
  if (!emptyLocation) return;
  gBoard[emptyLocation.i][emptyLocation.j] = CHERRY;
  renderCell(emptyLocation, CHERRY);
}
