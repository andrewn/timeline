const subject = require("./index").default;

describe("timeline", () => {
  test("exports function", () => {
    expect(typeof subject).toBe("function");
  });

  test("returns matching events ", () => {
    expect(subject(0, [])).toEqual([]);
  });
});
