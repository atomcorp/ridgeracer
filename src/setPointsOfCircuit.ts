import { getCircuit } from "./getCircuit";

export const setPointsOfCircuit = (circuit: string) => {
  const { raw } = getCircuit(circuit);
  const templateEl = document.createElement("template");
  templateEl.innerHTML = raw;

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
