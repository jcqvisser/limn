import { Point } from "../point";
import { Page } from "../page";

export class BasicPen {
  /**
   *
   * @param {Page} page
   * @returns { (points: Point[]) => void }
   */
  drawOn(page) {
    return points => this.drawLines(points, page);
  }

  /**
   * @param {Point[]} points
   * @param {Page} page
   */
  drawLines(points, page) {
    for (let i = 1; i < points.length; i++) {
      this.drawLine(points[i - 1], points[i], page);
    }
  }

  /**
   * @param {Point} point1
   * @param {Point} point2
   * @param {Page} page
   */
  drawLine(point1, point2, page) {
    page.context.beginPath();
    page.context.strokeStyle = "black";
    page.context.lineWidth = point1.pressure * 30;

    page.context.moveTo(
      point1.xWithOffset(page.xOffset),
      point1.yWithOffset(page.yOffset)
    );

    page.context.lineTo(
      point2.xWithOffset(page.xOffset),
      point2.yWithOffset(page.yOffset)
    );

    page.context.lineWidth = point2.pressure * 30;

    page.context.lineCap = "round";
    page.context.stroke();
    page.context.closePath();
  }
}
