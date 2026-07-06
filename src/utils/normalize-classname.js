export function normalizeClassName(className = "") {
	const tokens = String(className || "")
		.split(/\s+/)
		.map((t) => t.trim())
		.filter(Boolean);

	// Bootstrap spacing: mt-2, mb-md-4, ps-3, me-lg-auto, px-2, p-3, etc.
	const spacingRe = /^(m|p)([tbesxy]?)-(?:(sm|md|lg|xl|xxl)-)?(auto|[0-5])$/i;

	// Bootstrap text-align: text-start, text-md-center, text-lg-end
	const textAlignRe = /^text-(?:(sm|md|lg|xl|xxl)-)?(start|center|end)$/i;

	// Bootstrap display: d-block, d-md-flex, d-lg-table-cell, etc.
	const displayRe = /^d-(?:(sm|md|lg|xl|xxl)-)?(none|inline|inline-block|block|grid|table|table-cell|table-row|flex|inline-flex)$/i;

	const flexDirectionRe =
		/^flex-(?:(sm|md|lg|xl|xxl)-)?(row|row-reverse|column|column-reverse)$/i;

	const flexWrapRe =
		/^flex-(?:(sm|md|lg|xl|xxl)-)?(wrap|nowrap|wrap-reverse)$/i;

	const justifyContentRe =
		/^justify-content-(?:(sm|md|lg|xl|xxl)-)?(start|end|center|between|around|evenly)$/i;

	const alignItemsRe =
		/^align-items-(?:(sm|md|lg|xl|xxl)-)?(start|end|center|baseline|stretch)$/i;

	const alignContentRe =
		/^align-content-(?:(sm|md|lg|xl|xxl)-)?(start|end|center|between|around|stretch)$/i;

	const flexGrowRe =
		/^flex-(?:(sm|md|lg|xl|xxl)-)?grow-(0|1)$/i;

	const flexShrinkRe =
		/^flex-(?:(sm|md|lg|xl|xxl)-)?shrink-(0|1)$/i;

	const alignSelfRe =
		/^align-self-(?:(sm|md|lg|xl|xxl)-)?(start|end|center|baseline|stretch)$/i;

	const orderRe =
		/^order-(?:(sm|md|lg|xl|xxl)-)?(first|last|[0-5])$/i;

	const columnRe =
		/^col(?:-(sm|md|lg|xl|xxl))?(?:-(auto|[1-9]|1[0-2]))?$/i;

	const offsetRe =
		/^offset(?:-(sm|md|lg|xl|xxl))?-([1-9]|1[0-2])$/i;

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

		// 3) Slot-dedupe: display utilities
		const dm = token.match(displayRe);
		if (dm) {
			const bp = (dm[1] || "").toLowerCase();
			const key = `bs-display:${bp}`;
			if (!seen.has(key)) {
				seen.add(key);
				outReversed.push(token);
			}
			continue;
		}

		// 4) Slot-dedupe: flex utilities
		const flexDirectionMatch = token.match(flexDirectionRe);
		if (flexDirectionMatch) {
			const bp = (flexDirectionMatch[1] || "").toLowerCase();
			const key = `bs-flex-direction:${bp}`;
			if (!seen.has(key)) {
				seen.add(key);
				outReversed.push(token);
			}
			continue;
		}

		const flexWrapMatch = token.match(flexWrapRe);
		if (flexWrapMatch) {
			const bp = (flexWrapMatch[1] || "").toLowerCase();
			const key = `bs-flex-wrap:${bp}`;
			if (!seen.has(key)) {
				seen.add(key);
				outReversed.push(token);
			}
			continue;
		}

		const justifyContentMatch = token.match(justifyContentRe);
		if (justifyContentMatch) {
			const bp = (justifyContentMatch[1] || "").toLowerCase();
			const key = `bs-justify-content:${bp}`;
			if (!seen.has(key)) {
				seen.add(key);
				outReversed.push(token);
			}
			continue;
		}

		const alignItemsMatch = token.match(alignItemsRe);
		if (alignItemsMatch) {
			const bp = (alignItemsMatch[1] || "").toLowerCase();
			const key = `bs-align-items:${bp}`;
			if (!seen.has(key)) {
				seen.add(key);
				outReversed.push(token);
			}
			continue;
		}

		const alignContentMatch = token.match(alignContentRe);
		if (alignContentMatch) {
			const bp = (alignContentMatch[1] || "").toLowerCase();
			const key = `bs-align-content:${bp}`;
			if (!seen.has(key)) {
				seen.add(key);
				outReversed.push(token);
			}
			continue;
		}

		// 4) Slot-dedupe: flex item
		const flexGrowMatch = token.match(flexGrowRe);
		if (flexGrowMatch) {
			const bp = (flexGrowMatch[1] || "").toLowerCase();
			const key = `bs-flex-grow:${bp}`;
			if (!seen.has(key)) {
				seen.add(key);
				outReversed.push(token);
			}
			continue;
		}

		const flexShrinkMatch = token.match(flexShrinkRe);
		if (flexShrinkMatch) {
			const bp = (flexShrinkMatch[1] || "").toLowerCase();
			const key = `bs-flex-shrink:${bp}`;
			if (!seen.has(key)) {
				seen.add(key);
				outReversed.push(token);
			}
			continue;
		}

		const alignSelfMatch = token.match(alignSelfRe);
		if (alignSelfMatch) {
			const bp = (alignSelfMatch[1] || "").toLowerCase();
			const key = `bs-align-self:${bp}`;
			if (!seen.has(key)) {
				seen.add(key);
				outReversed.push(token);
			}
			continue;
		}

		const orderMatch = token.match(orderRe);
		if (orderMatch) {
			const bp = (orderMatch[1] || "").toLowerCase();
			const key = `bs-order:${bp}`;
			if (!seen.has(key)) {
				seen.add(key);
				outReversed.push(token);
			}
			continue;
		}

		const columnMatch = token.match(columnRe);
		if (columnMatch) {
			const bp = (columnMatch[1] || "").toLowerCase();
			const key = `bs-column:${bp}`;
			if (!seen.has(key)) {
				seen.add(key);
				outReversed.push(token);
			}
			continue;
		}

		const offsetMatch = token.match(offsetRe);
		if (offsetMatch) {
			const bp = (offsetMatch[1] || "").toLowerCase();
			const key = `bs-offset:${bp}`;
			if (!seen.has(key)) {
				seen.add(key);
				outReversed.push(token);
			}
			continue;
		}

		// 5) Exact dedupe for everything else (case-sensitive)
		const exactKey = `exact:${token}`;
		if (!seen.has(exactKey)) {
			seen.add(exactKey);
			outReversed.push(token);
		}
	}

	return outReversed.reverse().join(" ").trim();
}
