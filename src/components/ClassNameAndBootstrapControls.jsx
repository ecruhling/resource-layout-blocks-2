import {useMemo} from "@wordpress/element";
import {BlockControls, InspectorControls} from "@wordpress/block-editor";
import {
	Card,
	CardBody,
	CardHeader,
	Flex,
	FlexItem,
	Icon,
	Panel,
	PanelBody,
	PanelRow,
	SelectControl,
	TabPanel,
	TextControl,
	ToolbarButton,
	ToolbarGroup,
	VisuallyHidden,
} from "@wordpress/components";

import {
	alignCenter,
	alignLeft,
	alignRight,
	closeSmall,
	sidesBottom,
	sidesLeft,
	sidesRight,
	sidesTop,
} from "@wordpress/icons";

import {
	BS_BREAKPOINTS,
	parseBootstrapSpacingFromClassName,
	updateBootstrapSpacingSlot,
} from "../utils/classname-bootstrap-spacing";

import {
	parseBootstrapTextAlignFromClassName,
	updateBootstrapTextAlignSlot,
} from "../utils/classname-bootstrap-text-align";

import {normalizeClassName} from "../utils/normalize-classname";

import BootstrapSpacingPanelBody from "./panels/BootstrapSpacingPanelBody";
import BootstrapAlignmentPanelBody from "./panels/BootstrapAlignmentPanelBody";

const TABS = [
	{name: "", label: "-"},
	{name: "sm", label: "SM"},
	{name: "md", label: "MD"},
	{name: "lg", label: "LG"},
	{name: "xl", label: "XL"},
	{name: "xxl", label: "XXL"},
];

const NONE = {label: "— none —", value: ""};
const PAD_VALUES = ["0", "1", "2", "3", "4", "5"].map((v) => ({label: v, value: v}));
const MAR_VALUES = [{label: "auto", value: "auto"}, ...PAD_VALUES];

const PADDING_CONTROLS = [
	{side: "t", label: "Padding Top (pt-*)", icon: sidesTop},
	{side: "e", label: "Padding End (pe-*)", icon: sidesRight},
	{side: "b", label: "Padding Bottom (pb-*)", icon: sidesBottom},
	{side: "s", label: "Padding Start (ps-*)", icon: sidesLeft},
];

const MARGIN_CONTROLS = [
	{side: "t", label: "Margin Top (mt-*)", icon: sidesTop},
	{side: "e", label: "Margin End (me-*)", icon: sidesRight},
	{side: "b", label: "Margin Bottom (mb-*)", icon: sidesBottom},
	{side: "s", label: "Margin Start (ms-*)", icon: sidesLeft},
];

function getSpacingValue(parsedSpacing, type, bp, side) {
	return parsedSpacing?.[type]?.[bp]?.[side] ?? "";
}

function bpHasAnySpacing(parsedSpacing, bp) {
	const types = ["p", "m"];
	const sides = ["", "t", "b", "s", "e"];
	for (const type of types) {
		for (const side of sides) {
			const v = parsedSpacing?.[type]?.[bp]?.[side];
			if (v !== null && v !== undefined) return true; // includes '0' and 'auto'
		}
	}
	return false;
}

function bpHasTextAlign(alignMap, bp) {
	const v = alignMap?.[bp];
	return v !== null && v !== undefined && v !== "";
}

export default function ClassNameAndBootstrapControls({className, setClassName}) {
	const parsedSpacing = useMemo(
		() => parseBootstrapSpacingFromClassName(className),
		[className]
	);

	const alignMap = useMemo(
		() => parseBootstrapTextAlignFromClassName(className),
		[className]
	);

	const tabsWithIndicators = useMemo(() => {
		return TABS.map((t) => {
			const modified =
				bpHasAnySpacing(parsedSpacing, t.name) || bpHasTextAlign(alignMap, t.name);

			return {
				name: t.name,
				title: (
					<span className="resource-tab-label">
						{modified && (
							<>
								<span className="resource-tab-dot" aria-hidden="true"/>
								<VisuallyHidden>modified</VisuallyHidden>
							</>
						)}
						{t.label}
					</span>
				),
			};
		});
	}, [parsedSpacing, alignMap]);

	const setSpacingSlot = (type, bp, side, nextVal) => {
		const val = nextVal === "" ? null : nextVal;
		const next = updateBootstrapSpacingSlot(className || "", {type, bp, side}, val);
		setClassName(normalizeClassName(next));
	};

	const setTextAlignSlot = (bp, nextVal) => {
		const next = updateBootstrapTextAlignSlot(className || "", bp, nextVal);
		setClassName(normalizeClassName(next));
	};

	return (
		<>
			{/* Always-visible toolbar class editor */}
			<BlockControls>
				<ToolbarGroup>
					<div
						className="resource-toolbar-classes"
						style={{
							display: "flex",
							alignItems: "center",
							gap: 8,
							padding: "0 6px",
							maxWidth: 520,
						}}
					>
						<span style={{fontSize: 11, whiteSpace: "nowrap"}}>.cx</span>
						<div style={{minWidth: 250, maxWidth: 500}}>
							<TextControl
								value={className || ""}
								onChange={(v) => setClassName(v)}
								onBlur={(e) => setClassName(normalizeClassName(e.target.value))}
								aria-label="CSS classes"
							/>
						</div>
					</div>
				</ToolbarGroup>
			</BlockControls>

			{/* Single breakpoint tabset; panels inside each tab */}
			<InspectorControls>
				<TabPanel className="resource-bp-tabs" tabs={tabsWithIndicators}>
					{(tab) => {
						const bp = tab.name; // '' | sm | md | lg | xl | xxl
						if (!BS_BREAKPOINTS.includes(bp)) return null;

						const bpLabel = tab.name ? tab.name.toUpperCase() : "BASE";
						const currentAlign = alignMap?.[bp] ?? ""; // 'start'|'center'|'end'|''

						return (
							<Panel>
								<BootstrapSpacingPanelBody
									bp={bp}
									bpLabel={bpLabel}
									parsedSpacing={parsedSpacing}
									onChangeSpacing={(type, side, v) => setSpacingSlot(type, bp, side, v)}
								/>
								<BootstrapAlignmentPanelBody
									bpLabel={bpLabel}
									currentAlign={currentAlign}
									onChangeAlign={(next) => setTextAlignSlot(bp, next)}
								/>
							</Panel>
						);
					}}
				</TabPanel>
			</InspectorControls>
		</>
	);
}
