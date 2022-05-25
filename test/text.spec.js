const expect = require("chai").expect;
const { analysis } = require("../analysis");

describe("COMBINATION", () => {
    it("сочетаются ли цвета", () => {
        expect(analysis("розовый", "красный")).equal(true);
    });
});
