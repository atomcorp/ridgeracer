const canvas = document.getElementById("trace") as HTMLCanvasElement;
const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

const courseimg = new Image();
courseimg.crossOrigin = "anonymous";
courseimg.src = "./src/courses/shootinghoops.png";
courseimg.addEventListener("load", () => {
  ctx.drawImage(courseimg, 0, 0);
  //   courseimg.style.display = "none";
  ctx.beginPath();
  ctx.moveTo(40, 30);
  ctx.lineTo(20, 30);
  ctx.bezierCurveTo(4, 30, 4, 56, 20, 56);
  ctx.lineTo(50, 56);
  ctx.quadraticCurveTo(54, 56, 60, 65);
  ctx.lineTo(76, 91);
  // exit
  ctx.quadraticCurveTo(120, 56, 40, 30);
  ctx.strokeStyle = "blue";
  ctx.lineWidth = 3;
  ctx.stroke();
});

canvas.addEventListener("mousemove", (e) => {
  const bounding = canvas.getBoundingClientRect();
  const x = e.clientX - bounding.left;
  const y = e.clientY - bounding.top;
  console.log(x, y);
});

ctx.arc(40, 30, 4, 0, Math.PI * 2);
ctx.stroke();
