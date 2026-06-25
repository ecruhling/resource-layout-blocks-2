export const BS_BREAKPOINTS = ["", "sm", "md", "lg", "xl", "xxl"];
const DISPLAY_VALUES = [
	"none",
	"inline",
	"inline-block",
	"block",
	"grid",
	"table",
	"table-cell",
	"table-row",
	"flex",
	"inline-flex",
];

// Matches:
// d-block
// d-md-flex
// d-lg-table-cell
const DISPLAY_RE = /^d-(?:(sm|md|lg|xl|xxl)-)?(none|inline|inline-block|block|grid|table|table-cell|table-row|flex|inline-flex)$/i;

function tokenize(className = "") {
	return String(className || "")
		.split(/\s+/)
		.map((t) => t.trim())
		.filter(Boolean);
}

function parseDisplayToken(token) {
	const m = String(token || "").match(DISPLAY_RE);
	if (!m) return null;

	const bp = (m[1] || "").toLowerCase();
	const val = (m[2] || "").toLowerCase();

	if (!BS_BREAKPOINTS.includes(bp)) return null;
	if (!DISPLAY_VALUES.includes(val)) return null;

	return { bp, val };
}

function makeToken(bp, val) {
	return bp ? `d-${bp}-${val}` : `d-${val}`;
}

export function parseBootstrapDisplayFromClassName(className = "") {
	// map: bp -> displayValue|null
	const out = Object.fromEntries(BS_BREAKPOINTS.map((bp) => [bp, null]));

	for (const t of tokenize(className)) {
		const p = parseDisplayToken(t);
		if (!p) continue;
		out[p.bp] = p.val; // last wins
	}

	return out;
}

export function updateBootstrapDisplaySlot(className = "", bp = "", value) {
	if (!BS_BREAKPOINTS.includes(bp)) return String(className || "");

	const val = value === null || value === "" ? null : String(value).toLowerCase();
	if (val !== null && !DISPLAY_VALUES.includes(val)) return String(className || "");

	const tokens = tokenize(className);

	// Remove any existing display token for this breakpoint slot
	const kept = tokens.filter((t) => {
		const p = parseDisplayToken(t);
		if (!p) return true;
		return p.bp !== bp;
	});

	if (val !== null) {
		kept.push(makeToken(bp, val));
	}

	return kept.join(" ").trim();
}
