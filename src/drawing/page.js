import { Point } from "./point";

export class Page {
  /**
   * @param {string} canvasId
   */
  constructor(canvasId) {
    this.canvasId = canvasId;

    this.canvas = /** @type {HTMLCanvasElement} */ (document.getElementById(
      this.canvasId
    ));
    const containerRect = this.canvas.parentElement.getBoundingClientRect();

    this.canvas.setAttribute("width", containerRect.width + "px");
    this.canvas.setAttribute("height", containerRect.height + "px");
  }

  get context() {
    if (!this._context) {
      this._context = this.canvas.getContext("2d");
    }
    return this._context;
  }

  get xOffset() {
    if (!this._xOffset) {
      this._xOffset = this.canvas.getBoundingClientRect().left;
    }
    return this._xOffset;
  }

  get yOffset() {
    if (!this._yOffset) {
      this._yOffset = this.canvas.getBoundingClientRect().top;
    }
    return this._yOffset;
  }

  /**
   * @param {Point[]} points
   */
  drawLines(points) {
    for (let i = 1; i < points.length; i++) {
      this.drawLine(points[i - 1], points[i]);
    }
  }

  /**
   * @param {Point} point1
   * @param {Point} point2
   */
  drawLine(point1, point2) {
    this.context.beginPath();
    this.context.strokeStyle = "black";
    this.context.lineWidth = point1.pressure * 30;

    this.context.moveTo(
      point1.xWithOffset(this.xOffset),
      point1.yWithOffset(this.yOffset)
    );

    this.context.lineTo(
      point2.xWithOffset(this.xOffset),
      point2.yWithOffset(this.yOffset)
    );

    this.context.lineWidth = point2.pressure * 30;

    this.context.lineCap = "round";
    this.context.stroke();
    this.context.closePath();
  }
}
