const canvas = document.querySelector("#game");
const game = canvas.getContext("2d");
const btnUp = document.querySelector("#up");
const btnLeft = document.querySelector("#left");
const btnRight = document.querySelector("#right");
const btnDown = document.querySelector("#down");

let canvasSize;
let elementsSize;

window.addEventListener("load", setCanvasSize);
window.addEventListener("resize", setCanvasSize);

function setCanvasSize() {
  if (window.innerHeight > window.innerWidth) {
    canvasSize = window.innerWidth * 0.8;
  } else {
    canvasSize = window.innerHeight * 0.8;
  }

  canvas.setAttribute("width", canvasSize);
  canvas.setAttribute("height", canvasSize);

  elementsSize = canvasSize / 10;
  startGame();
}

function startGame() {
  console.log({ canvasSize, elementsSize });

  game.font = elementsSize + "px Verdana";
  game.textAlign = "center";
  game.textBaseline = "middle";

  const map = maps[0];
  const mapRows = map.trim().split("\n");
  const mapRowsCols = mapRows.map((row) => row.trim().split(""));
  console.log({ map, mapRows, mapRowsCols });

  mapRowsCols.forEach((row, rowI) => {
    row.forEach((col, colI) => {
      const emoji = emojis[col];
      const posX = elementsSize * (colI + 1 / 2);
      const posY = elementsSize * (rowI + 1 / 2);
      game.fillText(emoji, posX, posY);
      console.log({ row, rowI, col, colI });
    });
  });

  // for (let row = 1; row <= 10; row++) {
  //   for (let col = 1; col <= 10; col++) {
  //     game.fillText(emojis[mapRowsCols[row - 1][col - 1]], elementsSize * (col - 1 / 2), elementsSize * (row - 1 / 2));
  //   }
  // }
}

window.addEventListener("keydown", moveByKeys);
btnUp.addEventListener("click", moveUp);
btnLeft.addEventListener("click", moveLeft);
btnRight.addEventListener("click", moveRight);
btnDown.addEventListener("click", moveDown);

function moveByKeys(event) {
  if (event.key == "ArrowUp") moveUp();
  else if (event.key == "ArrowLeft") moveLeft();
  else if (event.key == "ArrowRight") moveRight();
  else if (event.key == "ArrowDown") moveDown();
  else if (event.key == "w") moveUp();
  else if (event.key == "a") moveLeft();
  else if (event.key == "d") moveRight();
  else if (event.key == "s") moveDown();
  // console.log(event);
  // if (event.key == "ArrowUp") {
  //   moveUp();
  // } else if (event.key == "ArrowLeft") {
  //   moveLeft();
  // } else if (event.key == "ArrowRight") {
  //   moveRight();
  // } else if (event.key == "ArrowDown") {
  //   moveDown();
  // }
}

function moveUp() {
  console.log("Me quiero mover hacia arriba");
}

function moveLeft() {
  console.log("Me quiero mover hacia la izquierda");
}

function moveRight() {
  console.log("Me quiero mover hacia la derecha");
}

function moveDown() {
  console.log("Me quiero mover hacia abajo");
}
