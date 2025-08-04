// https://pikuma.com/blog/isometric-projection-in-games

import initDrawCourse from "./circle";

const canvas = document.getElementById("app") as HTMLCanvasElement;
const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

const canvasWidth = canvas.width;
const canvasHeight = canvas.height;

const gridSize = 24;

const width = 4;
const height = 4;

const xStart = width;
const yStart = gridSize * height;

/**
 *
 * @param x
 * @param y
 */
function drawSpot(x: number, y: number, isCourse: boolean) {
  ctx.beginPath();
  let newX = xStart + (x + y) * width * 2;
  let newY = yStart + (x - y) * height;
  if (isCourse) {
    ctx.fillStyle = "red";
    newY -= height * 6;
  } else {
    ctx.fillStyle = "black";
  }
  ctx.arc(newX, newY, width, 0, 2 * Math.PI);
  ctx.fill();
}

const { getImageData } = initDrawCourse();

const gap = 4;
let sizeW = xStart + (23 + 23) * width * 2;
let sizeH = yStart + (0 - 23) * height;
console.log(sizeW, sizeH);

const draw = (yCounterOffset: number) => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  const colors = getImageData(0, yCounterOffset);
  for (let indexX = 0; indexX < gridSize; indexX++) {
    for (let indexY = 0; indexY < gridSize; indexY++) {
      let isCourse = false;
      // interesting indexY * 24 + indexX would flip the direction
      const color = colors[indexX * 24 + indexY];
      if (color) {
        isCourse = true;
      }
      drawSpot(indexX, indexY, isCourse);
    }
  }
};

let counter = 0;
// setInterval(() => {
//   if (counter < 48) {
//     counter++;
//   } else {
//     counter = 0;
//   }
//   draw(counter);
// }, 100);

draw(0);
