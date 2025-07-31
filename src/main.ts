const canvas = document.getElementById("app") as HTMLCanvasElement;
const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

const canvasWidth = canvas.width;
const canvasHeight = canvas.height;

const width = 4;
const height = 4;

const xStart = canvasWidth / 2 - width / 2;
const yStart = height;

function drawSpot(x: number, y: number) {
  ctx.beginPath();
  let newX = xStart + (x - y) * width * 2;
  let newY = yStart + (x + y) * height;
  ctx.arc(newX, newY, width, 0, 2 * Math.PI);
  if (x === 0 && y === 0) {
    ctx.fillStyle = "red";
  } else {
    ctx.fillStyle = "black";
  }
  ctx.fill();
}

// https://pikuma.com/blog/isometric-projection-in-games

const gap = 4;
for (let indexX = 0; indexX < 25; indexX++) {
  for (let indexY = 0; indexY < 25; indexY++) {
    drawSpot(indexX, indexY);
  }
}
