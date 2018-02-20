const subject = require("./index").default;

describe("timeline", () => {
  test("exports function", () => {
    expect(typeof subject).toBe("function");
  });

  test("returns no events by default", () => {
    expect(subject(0, [])).toEqual([]);
  });

  const events = [{ id: "1", start: 0, end: 1 }, { id: "2", start: 1, end: 2 }];

  test("returns matching events", () => {
    expect(subject(0, events)).toEqual([{ id: "1", start: 0, end: 1 }]);
  });

  test("matching event should be a clone, not the actual object", () => {
    expect(subject(0, events)[0]).not.toBe(events[0]);
  });

  test("start and end must be numbers", () => {
    expect(() => subject(0, [{ id: "1", start: "0", end: "1.234" }])).toThrow();
  });
});
