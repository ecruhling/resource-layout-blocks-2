export const BS_BREAKPOINTS = ["", "sm", "md", "lg", "xl", "xxl"];
const SIDES_ALL = ["", "t", "b", "s", "e", "x", "y"]; // recognize input tokens
const SIDES_UI = ["", "t", "b", "s", "e"];            // Inspector controls

function tokenize(className = "") {
	return String(className || "")
		.split(/\s+/)
		.map((t) => t.trim())
		.filter(Boolean);
}

// Parses tokens like:
//  p-3, p-md-3
//  ps-3, pe-4, ms-3, mb-md-4
//  px-2, py-lg-5, mx-1, my-3
//  m-auto, me-md-auto
function parseToken(raw) {
	const token = String(raw || "").toLowerCase();
	const parts = token.split("-");
	if (parts.length !== 2 && parts.length !== 3) return null;

	const head = parts[0]; // "p", "ps", "mb", "px", etc.
	if (head.length < 1 || head.length > 2) return null;

	const type = head[0]; // 'm' | 'p'
	if (type !== "m" && type !== "p") return null;

	const side = head.slice(1) || ""; // '', t,b,s,e,x,y
	if (!SIDES_ALL.includes(side)) return null;

	const bp = parts.length === 3 ? parts[1] : "";
	if (!BS_BREAKPOINTS.includes(bp)) return null;

	const val = parts.length === 3 ? parts[2] : parts[1]; // '0'..'5' or 'auto'
	if (val === "auto") return type === "m" ? "auto" : null;

	const n = Number(val);
	if (!Number.isFinite(n) || n < 0 || n > 5) return null;

	return { type, side, bp, val: String(n) };
}

function isSpacingToken(token) {
	return parseToken(token) !== null;
}

function makeToken(type, side, bp, val) {
	const head = `${type}${side || ""}`;
	return bp ? `${head}-${bp}-${val}` : `${head}-${val}`;
}

/**
 * Parse Bootstrap spacing from className into a structure that mirrors the Inspector.
 *
 * IMPORTANT RULE:
 * - p-* / m-* apply to all sides (t,b,s,e) in the Inspector.
 * - px-* / mx-* apply to s,e
 * - py-* / my-* apply to t,b
 */
export function parseBootstrapSpacingFromClassName(className = "") {
	const emptyBpMap = () =>
		Object.fromEntries(SIDES_UI.map((s) => [s, null]));

	const out = {
		p: Object.fromEntries(BS_BREAKPOINTS.map((bp) => [bp, emptyBpMap()])),
		m: Object.fromEntries(BS_BREAKPOINTS.map((bp) => [bp, emptyBpMap()])),
	};

	// Process tokens in order; later tokens overwrite earlier ones (matches CSS ordering)
	for (const t of tokenize(className)) {
		const parsed = parseToken(t);
		if (!parsed) continue;

		const { type, side, bp, val } = parsed;

		// 1) all-sides token: p-* / m-* => set all Inspector sides
		if (side === "") {
			out[type][bp][""] = val;
			out[type][bp].t = val;
			out[type][bp].b = val;
			out[type][bp].s = val;
			out[type][bp].e = val;
			continue;
		}

		// 2) x token: px-* / mx-* => start/end
		if (side === "x") {
			out[type][bp].s = val;
			out[type][bp].e = val;
			continue;
		}

		// 3) y token: py-* / my-* => top/bottom
		if (side === "y") {
			out[type][bp].t = val;
			out[type][bp].b = val;
			continue;
		}

		// 4) direct sides: t/b/s/e
		if (SIDES_UI.includes(side)) {
			out[type][bp][side] = val;
			continue;
		}
	}

	return out;
}

/**
 * Update a single Inspector slot (type + bp + side), while removing conflicting
 * composite tokens so the Inspector stays consistent.
 *
 * Conflicts removed:
 * - updating '' removes ALL spacing tokens for that type+bp (including x/y and specific sides)
 * - updating s/e removes s/e, x, and '' for that type+bp
 * - updating t/b removes t/b, y, and '' for that type+bp
 *
 * value: '0'..'5' or 'auto' (margin only) or null to remove
 */
export function updateBootstrapSpacingSlot(className = "", slot, value) {
	const { type, bp = "", side = "" } = slot || {};
	if (!["p", "m"].includes(type)) return String(className || "");
	if (!BS_BREAKPOINTS.includes(bp)) return String(className || "");
	if (!SIDES_UI.includes(side)) return String(className || "");

	// normalize value
	let valNorm = null;
	if (value !== null) {
		const v = String(value).toLowerCase();
		if (v === "auto") {
			if (type !== "m") return String(className || "");
			valNorm = "auto";
		} else {
			const n = Number(v);
			if (!Number.isFinite(n) || n < 0 || n > 5) return String(className || "");
			valNorm = String(n);
		}
	}

	const tokens = tokenize(className);

	const kept = tokens.filter((t) => {
		if (!isSpacingToken(t)) return true;

		const p = parseToken(t);
		if (!p) return true;

		// different type/bp -> keep
		if (p.type !== type || p.bp !== bp) return true;

		// If updating all-sides slot: remove all spacing tokens for this type+bp
		if (side === "") return false;

		// If updating start/end: remove that side, plus any x token, plus any all-sides token
		if (side === "s" || side === "e") {
			return !(p.side === side || p.side === "x" || p.side === "");
		}

		// If updating top/bottom: remove that side, plus any y token, plus any all-sides token
		if (side === "t" || side === "b") {
			return !(p.side === side || p.side === "y" || p.side === "");
		}

		return true;
	});

	if (valNorm !== null) {
		kept.push(makeToken(type, side, bp, valNorm));
	}

	return kept.join(" ").trim();
}
