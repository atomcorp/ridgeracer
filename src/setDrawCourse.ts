import { getCircuit } from "./getCircuit";

const circuitSvgSize = 128;

export const setDrawCanvas = (
  circuit: string,
  ctx: CanvasRenderingContext2D,
  canvasWidth: number
) => {
  const { raw } = getCircuit(circuit);
  const svgDomElement = document.createElement("template");
  svgDomElement.innerHTML = raw;

  const svgPath = svgDomElement.content.querySelector("path") as SVGPathElement;
  const canvasPath = new Path2D(svgPath.getAttribute("d") as string);
  const dpr = window.devicePixelRatio || 1;
  const multiplier = canvasWidth / dpr / circuitSvgSize;

  const drawCourse = (x: number, y: number) => {
    const offscreenCanvas = new OffscreenCanvas(canvasWidth, canvasWidth);

    const offscreenCtx = offscreenCanvas.getContext(
      "2d"
    ) as OffscreenCanvasRenderingContext2D;

    //   offscreenCtx.clearRect(0, 0, 512, 512);
    offscreenCtx.beginPath();
    // svg size is 128, canvas is 4x that
    offscreenCtx.scale(multiplier, multiplier);
    offscreenCtx.lineWidth = 3;
    offscreenCtx.strokeStyle = "#fcd96f";

    offscreenCtx.stroke(canvasPath);

    offscreenCtx.beginPath();
    offscreenCtx.fillStyle = "rgb(255 0 0 / 0)";
    offscreenCtx.strokeStyle = "#f2f1e5";
    offscreenCtx.lineWidth = 1;
    offscreenCtx.arc(x + 12, y + 12, 3, 0, Math.PI * 2);
    offscreenCtx.stroke();
    offscreenCtx.scale(-multiplier, -multiplier);

    ctx.drawImage(offscreenCanvas, 0, 0);
  };

  return { drawCourse };
};
