import {
	clearBootstrapColumnBreakpoint,
	getBootstrapColumnClassName,
	parseBootstrapColumnFromClassName,
	updateBootstrapColumnSlot,
} from "../../src/utils/classname-bootstrap-column.js";

describe("Bootstrap column utilities", () => {
	test("parses columns and offsets by breakpoint with the last value winning", () => {
		const result = parseBootstrapColumnFromClassName(
			"col col-md-4 col-md-auto offset-md-2 col-xl-12"
		);

		expect(result[""]).toEqual({ columns: "equal", offset: null });
		expect(result.md).toEqual({ columns: "auto", offset: "2" });
		expect(result.xl.columns).toBe("12");
	});

	test("adds a base column only when one is absent", () => {
		expect(getBootstrapColumnClassName("card col-md-6")).toBe("col card col-md-6");
		expect(getBootstrapColumnClassName("col-auto card")).toBe("col-auto card");
	});

	test("updates one column slot while preserving offsets and custom classes", () => {
		expect(updateBootstrapColumnSlot("card col-md-4 offset-md-2", "md", "columns", "8"))
			.toBe("card offset-md-2 col-md-8");
	});

	test("clears every column setting at a breakpoint", () => {
		expect(clearBootstrapColumnBreakpoint("col col-md-6 offset-md-2 col-lg-4", "md"))
			.toBe("col col-lg-4");
	});

	test("leaves the input unchanged for invalid breakpoints, settings, or values", () => {
		expect(updateBootstrapColumnSlot("col", "phone", "columns", "6")).toBe("col");
		expect(updateBootstrapColumnSlot("col", "md", "width", "6")).toBe("col");
		expect(updateBootstrapColumnSlot("col", "md", "columns", "13")).toBe("col");
	});
});
