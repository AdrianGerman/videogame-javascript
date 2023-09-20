const canvas = document.querySelector("#game");
const game = canvas.getContext("2d");
const btnUp = document.querySelector("#up");
const btnLeft = document.querySelector("#left");
const btnRight = document.querySelector("#right");
const btnDown = document.querySelector("#down");
const spanLives = document.querySelector("#lives");
const spanTime = document.querySelector("#time");
const spanRecord = document.querySelector("#record");
const pResult = document.querySelector("#result");

let canvasSize;
let elementsSize;
let level = 0;
let lives = 3;

let timeStart;
let timePlayer;
let timeInterval;

const playerPosition = {
  x: undefined,
  y: undefined,
};

const giftPosition = {
  x: undefined,
  y: undefined,
};

let enemyPosition = [];

window.addEventListener("load", setCanvasSize);
window.addEventListener("resize", setCanvasSize);

function setCanvasSize() {
  if (window.innerHeight > window.innerWidth) {
    canvasSize = window.innerWidth * 0.7;
  } else {
    canvasSize = window.innerHeight * 0.7;
  }

  canvasSize = Number(canvasSize.toFixed(0));

  canvas.setAttribute("width", canvasSize);
  canvas.setAttribute("height", canvasSize);

  elementsSize = canvasSize / 10;

  playerPosition.x = undefined;
  playerPosition.y = undefined;
  startGame();
}

function startGame() {
  // console.log({ canvasSize, elementsSize });

  game.font = elementsSize + "px Verdana";
  game.textAlign = "center";
  game.textBaseline = "middle";

  const map = maps[level];
  if (!map) {
    gameWin();
    return;
  }

  if (!timeStart) {
    timeStart = Date.now();
    timeInterval = setInterval(showTime, 100);
    showRecord();
  }
  const mapRows = map.trim().split("\n");
  const mapRowsCols = mapRows.map((row) => row.trim().split(""));
  // console.log({ map, mapRows, mapRowsCols });

  //Mostrar vidas
  showLives();

  enemyPosition = [];
  game.clearRect(0, 0, canvasSize, canvasSize);

  mapRowsCols.forEach((row, rowI) => {
    row.forEach((col, colI) => {
      const emoji = emojis[col];
      const posX = elementsSize * (colI + 1 / 2);
      const posY = elementsSize * (rowI + 1 / 2);

      if (col == "O") {
        if (!playerPosition.x && !playerPosition.y) {
          playerPosition.x = posX;
          playerPosition.y = posY;
          // console.log({ playerPosition });
        }
      } else if (col == "I") {
        giftPosition.x = posX;
        giftPosition.y = posY;
      } else if (col == "X") {
        enemyPosition.push({
          x: posX,
          y: posY,
        });
      }

      game.fillText(emoji, posX, posY);
      // console.log({ row, rowI, col, colI });
    });
  });

  movePlayer();

  // for (let row = 1; row <= 10; row++) {
  //   for (let col = 1; col <= 10; col++) {
  //     game.fillText(emojis[mapRowsCols[row - 1][col - 1]], elementsSize * (col - 1 / 2), elementsSize * (row - 1 / 2));
  //   }
  // }
}

function movePlayer() {
  const giftCollisionX =
    playerPosition.x.toFixed(3) == giftPosition.x.toFixed(3);
  const giftCollisionY =
    playerPosition.y.toFixed(3) == giftPosition.y.toFixed(3);
  const giftCollision = giftCollisionX && giftCollisionY;

  // subir de nivel
  if (giftCollision) {
    levelWin();
  }

  const enemyCollision = enemyPosition.find((enemy) => {
    const enemyCollisionX = enemy.x.toFixed(3) == playerPosition.x.toFixed(3);
    const enemyCollisionY = enemy.y.toFixed(3) == playerPosition.y.toFixed(3);
    return enemyCollisionX && enemyCollisionY;
  });

  // colisión contra enemigos
  if (enemyCollision) {
    levelFail();
  }

  game.fillText(emojis["PLAYER"], playerPosition.x, playerPosition.y);
}

function levelWin() {
  // console.log("Subiste de nivel");
  level++;
  // resetea
  playerPosition.x = undefined;
  playerPosition.y = undefined;
  startGame();
}

function gameWin() {
  console.log("HAS GANADO PELOTUDO!");
  clearInterval(timeInterval);

  const recordTime = localStorage.getItem("record_time");
  const playerTime = Date.now() - timeStart;

  if (recordTime) {
    if (recordTime >= playerTime) {
      localStorage.setItem("record_time", playerTime);
      pResult.innerHTML = "¡¡Felicidades!! Has superado el récord ";
    } else {
      pResult.innerHTML = "Lo siento, no has superado el récord :l";
      console.log({ playerTime });
    }
  } else {
    localStorage.setItem("record_time", playerTime);
    pResult.innerHTML = "Muy bien, ahora intenta superar este récord";
  }
  console.log({ recordTime, playerTime });
}

function levelFail() {
  // console.log("Chocaste contra un enemigo!!!");
  lives--;

  if (lives <= 0) {
    level = 0;
    lives = 3;
    timeStart = undefined;
  }
  playerPosition.x = undefined;
  playerPosition.y = undefined;
  startGame();
}

function showLives() {
  const heartsArray = Array(lives).fill(emojis["HEART"]);

  spanLives.innerHTML = "";
  heartsArray.forEach((heart) => spanLives.append(heart));
  // spanLives.innerHTML = heartsArray;
}

function showTime() {
  spanTime.innerHTML = formatTime(Date.now() - timeStart);
}

function showRecord() {
  spanRecord.innerHTML = formatTime(localStorage.getItem("record_time"));
}

function formatTime(ms) {
  const cs = parseInt(ms / 10) % 100;
  const seg = parseInt(ms / 1000) % 60;
  const min = parseInt(ms / 60000) % 60;
  const csStr = `${cs}`.padStart(2, "0");
  const segStr = `${seg}`.padStart(2, "0");
  const minStr = `${min}`.padStart(2, "0");
  return `${minStr}:${segStr}:${csStr}`;
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
  // console.log("Me quiero mover hacia arriba");
  if (playerPosition.y - elementsSize < 0) {
    // en vez de 0 se deberia poner elementSize, pero mi canvas esta modificado
    console.log("Auch!");
  } else {
    playerPosition.y -= elementsSize;
    startGame();
  }
}

function moveLeft() {
  // console.log("Me quiero mover hacia la izquierda");
  if (playerPosition.x - elementsSize < 0) {
    console.log("Auch!");
  } else {
    playerPosition.x -= elementsSize;
    startGame();
  }
}

function moveRight() {
  // console.log("Me quiero mover hacia la derecha");
  if (playerPosition.x + elementsSize > canvasSize) {
    console.log("Auch!");
  } else {
    playerPosition.x += elementsSize;
    startGame();
  }
}

function moveDown() {
  // console.log("Me quiero mover hacia abajo");
  if (playerPosition.y + elementsSize > canvasSize) {
    console.log("Auch!");
  } else {
    playerPosition.y += elementsSize;
    startGame();
  }
}
