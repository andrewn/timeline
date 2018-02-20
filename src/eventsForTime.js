const isValid = event =>
  event != null &&
  typeof event.start === "number" &&
  typeof event.end === "number";

export default (currentTime = 0, events = []) => {
  events.forEach(Object.freeze);

  const matches = events.reduce((matching, event) => {
    if (!isValid(event)) {
      throw new Error(`start and end must be a number`);
    }

    if (event.start <= currentTime && event.end > currentTime) {
      matching.push(event);
    }

    return matching;
  }, []);

  return Object.freeze(matches);
};
