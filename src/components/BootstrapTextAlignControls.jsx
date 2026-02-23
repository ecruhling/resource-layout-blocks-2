import { useMemo } from "@wordpress/element";
import { InspectorControls } from "@wordpress/block-editor";
import { PanelBody, SelectControl, TabPanel, VisuallyHidden } from "@wordpress/components";

import {
	BS_BREAKPOINTS,
	parseBootstrapTextAlignFromClassName,
	updateBootstrapTextAlignSlot,
} from "../utils/classname-bootstrap-text-align.js";

const TABS = [
	{ name: "", label: "-" },
	{ name: "sm", label: "SM" },
	{ name: "md", label: "MD" },
	{ name: "lg", label: "LG" },
	{ name: "xl", label: "XL" },
	{ name: "xxl", label: "XXL" },
];

const OPTIONS = [
	{ label: "— none —", value: "" },
	{ label: "Start", value: "start" },
	{ label: "Center", value: "center" },
	{ label: "End", value: "end" },
];

function bpHasTextAlign(map, bp) {
	return map?.[bp] !== null && map?.[bp] !== undefined && map?.[bp] !== "";
}

export default function BootstrapTextAlignControls({ className, setClassName }) {
	const alignMap = useMemo(
		() => parseBootstrapTextAlignFromClassName(className),
		[className]
	);

	const tabsWithIndicators = useMemo(() => {
		return TABS.map((t) => {
			const modified = bpHasTextAlign(alignMap, t.name);
			return {
				name: t.name,
				title: (
					<span className="my-layout-tab-label">
            {modified && (
				<>
					<span className="my-layout-tab-dot" aria-hidden="true" />
					<VisuallyHidden>modified</VisuallyHidden>
				</>
			)}
						{t.label}
          </span>
				),
			};
		});
	}, [alignMap]);

	const setSlot = (bp, nextVal) => {
		const next = updateBootstrapTextAlignSlot(className || "", bp, nextVal);
		setClassName(next);
	};

	return (
		<InspectorControls>
			<PanelBody title="Text Alignment (Bootstrap)" initialOpen={false}>
				<TabPanel className="my-layout-bp-tabs" tabs={tabsWithIndicators}>
					{(tab) => {
						const bp = tab.name;
						if (!BS_BREAKPOINTS.includes(bp)) return null;

						return (
							<div style={{ paddingTop: 8 }}>
								<SelectControl
									label="Alignment"
									value={alignMap?.[bp] ?? ""}
									options={OPTIONS}
									onChange={(v) => setSlot(bp, v)}
								/>
							</div>
						);
					}}
				</TabPanel>
			</PanelBody>
		</InspectorControls>
	);
}
