import helterskelterSrc from "./courses/01helterskelter.svg";
import helterskelterRaw from "./courses/01helterskelter.svg?raw";
import shootinghoopsSrc from "./courses/08shootinghoops.svg";
import shootinghoopsRaw from "./courses/08shootinghoops.svg?raw";

export const getCircuit = (circuit: string) => {
  let src = helterskelterSrc;
  let raw = helterskelterRaw;

  if (circuit === "08shootinghoops") {
    src = shootinghoopsSrc;
    raw = shootinghoopsRaw;
  }

  return {
    src,
    raw,
  };
};
