import helterskelterSrc from "./courses/01helterskelter.svg";
import helterskelterCode from "./courses/01helterskelter.svg?raw";

export const getCircuit = (circuit = "01helterskelter") => {
  const svgDomElement = document.createElement("template");

  svgDomElement.innerHTML = helterskelterCode;
  const svgCode = svgDomElement.content.querySelector("path");

  return {
    helterskelterSrc,
    svgCode,
  };
};
