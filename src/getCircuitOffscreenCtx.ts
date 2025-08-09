import { getCircuit } from "./getCircuit";

export const setCircuitOffscreenCtx = (circuit: string) => {
  const { raw, src } = getCircuit(circuit);
  const svgDomElement = document.createElement("template");
  svgDomElement.innerHTML = raw;
  const offscreenCanvas = new OffscreenCanvas(128, 128);
  const offscreenCtx = offscreenCanvas.getContext("2d", {
    willReadFrequently: true,
  }) as OffscreenCanvasRenderingContext2D;
  const circuitImg = new Image();
  circuitImg.crossOrigin = "anonymous";
  circuitImg.src = src;
  circuitImg.onload = () => {
    offscreenCtx.drawImage(circuitImg, 0, 0);
  };

  const getCircuitPointImageData = (x: number, y: number) => {
    const circuitPointImage = offscreenCtx.getImageData(x, y, 24, 24);
    const circuitPointImageData = circuitPointImage.data;
    return Array(24 * 24)
      .fill(0)
      .map((_, i) => {
        return circuitPointImageData[i * 4 + 3] > 0 ? 1 : 0;
      });
  };
  return { getCircuitPointImageData };
};
