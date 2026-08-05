import { convertStylesStringToObject } from "../../src/utils/convert-styles-string-to-object.js";

describe("convertStylesStringToObject", () => {
	test("converts CSS properties to React-style camelCase keys", () => {
		expect(
			convertStylesStringToObject(
				"background-color: red; font-size: 16px; -ms-grid-row: 2"
			)
		).toEqual({
			backgroundColor: "red",
			fontSize: "16px",
			msGridRow: "2",
		});
	});

	test("preserves colons inside a property value", () => {
		expect(convertStylesStringToObject("background-image: url(https://example.com/a.png)"))
			.toEqual({ backgroundImage: "url(https://example.com/a.png)" });
	});

	test("ignores malformed declarations and empty values", () => {
		expect(convertStylesStringToObject("color: blue; malformed; width: ;"))
			.toEqual({ color: "blue" });
	});

	test("returns an empty object for non-string values", () => {
		expect(convertStylesStringToObject(null)).toEqual({});
		expect(convertStylesStringToObject({ color: "red" })).toEqual({});
	});
});
