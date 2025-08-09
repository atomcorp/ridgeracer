import helterskelterSrc from "./circuits/01helterskelter.svg";
import helterskelterRaw from "./circuits/01helterskelter.svg?raw";
import wonderhillSrc from "./circuits/02wonderhill.svg";
import wonderhillRaw from "./circuits/02wonderhill.svg?raw";
import edgeoftheearthSrc from "./circuits/03edgeoftheearth.svg";
import edgeoftheearthRaw from "./circuits/03edgeoftheearth.svg?raw";
import outofblueSrc from "./circuits/04outofblue.svg";
import outofblueRaw from "./circuits/04outofblue.svg?raw";
import phantommileSrc from "./circuits/05phantommile.svg";
import phantommileRaw from "./circuits/05phantommile.svg?raw";
import brightestniteSrc from "./circuits/06brightestnite.svg";
import brightestniteRaw from "./circuits/06brightestnite.svg?raw";
import heavenandhellSrc from "./circuits/07heavenandhell.svg";
import heavenandhellRaw from "./circuits/07heavenandhell.svg?raw";
import shootinghoopsSrc from "./circuits/08shootinghoops.svg";
import shootinghoopsRaw from "./circuits/08shootinghoops.svg?raw";

export const getCircuit = (circuit: string) => {
  let src = helterskelterSrc;
  let raw = helterskelterRaw;

  if (circuit === "02wonderhill") {
    src = wonderhillSrc;
    raw = wonderhillRaw;
  }

  if (circuit === "03edgeoftheearth") {
    src = edgeoftheearthSrc;
    raw = edgeoftheearthRaw;
  }

  if (circuit === "04outofblue") {
    src = outofblueSrc;
    raw = outofblueRaw;
  }

  if (circuit === "05phantommile") {
    src = phantommileSrc;
    raw = phantommileRaw;
  }

  if (circuit === "06brightestnite") {
    src = brightestniteSrc;
    raw = brightestniteRaw;
  }

  if (circuit === "07heavenandhell") {
    src = heavenandhellSrc;
    raw = heavenandhellRaw;
  }

  if (circuit === "08shootinghoops") {
    src = shootinghoopsSrc;
    raw = shootinghoopsRaw;
  }

  return {
    src,
    raw,
  };
};
