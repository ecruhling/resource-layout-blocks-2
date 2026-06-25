export const BS_BREAKPOINTS = ["", "sm", "md", "lg", "xl", "xxl"];

const FLEX_GROW_VALUES = ["0", "1"];
const FLEX_SHRINK_VALUES = ["0", "1"];
const ALIGN_SELF_VALUES = ["start", "end", "center", "baseline", "stretch"];
const ORDER_VALUES = ["first", "0", "1", "2", "3", "4", "5", "last"];

const FLEX_ITEM_CONFIG = {
	grow: {
		values: FLEX_GROW_VALUES,
		makeToken: (bp, val) => (bp ? `flex-${bp}-grow-${val}` : `flex-grow-${val}`),
		parseToken: (token) => {
			const m = String(token || "").match(/^flex-(?:(sm|md|lg|xl|xxl)-)?grow-(0|1)$/i);
			if (!m) return null;

			return {
				bp: (m[1] || "").toLowerCase(),
				val: (m[2] || "").toLowerCase(),
			};
		},
	},

	shrink: {
		values: FLEX_SHRINK_VALUES,
		makeToken: (bp, val) => (bp ? `flex-${bp}-shrink-${val}` : `flex-shrink-${val}`),
		parseToken: (token) => {
			const m = String(token || "").match(/^flex-(?:(sm|md|lg|xl|xxl)-)?shrink-(0|1)$/i);
			if (!m) return null;

			return {
				bp: (m[1] || "").toLowerCase(),
				val: (m[2] || "").toLowerCase(),
			};
		},
	},

	alignSelf: {
		values: ALIGN_SELF_VALUES,
		makeToken: (bp, val) => (bp ? `align-self-${bp}-${val}` : `align-self-${val}`),
		parseToken: (token) => {
			const m = String(token || "").match(
				/^align-self-(?:(sm|md|lg|xl|xxl)-)?(start|end|center|baseline|stretch)$/i
			);
			if (!m) return null;

			return {
				bp: (m[1] || "").toLowerCase(),
				val: (m[2] || "").toLowerCase(),
			};
		},
	},

	order: {
		values: ORDER_VALUES,
		makeToken: (bp, val) => (bp ? `order-${bp}-${val}` : `order-${val}`),
		parseToken: (token) => {
			const m = String(token || "").match(
				/^order-(?:(sm|md|lg|xl|xxl)-)?(first|last|[0-5])$/i
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

function parseFlexItemToken(token) {
	for (const [setting, config] of Object.entries(FLEX_ITEM_CONFIG)) {
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

export function parseBootstrapFlexItemFromClassName(className = "") {
	const emptyBreakpointMap = () => ({
		grow: null,
		shrink: null,
		alignSelf: null,
		order: null,
	});

	const out = Object.fromEntries(
		BS_BREAKPOINTS.map((bp) => [bp, emptyBreakpointMap()])
	);

	for (const token of tokenize(className)) {
		const parsed = parseFlexItemToken(token);
		if (!parsed) continue;

		out[parsed.bp][parsed.setting] = parsed.val;
	}

	return out;
}

export function updateBootstrapFlexItemSlot(className = "", bp = "", setting, value) {
	if (!BS_BREAKPOINTS.includes(bp)) return String(className || "");
	if (!FLEX_ITEM_CONFIG[setting]) return String(className || "");

	const config = FLEX_ITEM_CONFIG[setting];

	const val = value === null || value === "" ? null : String(value).toLowerCase();
	if (val !== null && !config.values.includes(val)) return String(className || "");

	const tokens = tokenize(className);

	const kept = tokens.filter((token) => {
		const parsed = parseFlexItemToken(token);
		if (!parsed) return true;

		return !(parsed.bp === bp && parsed.setting === setting);
	});

	if (val !== null) {
		kept.push(config.makeToken(bp, val));
	}

	return kept.join(" ").trim();
}

export function clearBootstrapFlexItemBreakpoint(className = "", bp = "") {
	if (!BS_BREAKPOINTS.includes(bp)) return String(className || "");

	return tokenize(className)
		.filter((token) => {
			const parsed = parseFlexItemToken(token);
			if (!parsed) return true;

			return parsed.bp !== bp;
		})
		.join(" ")
		.trim();
}
