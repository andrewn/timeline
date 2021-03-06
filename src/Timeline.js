import mitt from "mitt";
import xor from "lodash.xor";

import eventsForTime from "./eventsForTime.js";

const Private = {
  current: Symbol("current"),
  currentTime: Symbol("currentTime"),
  events: Symbol("events")
};

export default class Timeline {
  constructor() {
    Object.assign(this, mitt());

    this[Private.current] = [];
    this[Private.events] = [];

    this.currentTime = 0;
  }

  get events() {
    return this[Private.events];
  }

  add(toAdd) {
    const eventsArray = Array.isArray(toAdd) ? toAdd : [toAdd];
    this[Private.events].push(...eventsArray);

    this.update();
  }

  get current() {
    return this[Private.current];
  }

  get currentTime() {
    return this[Private.currentTime];
  }

  set currentTime(time) {
    this[Private.currentTime] = time;

    this.update();
  }

  update() {
    const previous = this[Private.current];
    const current = eventsForTime(this.currentTime, this.events);

    this[Private.current] = current;

    if (xor(previous, current).length > 0) {
      this.emit("change", { current });
    }
  }
}
