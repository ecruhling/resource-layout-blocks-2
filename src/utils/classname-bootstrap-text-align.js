export const BS_BREAKPOINTS = ["", "sm", "md", "lg", "xl", "xxl"];
const ALIGN_VALUES = ["start", "center", "end"];

// Matches:
// text-start
// text-sm-center
// text-lg-end
const TEXT_ALIGN_RE = /^text-(?:(sm|md|lg|xl|xxl)-)?(start|center|end)$/i;

function tokenize(className = "") {
	return String(className || "")
		.split(/\s+/)
		.map((t) => t.trim())
		.filter(Boolean);
}

function parseTextAlignToken(token) {
	const m = String(token || "").match(TEXT_ALIGN_RE);
	if (!m) return null;
	const bp = (m[1] || "").toLowerCase(); // '' if base
	const val = (m[2] || "").toLowerCase();
	if (!BS_BREAKPOINTS.includes(bp)) return null;
	if (!ALIGN_VALUES.includes(val)) return null;
	return { bp, val };
}

function makeToken(bp, val) {
	return bp ? `text-${bp}-${val}` : `text-${val}`;
}

export function parseBootstrapTextAlignFromClassName(className = "") {
	// map: bp -> 'start'|'center'|'end'|null
	const out = Object.fromEntries(BS_BREAKPOINTS.map((bp) => [bp, null]));

	// Later tokens override earlier ones (consistent with class order)
	for (const t of tokenize(className)) {
		const p = parseTextAlignToken(t);
		if (!p) continue;
		out[p.bp] = p.val;
	}

	return out;
}

export function updateBootstrapTextAlignSlot(className = "", bp = "", value) {
	if (!BS_BREAKPOINTS.includes(bp)) return String(className || "");

	const val = value === null || value === "" ? null : String(value).toLowerCase();
	if (val !== null && !ALIGN_VALUES.includes(val)) return String(className || "");

	const tokens = tokenize(className);

	// Remove any existing text-align token for this breakpoint slot
	const kept = tokens.filter((t) => {
		const p = parseTextAlignToken(t);
		if (!p) return true;
		return p.bp !== bp;
	});

	if (val !== null) {
		kept.push(makeToken(bp, val));
	}

	return kept.join(" ").trim();
}
