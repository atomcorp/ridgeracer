const canvas = document.getElementById("app") as HTMLCanvasElement;
const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

const canvasWidth = canvas.width;
const canvasHeight = canvas.height;

const width = 4;
const height = 4;

// const gap = 4;
// for (let indexX = 0; indexX < 25; indexX++) {
//   for (let indexY = 0; indexY < 25; indexY++) {
//   const x = (indexX) * 16;
//     const y = (indexY) * 16;
//     console.log(x, y)
//     ctx.arc(x + 4, y + 4, 4, 0, 2 * Math.PI);
//   }

// }

const cartToIso = (carX: number, carY: number) => {
  const isoX = carX + carY / 2;
  const isoY = carY - carX / 2;
  return {
    x: isoX,
    y: isoY,
  };
};

const xStart = canvasWidth / 2 - width / 2;
const yStart = height;

// x = xStart + ((x * width) * (width / 2)) --- (x * width) creates gap
// y = yStart + (x * 2) * (height / 2)
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
    // const {x, y} = cartToIso(indexX * 8, indexY * 8)
    // console.log(x, y);
    // ctx.arc(x + 4, y + 4, 4, 0, 2 * Math.PI);
    // ctx.arc((canvasWidth / 2) - (width / 2) , height, width, 0, 2 * Math.PI);
    drawSpot(indexX, indexY);
  }
}

// drawSpot(0,0);drawSpot(1, 0);drawSpot(2, 0);
// drawSpot(0,1);drawSpot(1, 1);drawSpot(2, 1);
