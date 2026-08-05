import { normalizeClassName } from "../../src/utils/normalize-classname.js";

describe("normalizeClassName", () => {
	test("normalizes whitespace and removes exact duplicate custom classes", () => {
		expect(normalizeClassName("  card   featured card  ")).toBe("featured card");
	});

	test("keeps the last class in each Bootstrap responsive slot", () => {
		const className = [
			"mt-1",
			"mt-4",
			"text-md-start",
			"text-md-end",
			"d-flex",
			"d-grid",
			"flex-lg-row",
			"flex-lg-column",
			"col-sm-4",
			"col-sm-8",
		].join(" ");

		expect(normalizeClassName(className)).toBe(
			"mt-4 text-md-end d-grid flex-lg-column col-sm-8"
		);
	});

	test("preserves utilities assigned to different breakpoints or settings", () => {
		expect(
			normalizeClassName(
				"p-2 pt-3 p-md-4 text-start text-lg-end col col-md-6 offset-md-2"
			)
		).toBe("p-2 pt-3 p-md-4 text-start text-lg-end col col-md-6 offset-md-2");
	});

	test("treats invalid Bootstrap-looking classes as ordinary classes", () => {
		expect(normalizeClassName("p-auto p-auto col-md-13 col-md-13")).toBe(
			"p-auto col-md-13"
		);
	});

	test("returns an empty string for nullish input", () => {
		expect(normalizeClassName()).toBe("");
		expect(normalizeClassName(null)).toBe("");
	});
});
