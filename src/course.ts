const courseId = "01helterskelter";

export const drawCourse = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number
) => {
  const offscreenCanvas = new OffscreenCanvas(512, 512);

  const offscreenCtx = offscreenCanvas.getContext(
    "2d"
  ) as OffscreenCanvasRenderingContext2D;

  const svgPath = document.getElementById(
    courseId
  ) as unknown as SVGPathElement;
  const canvasPath = new Path2D(svgPath.getAttribute("d") as string);
  //   offscreenCtx.clearRect(0, 0, 512, 512);
  offscreenCtx.beginPath();
  // svg size is 128, canvas is 4x that
  offscreenCtx.scale(4, 4);
  offscreenCtx.lineWidth = 3;
  offscreenCtx.strokeStyle = "#fcd96f";

  offscreenCtx.stroke(canvasPath);
  //   offscreenCtx.closePath();

  //   offscreenCtx.arc(x, y, 0.1, 0, Math.PI * 2);
  //   offscreenCtx.fill();
  //   offscreenCtx.beginPath();
  offscreenCtx.beginPath();
  offscreenCtx.fillStyle = "rgb(255 0 0 / 0)";
  offscreenCtx.strokeStyle = "#f2f1e5";
  offscreenCtx.lineWidth = 1;
  offscreenCtx.arc(x + 12, y + 12, 3, 0, Math.PI * 2);
  offscreenCtx.stroke();
  offscreenCtx.scale(-4, -4);

  return offscreenCanvas;
};
