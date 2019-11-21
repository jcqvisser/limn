import { Page } from "./page";
import { buildPointFromPointerEvent, Point } from "./point";

export class InputTracker {
  /**
   * @param {Page} page
   * @param {(points: Point[]) => any} tickCallback
   * @param {(points: Point[]) => any} endCallback
   */
  constructor(page, tickCallback, endCallback) {
    /** @type {Point[]} */
    this.points = [];

    this.started = false;
    this.tickCallback = tickCallback;
    this.endCallback = endCallback;

    this.canvas = page.canvas;

    this.canvas.addEventListener("pointerdown", e => {
      this.start();
      this.track(buildPointFromPointerEvent(e));
      this.tick();
    });

    this.canvas.addEventListener("pointermove", e => {
      this.track(buildPointFromPointerEvent(e));
      this.tick();
    });

    this.canvas.addEventListener("pointerup", e => {
      this.track(buildPointFromPointerEvent(e));
      this.tick();
      this.end();
    });

    this.canvas.addEventListener("pointerleave", e => {
      this.track(buildPointFromPointerEvent(e));
      this.tick();
      this.end();
    });

    this.canvas.addEventListener("pointercancel", e => {
      this.track(buildPointFromPointerEvent(e));
      this.tick();
      this.end();
    });
  }

  /**
   * @param {Point} point
   */
  track(point) {
    if (this.started) {
      this.points.push(point);
    }
  }

  start() {
    delete this.points;
    this.points = [];
    this.started = true;
  }

  tick() {
    if (this.started) {
      this.tickCallback(this.points);
    }
  }

  end() {
    this.endCallback(this.points);
    delete this.points;
    this.points = [];
    this.started = false;
  }
}
