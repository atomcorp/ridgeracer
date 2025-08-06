import imgSrc from "./courses/01helterskelter.svg";
import imgCode from "./courses/01helterskelter.svg?raw";

const svgDomElement = document.createElement("template");
svgDomElement.innerHTML = imgCode;
console.log(svgDomElement.content);
export const getCoursePosition = (
  callback: (x: number, y: number, imgData: (0 | 1)[]) => void
) => {
  const offscreenCanvas = new OffscreenCanvas(128, 128);
  const offscreenCtx = offscreenCanvas.getContext(
    "2d"
  ) as OffscreenCanvasRenderingContext2D;

  const getImageData = (x: number, y: number) => {
    const myImageData = offscreenCtx.getImageData(x, y, 24, 24);

    const colorData = myImageData.data;
    const colors = Array(24 * 24)
      .fill(0)
      .map((_, i) => {
        return colorData[i * 4 + 3] > 0 ? 1 : 0;
      });

    return colors;
  };

  const courseimg = new Image();
  courseimg.crossOrigin = "anonymous";
  courseimg.src = imgSrc;
  courseimg.onload = () => {
    // https://developer.mozilla.org/en-US/docs/Web/API/SVGGeometryElement
    const path = svgDomElement.content.querySelector("path") as SVGPathElement;
    const pathLength = path.getTotalLength();
    const interval = pathLength / 100;
    let progress = 0;
    // increment interval * 1,2,3 etc <= 100
    offscreenCtx.drawImage(courseimg, 0, 0);
    setInterval(() => {
      // offscreenCtx.clearRect(
      //   0,
      //   0,
      //   offscreenCanvas.width,
      //   offscreenCanvas.height
      // );

      if (progress < pathLength) {
        progress += interval;
      } else {
        progress = 0;
      }
      const points = path.getPointAtLength(progress);
      const pointX = points.x - 12;
      const pointY = points.y - 12;
      //   draw(pointX, pointY);
      //   offscreenCtx.beginPath();
      //   offscreenCtx.arc(pointX + 12, pointY + 12, 4, 0, Math.PI * 2);
      //   offscreenCtx.fill();
      //   offscreenCtx.stroke();
      callback(pointX, pointY, getImageData(pointX, pointY));
    }, 160);
  };
};
