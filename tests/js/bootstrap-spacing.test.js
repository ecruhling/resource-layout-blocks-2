import {
	parseBootstrapSpacingFromClassName,
	updateBootstrapSpacingSlot,
} from "../../src/utils/classname-bootstrap-spacing.js";

describe("Bootstrap spacing utilities", () => {
	test("parses all-axis, axis, side, breakpoint, and margin-auto classes", () => {
		const result = parseBootstrapSpacingFromClassName(
			"p-2 px-3 pt-5 mb-md-4 me-lg-auto"
		);

		expect(result.p[""]).toEqual({ "": "2", t: "5", b: "2", s: "3", e: "3" });
		expect(result.m.md.b).toBe("4");
		expect(result.m.lg.e).toBe("auto");
	});

	test("replaces a side and removes conflicting composite tokens", () => {
		expect(
			updateBootstrapSpacingSlot("card p-md-2 px-md-3 ps-md-4 mb-1", {
				type: "p",
				bp: "md",
				side: "s",
			}, "5")
		).toBe("card mb-1 ps-md-5");
	});

	test("replacing the all-sides slot removes every conflicting slot", () => {
		expect(
			updateBootstrapSpacingSlot("pt-1 px-2 pb-3 text-center", {
				type: "p",
				side: "",
			}, "4")
		).toBe("text-center p-4");
	});

	test("removes a slot when passed null", () => {
		expect(
			updateBootstrapSpacingSlot("mt-2 mt-md-3 card", {
				type: "m",
				bp: "md",
				side: "t",
			}, null)
		).toBe("mt-2 card");
	});

	test("rejects invalid slots and padding auto without changing the input", () => {
		expect(
			updateBootstrapSpacingSlot("p-2", { type: "p", side: "x" }, "3")
		).toBe("p-2");
		expect(
			updateBootstrapSpacingSlot("p-2", { type: "p", side: "t" }, "auto")
		).toBe("p-2");
	});
});
