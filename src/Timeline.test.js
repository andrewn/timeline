import Subject from "./Timeline";

describe("Timeline", () => {
  test("constructed with no events and currentTime of 0", () => {
    const instance = new Subject();
    expect(instance.events).toEqual([]);
    expect(instance.currentTime).toEqual(0);
  });

  test("add single via add(event)", () => {
    const instance = new Subject();
    instance.add({ id: "2", start: 0, end: 1 });
    expect(instance.events).toEqual([{ id: "2", start: 0, end: 1 }]);
  });

  test("add single via add([event, event])", () => {
    const instance = new Subject();
    instance.add([
      { id: "2", start: 0, end: 1 },
      { id: "3", start: 0, end: 1 }
    ]);
    expect(instance.events).toEqual([
      { id: "2", start: 0, end: 1 },
      { id: "3", start: 0, end: 1 }
    ]);
  });

  test("current events for time are availble", () => {
    const instance = new Subject();
    instance.add({ id: "2", start: 0, end: 1 });
    expect(instance.current).toEqual([{ id: "2", start: 0, end: 1 }]);
  });

  test("updating currentTime will update current events", () => {
    const instance = new Subject();
    instance.add({ id: "2", start: 0, end: 1 });
    instance.currentTime = 2;
    expect(instance.current).toEqual([]);
  });

  test.skip("change event emitted when current events are different", () => {
    const instance = new Subject();
    const changeHandler = jest.fn();

    instance.on("change", changeHandler);

    instance.add([
      { id: "1", start: 0, end: 1 },
      { id: "2", start: 1, end: 2 }
    ]);

    expect(changeHandler).toHaveBeenLastCalledWith({
      current: [{ id: "1", start: 0, end: 1 }]
    });

    instance.currentTime = 0.5;
    instance.currentTime = 1.5;

    expect(instance.changeHandler).toHaveBeenCalledTimes();
    expect(instance.current).toEqual([]);
  });
});
