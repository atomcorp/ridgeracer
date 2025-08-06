import svgCode from "./courses/01helterskelter.svg?raw"; // xml string
import imgSrc from "./courses/01helterskelter.svg"; // data:image

/**
 * Create
 * @returns offscreenCtx
 */
export const setCircuitOffscreenCtx = () => {
  const svgDomElement = document.createElement("template");
  svgDomElement.innerHTML = svgCode;
  const offscreenCanvas = new OffscreenCanvas(128, 128);
  const offscreenCtx = offscreenCanvas.getContext(
    "2d"
  ) as OffscreenCanvasRenderingContext2D;
  const courseimg = new Image();
  courseimg.crossOrigin = "anonymous";
  courseimg.src = imgSrc;
  courseimg.onload = () => {
    offscreenCtx.drawImage(courseimg, 0, 0);
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
