import { setDrawCircuit } from "./setDrawCircuit";
import { setDrawCircuitPoint } from "./setDrawCircuitPoint";
import { setupContext } from "./setupContext";
import { setCircuitOffscreenCtx } from "./getCircuitOffscreenCtx";
import { setPointsOfCircuit } from "./setPointsOfCircuit";
import { circuitData, circuitNames } from "./circuits";

const mainCanvas = document.getElementById("minimap") as HTMLCanvasElement;
// generic - setup context (scale ctx, set canvas width/height)
const mainCtx = setupContext(mainCanvas);

type State = {
  currentCircuit: (typeof circuitData)[(typeof circuitNames)[number]];
  stopAnimation?: () => void;
};

const state: State = {
  currentCircuit: circuitData[circuitNames[0]],
  stopAnimation: undefined,
};

const updateUi = () => {
  const circuitNameEl = document.querySelector('[data-type="name"]');
  if (circuitNameEl) {
    circuitNameEl.textContent = state.currentCircuit.name;
  }
};

const runCircuitAnimation = (circuitName: string) => {
  updateUi();
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

document.getElementById("circuit-select")?.addEventListener("change", (e) => {
  const radioEl = e.target as HTMLInputElement;
  const circuitId = radioEl.id as (typeof circuitNames)[number];
  if (circuitNames.includes(circuitId)) {
    if (state.stopAnimation) {
      state.stopAnimation();
    }

    state.currentCircuit = circuitData[circuitId];
    state.stopAnimation = runCircuitAnimation(state.currentCircuit.id);
  }
});

document.addEventListener("click", (e) => {
  const target = e.target as HTMLElement;
  if (target.tagName === "BUTTON") {
    if (state.stopAnimation) {
      state.stopAnimation();
    }
    if (target.innerText === "Stop") {
      return;
    }

    const currentCircuitIndex = circuitNames.findIndex(
      (id) => id === state.currentCircuit.id
    );
    if (target.id === "next") {
      const nextIndex =
        currentCircuitIndex < circuitNames.length - 1
          ? currentCircuitIndex + 1
          : 0;
      state.currentCircuit = circuitData[circuitNames[nextIndex]];
    } else if (target.id === "prev") {
      const prevIndex =
        currentCircuitIndex > 0
          ? currentCircuitIndex - 1
          : circuitNames.length - 1;
      state.currentCircuit = circuitData[circuitNames[prevIndex]];
    }
    state.stopAnimation = runCircuitAnimation(state.currentCircuit.id);
    // select the circuit radio button
    document.getElementById(state.currentCircuit.id)?.click();
  }
});

state.stopAnimation = runCircuitAnimation(state.currentCircuit.id);
