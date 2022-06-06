const expect = require("chai").expect;
import {analysis} from "../core/analysis/analysis";

describe("COMBINATION", () => {
    it("сочетаются ли цвета", () => {
        expect(analysis("розовый", "красный")).equal(true);
    });
});
