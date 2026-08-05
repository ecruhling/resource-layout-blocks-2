import {
	clearBootstrapFlexBreakpoint,
	parseBootstrapFlexFromClassName,
	updateBootstrapFlexSlot,
} from "../../src/utils/classname-bootstrap-flex.js";
import {
	clearBootstrapFlexItemBreakpoint,
	parseBootstrapFlexItemFromClassName,
	updateBootstrapFlexItemSlot,
} from "../../src/utils/classname-bootstrap-flex-item.js";

describe("Bootstrap flex container utilities", () => {
	test("parses each flex setting independently", () => {
		const result = parseBootstrapFlexFromClassName(
			"flex-row flex-md-column flex-md-wrap justify-content-md-between align-items-center align-content-lg-stretch"
		);

		expect(result[""].direction).toBe("row");
		expect(result[""].alignItems).toBe("center");
		expect(result.md).toMatchObject({ direction: "column", wrap: "wrap", justify: "between" });
		expect(result.lg.alignContent).toBe("stretch");
	});

	test("updates one setting and clears all settings for one breakpoint", () => {
		const updated = updateBootstrapFlexSlot(
			"card flex-md-row flex-md-wrap justify-content-md-start flex-lg-column",
			"md",
			"direction",
			"column-reverse"
		);

		expect(updated).toBe(
			"card flex-md-wrap justify-content-md-start flex-lg-column flex-md-column-reverse"
		);
		expect(clearBootstrapFlexBreakpoint(updated, "md")).toBe("card flex-lg-column");
	});
});

describe("Bootstrap flex item utilities", () => {
	test("parses grow, shrink, alignment, and order slots", () => {
		const result = parseBootstrapFlexItemFromClassName(
			"flex-grow-1 flex-md-shrink-0 align-self-md-center order-lg-first"
		);

		expect(result[""].grow).toBe("1");
		expect(result.md).toMatchObject({ shrink: "0", alignSelf: "center" });
		expect(result.lg.order).toBe("first");
	});

	test("updates and clears a breakpoint without disturbing container utilities", () => {
		const updated = updateBootstrapFlexItemSlot(
			"flex-md-row flex-md-grow-0 order-md-2 card",
			"md",
			"grow",
			"1"
		);

		expect(updated).toBe("flex-md-row order-md-2 card flex-md-grow-1");
		expect(clearBootstrapFlexItemBreakpoint(updated, "md")).toBe("flex-md-row card");
	});
});
