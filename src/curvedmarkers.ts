// https://www.independent-software.com/determining-coordinates-on-a-html-canvas-bezier-curve.html

/**
 *
 * @param t number start = 0 / end = 1
 * @param sx start x
 * @param sy start y
 * @param cp1x
 * @param cp1y
 * @param cp2x
 * @param cp2y
 * @param ex end x
 * @param ey end y
 * @returns
 */
function getBezierXY(
  t: number,
  sx: number,
  sy: number,
  cp1x: number,
  cp1y: number,
  cp2x: number,
  cp2y: number,
  ex: number,
  ey: number
) {
  return {
    x:
      Math.pow(1 - t, 3) * sx +
      3 * t * Math.pow(1 - t, 2) * cp1x +
      3 * t * t * (1 - t) * cp2x +
      t * t * t * ex,
    y:
      Math.pow(1 - t, 3) * sy +
      3 * t * Math.pow(1 - t, 2) * cp1y +
      3 * t * t * (1 - t) * cp2y +
      t * t * t * ey,
  };
}

/**
 *
 * @param t number start = 0 / end = 1
 * @param sx start x
 * @param sy start y
 * @param cp1x control point x
 * @param cp1y control point y
 * @param ex end x
 * @param ey end y
 * @returns
 */
function getQuadraticXY(
  t: number,
  sx: number,
  sy: number,
  cp1x: number,
  cp1y: number,
  ex: number,
  ey: number
) {
  return {
    x: (1 - t) * (1 - t) * sx + 2 * (1 - t) * t * cp1x + t * t * ex,
    y: (1 - t) * (1 - t) * sy + 2 * (1 - t) * t * cp1y + t * t * ey,
  };
}

const canvas = document.getElementById("curvedmarkers") as HTMLCanvasElement;
const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

ctx.beginPath();
ctx.moveTo(12, 0);
ctx.quadraticCurveTo(12, 12, 0, 24);
const { x, y } = getQuadraticXY(0.5, 12, 0, 12, 12, 0, 24);
ctx.stroke();

ctx.beginPath();
ctx.fillStyle = "red";

ctx.arc(x, y, 2, 0, Math.PI * 2);
ctx.stroke();
