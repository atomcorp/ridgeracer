export const setDrawCircuitPoint = (canvas: HTMLCanvasElement) => {
  const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
  const gridSize = 24;
  const pixelWidth =
    canvas.width / ((gridSize - 0.5) * 4 * window.devicePixelRatio); // gridSize * 2 = amount of pixels horizontally in an isometric grid

  const pixelHeight = pixelWidth;

  // space between pixels
  const xDistance = pixelWidth;
  const yDistance = pixelWidth;
  // where on canvas to start drawing
  const offsetX = pixelWidth;
  const offsetY =
    canvas.height / (4 * window.devicePixelRatio) + gridSize * pixelHeight;

  const drawPixel = (x: number, y: number, isTrackPixel: boolean) => {
    ctx.beginPath();
    let newX = offsetX + (x + y) * xDistance * 2;
    let newY = offsetY + (x - y) * yDistance;
    if (isTrackPixel) {
      ctx.fillStyle = "#fd7712";
      newY -= yDistance * 6;
    } else {
      ctx.fillStyle = "black";
    }
    ctx.arc(newX, newY, pixelWidth, 0, 2 * Math.PI);
    ctx.fill();
  };

  const drawCircuitPoint = (colors: (0 | 1)[]) => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // const colors = getImageData(x, y);
    for (let indexX = 0; indexX < gridSize; indexX++) {
      for (let indexY = 0; indexY < gridSize; indexY++) {
        let isTrackPixel = false;
        // interesting indexY * 24 + indexX would flip the direction
        const color = colors[indexX * 24 + indexY];
        // console;
        if (color) {
          isTrackPixel = true;
        }
        drawPixel(indexX, indexY, isTrackPixel);
      }
    }
  };

  return { drawCircuitPoint };
};
