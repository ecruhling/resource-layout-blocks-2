export const BS_BREAKPOINTS = ["", "sm", "md", "lg", "xl", "xxl"];

const FLEX_DIRECTION_VALUES = [
	"row",
	"row-reverse",
	"column",
	"column-reverse",
];

const FLEX_WRAP_VALUES = [
	"wrap",
	"nowrap",
	"wrap-reverse",
];

const JUSTIFY_CONTENT_VALUES = [
	"start",
	"end",
	"center",
	"between",
	"around",
	"evenly",
];

const ALIGN_ITEMS_VALUES = [
	"start",
	"end",
	"center",
	"baseline",
	"stretch",
];

const ALIGN_CONTENT_VALUES = [
	"start",
	"end",
	"center",
	"between",
	"around",
	"stretch",
];

const FLEX_CONFIG = {
	direction: {
		values: FLEX_DIRECTION_VALUES,
		makeToken: (bp, val) => (bp ? `flex-${bp}-${val}` : `flex-${val}`),
		parseToken: (token) => {
			const m = String(token || "").match(
				/^flex-(?:(sm|md|lg|xl|xxl)-)?(row|row-reverse|column|column-reverse)$/i
			);
			if (!m) return null;
			return {
				bp: (m[1] || "").toLowerCase(),
				val: (m[2] || "").toLowerCase(),
			};
		},
	},

	wrap: {
		values: FLEX_WRAP_VALUES,
		makeToken: (bp, val) => (bp ? `flex-${bp}-${val}` : `flex-${val}`),
		parseToken: (token) => {
			const m = String(token || "").match(
				/^flex-(?:(sm|md|lg|xl|xxl)-)?(wrap|nowrap|wrap-reverse)$/i
			);
			if (!m) return null;
			return {
				bp: (m[1] || "").toLowerCase(),
				val: (m[2] || "").toLowerCase(),
			};
		},
	},

	justify: {
		values: JUSTIFY_CONTENT_VALUES,
		makeToken: (bp, val) =>
			bp ? `justify-content-${bp}-${val}` : `justify-content-${val}`,
		parseToken: (token) => {
			const m = String(token || "").match(
				/^justify-content-(?:(sm|md|lg|xl|xxl)-)?(start|end|center|between|around|evenly)$/i
			);
			if (!m) return null;
			return {
				bp: (m[1] || "").toLowerCase(),
				val: (m[2] || "").toLowerCase(),
			};
		},
	},

	alignItems: {
		values: ALIGN_ITEMS_VALUES,
		makeToken: (bp, val) =>
			bp ? `align-items-${bp}-${val}` : `align-items-${val}`,
		parseToken: (token) => {
			const m = String(token || "").match(
				/^align-items-(?:(sm|md|lg|xl|xxl)-)?(start|end|center|baseline|stretch)$/i
			);
			if (!m) return null;
			return {
				bp: (m[1] || "").toLowerCase(),
				val: (m[2] || "").toLowerCase(),
			};
		},
	},

	alignContent: {
		values: ALIGN_CONTENT_VALUES,
		makeToken: (bp, val) =>
			bp ? `align-content-${bp}-${val}` : `align-content-${val}`,
		parseToken: (token) => {
			const m = String(token || "").match(
				/^align-content-(?:(sm|md|lg|xl|xxl)-)?(start|end|center|between|around|stretch)$/i
			);
			if (!m) return null;
			return {
				bp: (m[1] || "").toLowerCase(),
				val: (m[2] || "").toLowerCase(),
			};
		},
	},
};

function tokenize(className = "") {
	return String(className || "")
		.split(/\s+/)
		.map((t) => t.trim())
		.filter(Boolean);
}

function parseFlexToken(token) {
	for (const [setting, config] of Object.entries(FLEX_CONFIG)) {
		const parsed = config.parseToken(token);
		if (!parsed) continue;

		if (!BS_BREAKPOINTS.includes(parsed.bp)) continue;
		if (!config.values.includes(parsed.val)) continue;

		return {
			setting,
			bp: parsed.bp,
			val: parsed.val,
		};
	}

	return null;
}

export function parseBootstrapFlexFromClassName(className = "") {
	const emptyBreakpointMap = () => ({
		direction: null,
		wrap: null,
		justify: null,
		alignItems: null,
		alignContent: null,
	});

	const out = Object.fromEntries(
		BS_BREAKPOINTS.map((bp) => [bp, emptyBreakpointMap()])
	);

	for (const token of tokenize(className)) {
		const parsed = parseFlexToken(token);
		if (!parsed) continue;

		out[parsed.bp][parsed.setting] = parsed.val;
	}

	return out;
}

export function updateBootstrapFlexSlot(className = "", bp = "", setting, value) {
	if (!BS_BREAKPOINTS.includes(bp)) return String(className || "");
	if (!FLEX_CONFIG[setting]) return String(className || "");

	const config = FLEX_CONFIG[setting];

	const val = value === null || value === "" ? null : String(value).toLowerCase();
	if (val !== null && !config.values.includes(val)) return String(className || "");

	const tokens = tokenize(className);

	const kept = tokens.filter((token) => {
		const parsed = parseFlexToken(token);
		if (!parsed) return true;

		return !(parsed.bp === bp && parsed.setting === setting);
	});

	if (val !== null) {
		kept.push(config.makeToken(bp, val));
	}

	return kept.join(" ").trim();
}

export function clearBootstrapFlexBreakpoint(className = "", bp = "") {
	if (!BS_BREAKPOINTS.includes(bp)) return String(className || "");

	const tokens = tokenize(className);

	return tokens
		.filter((token) => {
			const parsed = parseFlexToken(token);
			if (!parsed) return true;

			return parsed.bp !== bp;
		})
		.join(" ")
		.trim();
}
