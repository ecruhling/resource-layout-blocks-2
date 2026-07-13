import {useEffect, useMemo, useState} from "@wordpress/element";
import {BlockControls, InspectorControls} from "@wordpress/block-editor";
import {
	Panel,
	TabPanel,
	TextControl,
	ToolbarGroup,
	VisuallyHidden,
} from "@wordpress/components";

import {
	BS_BREAKPOINTS,
	parseBootstrapSpacingFromClassName,
	updateBootstrapSpacingSlot,
} from "../utils/classname-bootstrap-spacing";

import {
	parseBootstrapTextAlignFromClassName,
	updateBootstrapTextAlignSlot,
} from "../utils/classname-bootstrap-text-align";

import {
	parseBootstrapDisplayFromClassName,
	updateBootstrapDisplaySlot,
} from "../utils/classname-bootstrap-display";

import {
	parseBootstrapFlexFromClassName,
	updateBootstrapFlexSlot,
	clearBootstrapFlexBreakpoint,
} from "../utils/classname-bootstrap-flex";

import {
	parseBootstrapFlexItemFromClassName,
	updateBootstrapFlexItemSlot,
	clearBootstrapFlexItemBreakpoint,
} from "../utils/classname-bootstrap-flex-item";

import {
	parseBootstrapColumnFromClassName,
	updateBootstrapColumnSlot,
	clearBootstrapColumnBreakpoint,
} from "../utils/classname-bootstrap-column";

import {normalizeClassName} from "../utils/normalize-classname";

import BootstrapSpacingPanelBody from "./panels/BootstrapSpacingPanelBody";
import BootstrapAlignmentPanelBody from "./panels/BootstrapAlignmentPanelBody";
import BootstrapDisplayPanelBody from "./panels/BootstrapDisplayPanelBody";
import BootstrapFlexPanelBody from "./panels/BootstrapFlexPanelBody";
import BootstrapFlexItemPanelBody from "./panels/BootstrapFlexItemPanelBody";
import BootstrapColumnPanelBody from "./panels/BootstrapColumnPanelBody";

const TABS = [
	{name: "", label: "-"},
	{name: "sm", label: "SM"},
	{name: "md", label: "MD"},
	{name: "lg", label: "LG"},
	{name: "xl", label: "XL"},
	{name: "xxl", label: "XXL"},
];

const SPACING_TYPES = ["p", "m"];
const SPACING_SIDES = ["", "t", "b", "s", "e"];
const FLEX_SETTINGS = ["direction", "wrap", "justify", "alignItems", "alignContent"];
const FLEX_ITEM_SETTINGS = ["grow", "shrink", "alignSelf", "order"];
const COLUMN_SETTINGS = ["columns", "offset"];

function hasValue(value) {
	return value !== null && value !== undefined && value !== "";
}

function bpHasAnySpacing(parsedSpacing, bp) {
	return SPACING_TYPES.some((type) =>
		SPACING_SIDES.some((side) => hasValue(parsedSpacing?.[type]?.[bp]?.[side]))
	);
}

function bpHasTextAlign(alignMap, bp) {
	return hasValue(alignMap?.[bp]);
}

function bpHasAnySetting(map, bp, settings) {
	const current = map?.[bp];
	return !!current && settings.some((setting) => hasValue(current?.[setting]));
}

export default function ClassNameAndBootstrapControls({className, setClassName, showColumnControls = false}) {
	const currentClassName = className || "";
	const [toolbarClassName, setToolbarClassName] = useState(currentClassName);
	const [isEditingToolbarClassName, setIsEditingToolbarClassName] = useState(false);

	useEffect(() => {
		if (!isEditingToolbarClassName) {
			setToolbarClassName(currentClassName);
		}
	}, [currentClassName, isEditingToolbarClassName]);

	const parsedSpacing = useMemo(
		() => parseBootstrapSpacingFromClassName(className),
		[className]
	);

	const alignMap = useMemo(
		() => parseBootstrapTextAlignFromClassName(className),
		[className]
	);

	const displayMap = useMemo(
		() => parseBootstrapDisplayFromClassName(className),
		[className]
	);

	const flexMap = useMemo(
		() => parseBootstrapFlexFromClassName(className),
		[className]
	);

	const flexItemMap = useMemo(
		() => parseBootstrapFlexItemFromClassName(className),
		[className]
	);

	const columnMap = useMemo(
		() => parseBootstrapColumnFromClassName(className),
		[className]
	);

	const tabsWithIndicators = useMemo(() => {
		return TABS.map((t) => {
			const modified =
				bpHasAnySpacing(parsedSpacing, t.name) ||
				bpHasTextAlign(alignMap, t.name) ||
				!!displayMap?.[t.name] ||
				bpHasAnySetting(flexMap, t.name, FLEX_SETTINGS) ||
				bpHasAnySetting(flexItemMap, t.name, FLEX_ITEM_SETTINGS) ||
				(showColumnControls && bpHasAnySetting(columnMap, t.name, COLUMN_SETTINGS));

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
	}, [parsedSpacing, alignMap, displayMap, flexMap, flexItemMap, columnMap, showColumnControls]);

	const setSpacingSlot = (type, bp, side, nextVal) => {
		const val = nextVal === "" ? null : nextVal;
		const next = updateBootstrapSpacingSlot(className || "", {type, bp, side}, val);
		setClassName(normalizeClassName(next));
	};

	const setTextAlignSlot = (bp, nextVal) => {
		const next = updateBootstrapTextAlignSlot(className || "", bp, nextVal);
		setClassName(normalizeClassName(next));
	};

	const setDisplaySlot = (bp, nextVal) => {
		const next = updateBootstrapDisplaySlot(className || "", bp, nextVal);
		setClassName(normalizeClassName(next));
	};

	const setFlexSlot = (bp, setting, nextVal) => {
		const next = updateBootstrapFlexSlot(className || "", bp, setting, nextVal);
		setClassName(normalizeClassName(next));
	};

	const setFlexItemSlot = (bp, setting, nextVal) => {
		const next = updateBootstrapFlexItemSlot(className || "", bp, setting, nextVal);
		setClassName(normalizeClassName(next));
	};

	const setColumnSlot = (bp, setting, nextVal) => {
		const next = updateBootstrapColumnSlot(className || "", bp, setting, nextVal);
		setClassName(normalizeClassName(next));
	};

	const clearSpacingSlot = (bp) => {
		let next = className || "";

		next = updateBootstrapSpacingSlot(next, { type: "p", bp, side: "" }, null);
		next = updateBootstrapSpacingSlot(next, { type: "m", bp, side: "" }, null);

		setClassName(normalizeClassName(next));
	};

	const clearTextAlignSlot = (bp) => {
		const next = updateBootstrapTextAlignSlot(className || "", bp, "");
		setClassName(normalizeClassName(next));
	};

	const clearDisplaySlot = (bp) => {
		const next = updateBootstrapDisplaySlot(className || "", bp, "");
		setClassName(normalizeClassName(next));
	};

	const clearFlexSlot = (bp) => {
		const next = clearBootstrapFlexBreakpoint(className || "", bp);
		setClassName(normalizeClassName(next));
	};

	const clearFlexItemSlot = (bp) => {
		const next = clearBootstrapFlexItemBreakpoint(className || "", bp);
		setClassName(normalizeClassName(next));
	};

	const clearColumnSlot = (bp) => {
		const next = clearBootstrapColumnBreakpoint(className || "", bp);
		setClassName(normalizeClassName(next));
	};

	const stopToolbarKeyPropagation = (event) => {
		event.stopPropagation();
	};

	const setToolbarClassNameValue = (next) => {
		setToolbarClassName(next);
		setClassName(next);
	};

	const commitToolbarClassNameValue = (value) => {
		const next = normalizeClassName(value);
		setToolbarClassName(next);
		setClassName(next);
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
								value={toolbarClassName}
								onChange={setToolbarClassNameValue}
								onFocus={() => setIsEditingToolbarClassName(true)}
								onBlur={(e) => {
									setIsEditingToolbarClassName(false);
									commitToolbarClassNameValue(e.target.value);
								}}
								onKeyDown={stopToolbarKeyPropagation}
								onKeyUp={stopToolbarKeyPropagation}
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
						const currentDisplay = displayMap?.[bp] ?? "";
						const currentFlex = flexMap?.[bp] ?? {};
						const currentFlexItem = flexItemMap?.[bp] ?? {};
						const currentColumn = columnMap?.[bp] ?? {};

						return (
							<Panel key={bp || "base"}>
								{showColumnControls && (
									<BootstrapColumnPanelBody
										bpLabel={bpLabel}
										isBaseBreakpoint={bp === ""}
										currentColumn={currentColumn}
										onChangeColumn={(setting, value) => setColumnSlot(bp, setting, value)}
										onClearColumn={() => clearColumnSlot(bp)}
									/>
								)}

								<BootstrapSpacingPanelBody
									bp={bp}
									bpLabel={bpLabel}
									parsedSpacing={parsedSpacing}
									onChangeSpacing={(type, side, v) => setSpacingSlot(type, bp, side, v)}
									onClearSpacing={() => clearSpacingSlot(bp)}
								/>

								<BootstrapAlignmentPanelBody
									bpLabel={bpLabel}
									currentAlign={currentAlign}
									onChangeAlign={(next) => setTextAlignSlot(bp, next)}
									onClearAlign={() => clearTextAlignSlot(bp)}
								/>

								<BootstrapDisplayPanelBody
									bpLabel={bpLabel}
									currentDisplay={currentDisplay}
									onChangeDisplay={(v) => setDisplaySlot(bp, v)}
									onClearDisplay={() => clearDisplaySlot(bp)}
								/>

								<BootstrapFlexPanelBody
									bpLabel={bpLabel}
									currentFlex={currentFlex}
									onChangeFlex={(setting, value) => setFlexSlot(bp, setting, value)}
									onClearFlex={() => clearFlexSlot(bp)}
								/>

								<BootstrapFlexItemPanelBody
									bpLabel={bpLabel}
									currentFlexItem={currentFlexItem}
									onChangeFlexItem={(setting, value) => setFlexItemSlot(bp, setting, value)}
									onClearFlexItem={() => clearFlexItemSlot(bp)}
								/>

							</Panel>
						);
					}}
				</TabPanel>
			</InspectorControls>
		</>
	);
}
