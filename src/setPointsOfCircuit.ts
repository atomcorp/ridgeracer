import svgCode from "./courses/01helterskelter.svg?raw"; // xml string

export const setPointsOfCircuit = () => {
  const templateEl = document.createElement("template");
  templateEl.innerHTML = svgCode;

  const path = templateEl.content.querySelector("path") as SVGPathElement;
  const circuitLength = path.getTotalLength();
  const pointLength = circuitLength / 100;
  const getPointOfCircuit = (point: number) => {
    const points = path.getPointAtLength(point);
    const pointX = points.x - 12;
    const pointY = points.y - 12;
    return {
      x: pointX,
      y: pointY,
    };
  };
  // todo: coushouldld probably normalise this stuff, so don't have to export circuitLength, pointLength

  return { getPointOfCircuit, circuitLength, pointLength };
};
