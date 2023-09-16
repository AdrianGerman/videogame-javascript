const canvas = document.querySelector("#game");
const game = canvas.getContext("2d");

window.addEventListener("load", startGame);

function startGame() {
  let canvasSize;

  if (window.innerHeight > window.innerWidth) {
    canvasSize = window.innerWidth * 0.8;
  } else {
    canvasSize = window.innerHeight * 0.8;
  }

  canvas.setAttribute("width", canvasSize);
  canvas.setAttribute("height", canvasSize);

  const elementsSize = canvasSize / 10 - 1;

  console.log({ canvasSize, elementsSize });

  game.font = elementsSize + "px Verdana";
  game.textAlign = "";

  for (let i = 0; i <= 9; i++) {
    for (let z = 1; z < 11; z++) {
      game.fillText(emojis["X"], elementsSize * i, elementsSize * z);
    }
  }

  //   game.fillRect(0, 0, 100, 100);
  //   game.clearRect(0, 0, 50, 50);
}
