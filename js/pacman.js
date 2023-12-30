"use strict";

const PACMAN = "👾";
var gPacman;
function createPacman(board) {
  // TODO: initialize gPacman...
  gPacman = {
    location: { i: 3, j: 5 },
    isSuper: false,
  };
  board[gPacman.location.i][gPacman.location.j] = PACMAN;
}

function movePacman(ev) {
  if (!gGame.isOn) return;

  // TODO: use getNextLocation(), nextCell
  const nextLocation = getNextLocation(ev);
  if (!nextLocation) return;

  const nextCell = gBoard[nextLocation.i][nextLocation.j];

  // TODO: return if cannot move
  if (nextCell === WALL) return;

  // TODO: hitting a ghost? call gameOver
  if (nextCell === GHOST) {
    if (!gPacman.isSuper) {
      gameOver();
      return;
    } else {
      eatGhosts(nextLocation);
    }
  }

  if (nextCell === CHERRY) {
    updateScore(10);
  }

  // TODO: hitting food? call updateScore
  if (nextCell === FOOD) {
    updateScore(1);
    gFoodCount--;
    if (gFoodCount === 8) {
      isVictory();
      return;
    }
    console.log(gFoodCount);
  }

  if (nextCell === SUPERFOOD) {
    if (gPacman.isSuper) return;
    gPacman.isSuper = true;

    setTimeout(() => {
      gGhosts.push(gDeadGhosts);
      gPacman.isSuper = false;
    }, 5000);
  }

  // TODO: moving from current location:
  // TODO: update the model
  gBoard[gPacman.location.i][gPacman.location.j] = EMPTY;

  // TODO: update the DOM
  renderCell(gPacman.location, EMPTY);

  // TODO: Move the pacman to new location:
  // TODO: update the model
  gPacman.location = nextLocation;
  gBoard[gPacman.location.i][gPacman.location.j] = PACMAN;

  // TODO: update the DOM
  renderCell(gPacman.location, PACMAN);
}

function getNextLocation(eventKeyboard) {
  const nextLocation = { i: gPacman.location.i, j: gPacman.location.j };

  switch (eventKeyboard.key) {
    case "ArrowUp":
      nextLocation.i--;
      break;

    case "ArrowDown":
      nextLocation.i++;
      break;

    case "ArrowLeft":
      nextLocation.j--;
      break;

    case "ArrowRight":
      nextLocation.j++;
      break;

    default:
      return null;
  }
  return nextLocation;
}

// gSuperPowerTime = setTimeout(() => {
//     endSuperPower();
// }, 5000)

// function endSuperPower() {
// if(gPacman.isSuper = false) {
// return `<span style= "color:${getRandomColor()}">${GHOST}</span>`
// }
// }
