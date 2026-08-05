import {
	parseBootstrapDisplayFromClassName,
	updateBootstrapDisplaySlot,
} from "../../src/utils/classname-bootstrap-display.js";
import {
	parseBootstrapTextAlignFromClassName,
	updateBootstrapTextAlignSlot,
} from "../../src/utils/classname-bootstrap-text-align.js";

describe("Bootstrap display utilities", () => {
	test("parses responsive values and lets later values win", () => {
		const result = parseBootstrapDisplayFromClassName(
			"d-block d-md-flex d-md-grid custom"
		);

		expect(result[""]).toBe("block");
		expect(result.md).toBe("grid");
		expect(result.lg).toBeNull();
	});

	test("replaces or removes only the selected breakpoint", () => {
		expect(updateBootstrapDisplaySlot("card d-block d-md-flex", "md", "none"))
			.toBe("card d-block d-md-none");
		expect(updateBootstrapDisplaySlot("card d-block d-md-flex", "md", null))
			.toBe("card d-block");
	});
});

describe("Bootstrap text alignment utilities", () => {
	test("parses alignment by breakpoint", () => {
		const result = parseBootstrapTextAlignFromClassName(
			"text-start text-lg-center text-lg-end"
		);

		expect(result[""]).toBe("start");
		expect(result.lg).toBe("end");
	});

	test("updates the selected slot and preserves unrelated classes", () => {
		expect(updateBootstrapTextAlignSlot("lead text-start text-md-center", "md", "end"))
			.toBe("lead text-start text-md-end");
	});

	test("ignores invalid values", () => {
		expect(updateBootstrapTextAlignSlot("text-start", "md", "justify"))
			.toBe("text-start");
	});
});
