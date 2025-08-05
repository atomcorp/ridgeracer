// https://pikuma.com/blog/isometric-projection-in-games

// https://yqnn.github.io/svg-path-editor/ trace out

import initDrawCourse from "./circle";

const canvas = document.getElementById("app") as HTMLCanvasElement;
const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
const offscreenCanvas = document.getElementById(
  "offscreen"
) as HTMLCanvasElement;
const offscreenCtx = offscreenCanvas.getContext(
  "2d"
) as CanvasRenderingContext2D;

const svgId = "01helterskelter";

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

// const { getImageData } = initDrawCourse();
const getImageData = (x: number, y: number) => {
  const myImageData = offscreenCtx.getImageData(x, y, 24, 24);

  const colorData = myImageData.data;
  const colors = Array(24 * 24)
    .fill(0)
    .map((_, i) => {
      return colorData[i * 4 + 3] > 0 ? 1 : 0;
    });

  return colors;
};

const gap = 4;
let sizeW = xStart + (23 + 23) * width * 2;
let sizeH = yStart + (0 - 23) * height;
console.log(sizeW, sizeH);

const courseimg = new Image();
courseimg.crossOrigin = "anonymous";
courseimg.src = `./src/courses/${svgId}.svg`;

let pointX = 0;
let pointY = 0;
courseimg.onload = () => {
  // https://developer.mozilla.org/en-US/docs/Web/API/SVGGeometryElement
  const path = document.getElementById(svgId) as unknown as SVGPathElement;
  const pathLength = path.getTotalLength();
  const interval = pathLength / 100;
  let progress = 0;
  // increment interval * 1,2,3 etc <= 100
  setInterval(() => {
    offscreenCtx.clearRect(0, 0, offscreenCanvas.width, offscreenCanvas.height);
    offscreenCtx.drawImage(courseimg, 0, 0);

    if (progress < pathLength) {
      progress += interval;
    } else {
      progress = 0;
    }
    const points = path.getPointAtLength(progress);
    pointX = points.x - 21 - 12;
    pointY = points.y - 12;
    draw(pointX, pointY);
    offscreenCtx.beginPath();
    offscreenCtx.arc(pointX + 12, pointY + 12, 4, 0, Math.PI * 2);
    offscreenCtx.fill();
    offscreenCtx.stroke();
  }, 140);
};

const draw = (x: number, y: number) => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  const colors = getImageData(x, y);
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
  ctx.beginPath();
  ctx.drawImage(courseimg, 0, 0, 128 * 2, 128 * 2);
  ctx.arc((x + 12) * 2, (y + 12) * 2, 4, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();
};
