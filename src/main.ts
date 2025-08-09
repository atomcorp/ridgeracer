import { setDrawCircuit } from "./setDrawCircuit";
import { setDrawCircuitPoint } from "./setDrawCircuitPoint";
import { setupContext } from "./setupContext";
import { setCircuitOffscreenCtx } from "./getCircuitOffscreenCtx";
import { setPointsOfCircuit } from "./setPointsOfCircuit";

const mainCanvas = document.getElementById("minimap") as HTMLCanvasElement;
// generic - setup context (scale ctx, set canvas width/height)
const mainCtx = setupContext(mainCanvas);

const runCircuitAnimation = (circuitName: string) => {
  const { getPointOfCircuit, circuitLength, pointLength } =
    setPointsOfCircuit(circuitName);
  const { getCircuitPointImageData } = setCircuitOffscreenCtx(circuitName);
  const { drawCircuitPoint } = setDrawCircuitPoint(mainCanvas);
  const { drawCircuit } = setDrawCircuit(
    circuitName,
    mainCtx,
    mainCanvas.width
  );

  let currentCircuitPoint = 0;
  // todo: replace with requestanimationframe
  const intervalId = setInterval(() => {
    if (currentCircuitPoint < circuitLength) {
      currentCircuitPoint += pointLength;
    } else {
      currentCircuitPoint = 0;
    }
    mainCtx.clearRect(0, 0, mainCanvas.width, mainCanvas.height);

    const { x, y } = getPointOfCircuit(currentCircuitPoint);
    const circuitPointImageData = getCircuitPointImageData(x, y);

    drawCircuitPoint(circuitPointImageData);
    drawCircuit(x, y);
  }, 160);
  return () => {
    clearInterval(intervalId);
  };
};

let stopAnimation: () => void | undefined;

document.addEventListener("click", (e) => {
  const target = e.target as HTMLElement;
  if (target.tagName === "BUTTON") {
    if (stopAnimation) {
      stopAnimation();
    }
    //
    if (target.innerText === "Stop") {
      // mainCtx.clearRect(0, 0, mainCanvas.width, mainCanvas.height);
      return;
    }
    const circuitName = target.innerText;
    stopAnimation = runCircuitAnimation(circuitName);
  }
});
