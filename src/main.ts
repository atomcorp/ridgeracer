import { drawCourse } from "./course";
import { setCourseDetail } from "./courseDetail";
import { getCoursePosition } from "./cousePosition";

export const gridSize = 24;
export const width = 1;
export const height = 1;

// OffscreenCanvas
function setupContext(canvas: HTMLCanvasElement) {
  // Get the device pixel ratio, falling back to 1.
  var dpr = window.devicePixelRatio || 1;
  // fix width/height to css pixels
  canvas.style.width = canvas.width + "px";
  canvas.style.height = canvas.width + "px";
  // Get the size of the canvas in CSS pixels.
  var rect = canvas.getBoundingClientRect();
  // Give the canvas pixel dimensions of their CSS
  // size * the device pixel ratio.
  canvas.width = rect.width * dpr;
  canvas.height = rect.height * dpr;
  const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
  // Scale all drawing operations by the dpr, so you
  // don't have to worry about the difference.
  ctx.scale(dpr, dpr);
}
const canvas = document.getElementById("course") as HTMLCanvasElement;
setupContext(canvas);
const courseDetail = setCourseDetail(canvas);

const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
getCoursePosition((x: number, y: number, colors: (0 | 1)[]) => {
  // ctx.clearRect(0, 0, canvas.width, canvas.height);
  // console.log(x, y);
  courseDetail.draw(colors);
  const offCanvas = drawCourse(ctx, x, y);
  ctx.drawImage(offCanvas, 0, 0);
});
