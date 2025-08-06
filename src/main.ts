import { drawCourse } from "./drawCourse";
import { setDrawCircuitPoint } from "./setDrawCircuitPoint";
import { setupContext } from "./setupContext";
import { setCircuitOffscreenCtx } from "./getCircuitOffscreenCtx";
import { setPointsOfCircuit } from "./setPointsOfCircuit";

const mainCanvas = document.getElementById("course") as HTMLCanvasElement;
// generic - setup context (scale ctx, set canvas width/height)
const mainCtx = setupContext(mainCanvas);

const { getPointOfCircuit, circuitLength, pointLength } = setPointsOfCircuit();
const { getCircuitPointImageData } = setCircuitOffscreenCtx();
const { drawCircuitPoint } = setDrawCircuitPoint(mainCanvas);

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
