import subject from "./eventsForTime";

describe("eventsForTime()", () => {
  test("exports function", () => {
    expect(typeof subject).toBe("function");
  });

  test("returns no events by default", () => {
    expect(subject(0, [])).toEqual([]);
  });

  const events = [{ id: "1", start: 0, end: 1 }, { id: "2", start: 1, end: 2 }];

  test("returns matching events", () => {
    expect(subject(0, events)).toEqual([{ id: "1", start: 0, end: 1 }]);
    expect(subject(1.5, events)).toEqual([{ id: "2", start: 1, end: 2 }]);
  });

  test("returns no events that are out of range", () => {
    expect(subject(-10, events)).toEqual([]);
    expect(subject(10, events)).toEqual([]);
  });

  test("matching events are frozen, allowing object identity checks", () => {
    const matching = subject(0, events);

    expect(matching[0]).toBe(events[0]);

    expect(Object.isFrozen(matching[0])).toBe(true);

    expect(() => (matching[0].end = 100)).toThrowError(TypeError);
    expect(matching[0].end).toBe(1);
  });

  const overlapping = [
    { id: "1", start: 0, end: 1.5 },
    { id: "2", start: 0.5, end: 2 }
  ];

  test("events can overlap in time", () => {
    expect(subject(1.1, overlapping)).toEqual([
      { id: "1", start: 0, end: 1.5 },
      { id: "2", start: 0.5, end: 2 }
    ]);
    expect(subject(1.8, overlapping)).toEqual([
      { id: "2", start: 0.5, end: 2 }
    ]);
  });

  test("start and end must be numbers", () => {
    expect(() => subject(0, [{ id: "1", start: "0", end: "1.234" }])).toThrow();
  });
});
