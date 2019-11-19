import { Point } from "./point";

export class Page {
  /**
   * @param {string} canvasId
   */
  constructor(canvasId) {
    this.canvasId = canvasId;
  }

  get canvas() {
    if (!this._canvas) {
      this._canvas = /** @type {HTMLCanvasElement} */ (document.getElementById(
        this.canvasId
      ));
    }

    return this._canvas;
  }

  get context() {
    return this.canvas.getContext("2d");
  }

  get xOffset() {
    return this.canvas.getBoundingClientRect().left;
  }

  get yOffset() {
    return this.canvas.getBoundingClientRect().top;
  }

  /**
   * @param {Point} point1
   * @param {Point} point2
   */
  drawLine(point1, point2) {
    ctx.beginPath();
    ctx.strokeStyle = "black";
    ctx.lineWidth = point1.pressure * 30;

    ctx.moveTo(
      point1.xWithOffset(this.xOffset),
      point1.yWithOffset(this.yOffset)
    );

    ctx.lineTo(
      point2.xWithOffset(this.xOffset),
      point2.yWithOffset(this.yOffset)
    );

    ctx.lineWidth = point2.pressure * 30;

    ctx.lineCap = "round";
    ctx.stroke();
    ctx.closePath();
  }
}
