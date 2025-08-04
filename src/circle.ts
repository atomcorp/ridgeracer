const canvas = document.getElementById("circle") as HTMLCanvasElement;
const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

// x = cols
// y = rows
// https://stackoverflow.com/questions/74591791/drawing-markers-on-a-quadratic-curve
// classic og https://stackoverflow.com/a/17101741/2368141
// manual https://dn790008.ca.archive.org/0/items/R4_Ridge_Racer_Type_4_1998_Namco_JP_SCPS-45356/R4_Ridge_Racer_Type_4_1998_Namco_JP_SCPS-45356.pdf
// course : https://strategywiki.org/wiki/R4:_Ridge_Racer_Type_4/Courses

ctx.beginPath();
ctx.lineWidth = 3;
ctx.moveTo(12, 0);
// ctx.lineTo(0, 24);
ctx.quadraticCurveTo(24, 12, 12, 24);
ctx.quadraticCurveTo(0, 36, 12, 48);
ctx.quadraticCurveTo(24, 64, 12, 72);
ctx.quadraticCurveTo(0, 84, 12, 96);
ctx.stroke();

// i can use the coords for this to sample the 24x24 of a png
// 253, 536, 24, 24
// todo: just need to follow a line...
const myImageData = ctx.getImageData(0, 0, 24, 24);

const colorData = myImageData.data;
const colors = Array(24 * 24)
  .fill(0)
  .map((_, i) => {
    return colorData[i * 4 + 3] > 0 ? 1 : 0;
  });

// for (let index = 0; index < colors.length; index + 4) {
//   const rgbColor = `rgb(${colors[index]} ${colors[index + 1]} ${
//     colors[index + 2]
//   } / ${colors[index + 3] / 255})`;

//   pixels.push(rgbColor);
// }

export default function () {
  const getImageData = (x: number, y: number) => {
    const myImageData = ctx.getImageData(x, y, 24, 24);

    const colorData = myImageData.data;
    const colors = Array(24 * 24)
      .fill(0)
      .map((_, i) => {
        return colorData[i * 4 + 3] > 0 ? 1 : 0;
      });

    return colors;
  };
  return {
    getImageData,
  };
}

/**
 * I basically need to draw a 24x24 box around that follows the line
 * and color in any pixels it touches
 */
