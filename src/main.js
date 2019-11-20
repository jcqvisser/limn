import { Page } from "./drawing/page";
import { InputTracker } from "./drawing/inputTracker";

const page = new Page("scribble-canvas");
const tracker = new InputTracker(
  page,
  p => console.log(p), // TODO draw rather than logging
  p => console.log(p)
);
