import { Page } from "./drawing/page";
import { InputTracker } from "./drawing/inputTracker";
import { BasicPen } from "./drawing/pens/basicPen";

const page = new Page("scribble-canvas");
const pen = new BasicPen();

const tracker = new InputTracker(page, pen.drawOn(page), console.log);
