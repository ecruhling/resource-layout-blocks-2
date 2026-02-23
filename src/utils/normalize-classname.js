export function normalizeClassName(className = "") {
	const tokens = String(className || "")
		.split(/\s+/)
		.map((t) => t.trim())
		.filter(Boolean);

	// Bootstrap spacing: mt-2, mb-md-4, ps-3, me-lg-auto, px-2, p-3, etc.
	const spacingRe = /^(m|p)([tbesxy]?)-(?:(sm|md|lg|xl|xxl)-)?(auto|[0-5])$/i;

	// Bootstrap text-align: text-start, text-md-center, text-lg-end
	const textAlignRe = /^text-(?:(sm|md|lg|xl|xxl)-)?(start|center|end)$/i;

	const seen = new Set();
	const outReversed = [];

	// Walk from end -> start so we keep the *last* occurrence of each slot/token
	for (let i = tokens.length - 1; i >= 0; i--) {
		const token = tokens[i];

		// 1) Slot-dedupe: spacing utilities
		const sm = token.match(spacingRe);
		if (sm) {
			const type = sm[1].toLowerCase();             // m|p
			const side = (sm[2] || "").toLowerCase();     // '', t,b,s,e,x,y
			const bp = (sm[3] || "").toLowerCase();       // '', sm,md,lg,xl,xxl
			const val = (sm[4] || "").toLowerCase();      // 0-5 or auto

			// 'auto' is only valid for margin. If invalid, treat as a normal token.
			if (!(val === "auto" && type === "p")) {
				const key = `bs-space:${type}:${bp}:${side}`;
				if (!seen.has(key)) {
					seen.add(key);
					outReversed.push(token);
				}
				continue;
			}
		}

		// 2) Slot-dedupe: text alignment utilities
		const tm = token.match(textAlignRe);
		if (tm) {
			const bp = (tm[1] || "").toLowerCase(); // '' or breakpoint
			const key = `bs-text-align:${bp}`;
			if (!seen.has(key)) {
				seen.add(key);
				outReversed.push(token);
			}
			continue;
		}

		// 3) Exact dedupe for everything else (case-sensitive)
		const exactKey = `exact:${token}`;
		if (!seen.has(exactKey)) {
			seen.add(exactKey);
			outReversed.push(token);
		}
	}

	return outReversed.reverse().join(" ").trim();
}
