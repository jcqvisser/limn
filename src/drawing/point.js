export class Point {
  /**
   * @param {number} x
   * @param {number} y
   * @param {number} pressure
   */
  constructor(x, y, pressure) {
    this.x = x;
    this.y = y;
    this.pressure = pressure;
  }

  /**
   * @param {number} offset
   */
  xWithOffset(offset) {
    return this.x - offset;
  }

  /**
   * @param {number} offset
   */
  yWithOffset(offset) {
    return this.y - offset;
  }
}

/**
 * @param {TouchEvent} e
 */
export const buildPointFromTouchEvent = e =>
  new Point(e.touches[0].clientX, e.touches[0].clientY, e.touches[0].force);

/**
 *
 * @param {PointerEvent} e
 */
export const buildPointFromPointerEvent = e =>
  new Point(e.clientX, e.clientY, e.pressure);
