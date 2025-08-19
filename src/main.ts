import { setDrawCircuit } from "./setDrawCircuit";
import { setDrawCircuitPoint } from "./setDrawCircuitPoint";
import { setupContext } from "./setupContext";
import { setCircuitOffscreenCtx } from "./getCircuitOffscreenCtx";
import { setPointsOfCircuit } from "./setPointsOfCircuit";
import { circuitData, circuitNames } from "./circuits";

const mainCanvas = document.getElementById("minimap") as HTMLCanvasElement;
// generic - setup context (scale ctx, set canvas width/height)
const mainCtx = setupContext(mainCanvas);
const controlsEl = document.getElementById(
  "play-controls"
) as HTMLButtonElement;
const playerEl = document
  .getElementById("player")
  ?.querySelector("audio") as HTMLAudioElement;

const nowPlayingEl = document.getElementById("now-playing") as HTMLDivElement;
const playerIcon = document.getElementById("player-icon") as HTMLImageElement;
type State = {
  currentCircuit: (typeof circuitData)[(typeof circuitNames)[number]];
  stopAnimation?: () => void;
};

const state: State = {
  currentCircuit: circuitData[circuitNames[0]],
  stopAnimation: undefined,
};

const updateUi = () => {
  const circuitNameEl = document.querySelector(
    '[data-type="name"]'
  ) as HTMLDivElement;
  const circuitLapsEl = document.querySelector(
    '[data-type="laps"]'
  ) as HTMLDivElement;
  const circuitLengthEl = document.querySelector(
    '[data-type="length"]'
  ) as HTMLDivElement;
  const circuitDateEl = document.querySelector(
    '[data-type="date"]'
  ) as HTMLDivElement;
  const circuitBgmEl = document.querySelector(
    '[data-type="bgm"]'
  ) as HTMLDivElement;
  circuitNameEl.textContent = state.currentCircuit.name;
  circuitLapsEl.textContent = `Laps ${state.currentCircuit.laps}`;
  circuitLengthEl.textContent = `Length: ${state.currentCircuit.length} ml`;
  circuitDateEl.textContent = `Date: ${state.currentCircuit.date}`;

  circuitBgmEl.innerHTML = "BGM: ";
  state.currentCircuit.bgm.forEach((track, i) => {
    const startSongButton = document.createElement("button");
    startSongButton.dataset.addToPlayer = "true";
    startSongButton.dataset.filename = track.link;
    startSongButton.innerText = track.name;
    startSongButton.classList.add("play-song");
    circuitBgmEl.appendChild(startSongButton);
    if (i < state.currentCircuit.bgm.length - 1) {
      const divider = document.createElement("span");
      divider.textContent = "/";
      circuitBgmEl.appendChild(divider);
    }
  });
};

const addTrack = (trackId: string, trackName: string) => {
  playerEl.src = `/${trackId}`;
  playerEl.play();
  playerIcon.src = "/pause-fill.svg";
  nowPlayingEl.innerText = `Now playing: \n ${trackName}`;
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

const nextButton = document.getElementById("next") as HTMLButtonElement;
nextButton.addEventListener("click", () => {
  if (state.stopAnimation) {
    state.stopAnimation();
  }
  const currentCircuitIndex = circuitNames.findIndex(
    (id) => id === state.currentCircuit.id
  );
  const nextIndex =
    currentCircuitIndex < circuitNames.length - 1 ? currentCircuitIndex + 1 : 0;
  state.currentCircuit = circuitData[circuitNames[nextIndex]];
  state.stopAnimation = runCircuitAnimation(state.currentCircuit.id);
  // select the circuit radio button
  document.getElementById(state.currentCircuit.id)?.click();
});

const prevButton = document.getElementById("prev") as HTMLButtonElement;
prevButton.addEventListener("click", () => {
  if (state.stopAnimation) {
    state.stopAnimation();
  }
  const currentCircuitIndex = circuitNames.findIndex(
    (id) => id === state.currentCircuit.id
  );
  const prevIndex =
    currentCircuitIndex > 0 ? currentCircuitIndex - 1 : circuitNames.length - 1;
  state.currentCircuit = circuitData[circuitNames[prevIndex]];
  state.stopAnimation = runCircuitAnimation(state.currentCircuit.id);
  // select the circuit radio button
  document.getElementById(state.currentCircuit.id)?.click();
});

document.addEventListener("click", (e) => {
  const target = e.target as HTMLElement;

  if (target.dataset?.addToPlayer === "true" && target.dataset?.filename) {
    addTrack(target.dataset?.filename, target.innerText);
  }
});

controlsEl.addEventListener("click", () => {
  if (playerEl.paused) {
    playerEl.play();
    playerIcon.src = "/pause-fill.svg";
  } else {
    playerEl.pause();
    playerIcon.src = "/play-fill.svg";
  }
});

state.stopAnimation = runCircuitAnimation(state.currentCircuit.id);
