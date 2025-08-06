import { drawCourse } from "./course";
import { setCircuitPointDraw } from "./courseDetail";
import { getCoursePosition } from "./cousePosition";
import { setupContext } from "./setupContext";

export const gridSize = 24;
export const width = 1;
export const height = 1;

// main canvas
const mainCanvas = document.getElementById("course") as HTMLCanvasElement;
// generic - setup context (scale ctx, set canvas width/height)
setupContext(mainCanvas);
// const courseDetail = setCourseDetail(mainCanvas);

const mainCtx = mainCanvas.getContext("2d") as CanvasRenderingContext2D;
// getCoursePosition((x: number, y: number, colors: (0 | 1)[]) => {
//   // ctx.clearRect(0, 0, canvas.width, canvas.height);
//   // console.log(x, y);

//   // draw points map
//   courseDetail.draw(colors);
//   // draw course
//   drawCourse(mainCtx, x, y);
// });

// main canvas, draw everything on that
// circuitPoint canvas -
// circuit canvas

// logic
//
// 1. circuit canvas offscreen OK
// 2. getGridFromPosition - get position of circuit OK
// 3. go through each point interval, get relative point of circuit canvas TODO
// 4. get the grid contents Array<(0|1)> * 24 * 24
//
// == draw
// draw the grid
// draw an overlay of the circuit
// draw the current circuit point on the circuit

// create offscreen circuit
import { setCircuitOffscreenCtx } from "./getCircuitOffscreenCtx";
import { setPointsOfCircuit } from "./setPointsOfCircuit";

/**
 *
 */
const { getPointOfCircuit, circuitLength, pointLength } = setPointsOfCircuit();
const { getCircuitPointImageData } = setCircuitOffscreenCtx();

const { drawCircuitPoint } = setCircuitPointDraw(mainCanvas);

let currentCircuitPoint = 0;

setInterval(() => {
  if (currentCircuitPoint < circuitLength) {
    currentCircuitPoint += pointLength;
  } else {
    currentCircuitPoint = 0;
  }
  const { x, y } = getPointOfCircuit(currentCircuitPoint);

  const circuitPointImageData = getCircuitPointImageData(x, y);

  mainCtx.clearRect(0, 0, mainCanvas.width, mainCanvas.height);
  drawCircuitPoint(circuitPointImageData);
  drawCourse(mainCtx, x, y);
}, 160);
