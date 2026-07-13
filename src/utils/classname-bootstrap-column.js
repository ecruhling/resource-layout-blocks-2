export const BS_BREAKPOINTS = ["", "sm", "md", "lg", "xl", "xxl"];

const COLUMN_VALUES = ["equal", "auto", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];
const OFFSET_VALUES = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];

const COLUMN_RE = /^col(?:-(sm|md|lg|xl|xxl))?(?:-(auto|[1-9]|1[0-2]))?$/i;
const OFFSET_RE = /^offset(?:-(sm|md|lg|xl|xxl))?-([1-9]|1[0-2])$/i;

function tokenize(className = "") {
	return String(className || "")
		.split(/\s+/)
		.map((t) => t.trim())
		.filter(Boolean);
}

function parseColumnToken(token) {
	const columnMatch = String(token || "").match(COLUMN_RE);
	if (columnMatch) {
		const bp = (columnMatch[1] || "").toLowerCase();
		const val = (columnMatch[2] || "equal").toLowerCase();

		if (!BS_BREAKPOINTS.includes(bp)) return null;
		if (!COLUMN_VALUES.includes(val)) return null;

		return {
			setting: "columns",
			bp,
			val,
		};
	}

	const offsetMatch = String(token || "").match(OFFSET_RE);
	if (offsetMatch) {
		const bp = (offsetMatch[1] || "").toLowerCase();
		const val = (offsetMatch[2] || "").toLowerCase();

		if (!BS_BREAKPOINTS.includes(bp)) return null;
		if (!OFFSET_VALUES.includes(val)) return null;

		return {
			setting: "offset",
			bp,
			val,
		};
	}

	return null;
}

function makeColumnToken(bp, val) {
	if (val === "equal") return bp ? `col-${bp}` : "col";
	if (val === "auto") return bp ? `col-${bp}-auto` : "col-auto";

	return bp ? `col-${bp}-${val}` : `col-${val}`;
}

function makeOffsetToken(bp, val) {
	return bp ? `offset-${bp}-${val}` : `offset-${val}`;
}

function makeToken(bp, setting, val) {
	return setting === "columns" ? makeColumnToken(bp, val) : makeOffsetToken(bp, val);
}

export function parseBootstrapColumnFromClassName(className = "") {
	const emptyBreakpointMap = () => ({
		columns: null,
		offset: null,
	});

	const out = Object.fromEntries(
		BS_BREAKPOINTS.map((bp) => [bp, emptyBreakpointMap()])
	);

	for (const token of tokenize(className)) {
		const parsed = parseColumnToken(token);
		if (!parsed) continue;

		out[parsed.bp][parsed.setting] = parsed.val;
	}

	return out;
}

export function getBootstrapColumnClassName(className = "") {
	const tokens = tokenize(className);
	const hasBaseColumn = tokens.some((token) => {
		const parsed = parseColumnToken(token);

		return parsed?.setting === "columns" && parsed?.bp === "";
	});

	return hasBaseColumn ? tokens.join(" ").trim() : ["col", ...tokens].join(" ").trim();
}

export function updateBootstrapColumnSlot(className = "", bp = "", setting, value) {
	if (!BS_BREAKPOINTS.includes(bp)) return String(className || "");
	if (!["columns", "offset"].includes(setting)) return String(className || "");

	const values = setting === "columns" ? COLUMN_VALUES : OFFSET_VALUES;
	const val = value === null || value === "" ? null : String(value).toLowerCase();
	if (val !== null && !values.includes(val)) return String(className || "");

	const kept = tokenize(className).filter((token) => {
		const parsed = parseColumnToken(token);
		if (!parsed) return true;

		return !(parsed.bp === bp && parsed.setting === setting);
	});

	if (val !== null) {
		kept.push(makeToken(bp, setting, val));
	}

	return kept.join(" ").trim();
}

export function clearBootstrapColumnBreakpoint(className = "", bp = "") {
	if (!BS_BREAKPOINTS.includes(bp)) return String(className || "");

	return tokenize(className)
		.filter((token) => {
			const parsed = parseColumnToken(token);
			if (!parsed) return true;

			return parsed.bp !== bp;
		})
		.join(" ")
		.trim();
}
