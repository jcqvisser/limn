const canvasContainer = document.getElementById("document-container");
const containerRect = canvasContainer.getBoundingClientRect();

const canvasWidth = containerRect.right - containerRect.left;

const canvas = /** @type {HTMLCanvasElement} */ (document.getElementById(
  "scribble-canvas"
));
const textarea = document.getElementById("text-area");

const toggleFab = document.getElementById("toggle-fab");
toggleFab.addEventListener("click", e => {
  e.preventDefault();
  canvas.classList.toggle("in-front");
  textarea.classList.toggle("in-front");
});

canvas.setAttribute("width", canvasWidth + "px");

const ctx = canvas.getContext("2d");

let down = false;
let flipptyFlop = true;

/** @type {[number, number]} */
let lastPoint = [0, 0];

canvas.addEventListener("touchstart", e => {
  lastPoint = [
    e.touches[0].clientX - canvas.getBoundingClientRect().left,
    e.touches[0].clientY - canvas.getBoundingClientRect().top
  ];

  down = true;
});

canvas.addEventListener("mousedown", e => {
  lastPoint = [
    e.clientX - canvas.getBoundingClientRect().left,
    e.clientY - canvas.getBoundingClientRect().top
  ];

  down = true;
});

const draw = e => {
  if (!down) {
    return;
  }
  ctx.beginPath();
  ctx.strokeStyle = "black";
  ctx.lineWidth = e.pressure * 30;

  ctx.moveTo(...lastPoint);

  ctx.lineTo(
    e.clientX - canvas.getBoundingClientRect().left,
    e.clientY - canvas.getBoundingClientRect().top
  );

  ctx.lineCap = "round";
  ctx.stroke();
  ctx.closePath();

  lastPoint = [
    e.clientX - canvas.getBoundingClientRect().left,
    e.clientY - canvas.getBoundingClientRect().top
  ];
};

canvas.addEventListener("pointermove", draw);

canvas.addEventListener("touchend", e => {
  draw(e), (down = false);
});

canvas.addEventListener("mouseout", e => {
  draw(e), (down = false);
});

canvas.addEventListener("mouseup", e => {
  draw(e), (down = false);
});
