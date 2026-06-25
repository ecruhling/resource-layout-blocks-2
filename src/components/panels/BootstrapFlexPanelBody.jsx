import {
	Card,
	CardBody,
	CardHeader,
	Flex,
	FlexItem,
	PanelBody,
	PanelRow,
	SelectControl,
} from "@wordpress/components";

import PanelTitleWithClear from "./PanelTitleWithClear";

const NONE = { label: "— none —", value: "" };
const withNone = (values) => [
	NONE,
	...values.map((value) => ({ label: value, value })),
];

const FLEX_DIRECTION_OPTIONS = withNone(["row", "row-reverse", "column", "column-reverse"]);
const FLEX_WRAP_OPTIONS = withNone(["wrap", "nowrap", "wrap-reverse"]);
const JUSTIFY_CONTENT_OPTIONS = withNone(["start", "end", "center", "between", "around", "evenly"]);
const ALIGN_ITEMS_OPTIONS = withNone(["start", "end", "center", "baseline", "stretch"]);
const ALIGN_CONTENT_OPTIONS = withNone(["start", "end", "center", "between", "around", "stretch"]);

const FLEX_CONTROLS = [
	{
		setting: "direction",
		label: "Flex Direction",
		options: FLEX_DIRECTION_OPTIONS,
	},
	{
		setting: "wrap",
		label: "Flex Wrap",
		options: FLEX_WRAP_OPTIONS,
	},
	{
		setting: "justify",
		label: "Justify Content",
		options: JUSTIFY_CONTENT_OPTIONS,
	},
	{
		setting: "alignItems",
		label: "Align Items",
		options: ALIGN_ITEMS_OPTIONS,
	},
	{
		setting: "alignContent",
		label: "Align Content",
		options: ALIGN_CONTENT_OPTIONS,
	},
];

function hasAnyFlexSetting(currentFlex = {}) {
	return FLEX_CONTROLS.some(({ setting }) => currentFlex?.[setting]);
}

export default function BootstrapFlexPanelBody({
												   bpLabel,
												   currentFlex,
												   onChangeFlex,
												   onClearFlex,
												   panelBodyClassName = "resource-panel-body",
												   cardHeaderClassName = "resource-card-header",
												   selectMinWidth = "190px",
											   }) {
	const isModified = hasAnyFlexSetting(currentFlex);

	return (
		<PanelBody
			title={
				<PanelTitleWithClear
					title="Flex"
					isModified={isModified}
					clearLabel={`Clear ${bpLabel} flex settings`}
					onClear={onClearFlex}
				/>
			}
			initialOpen={false}
			className={panelBodyClassName}
		>
			<PanelRow>
				<Card isRounded={false}>
					<CardHeader
						isRounded={false}
						isBorderless={true}
						isShady={true}
						size="extraSmall"
						className={cardHeaderClassName}
					>
						{`${bpLabel} FLEX`}
					</CardHeader>

					<CardBody size="small">
						<Flex wrap={true} direction="column" gap={3}>
							{FLEX_CONTROLS.map(({ setting, label, options }) => (
								<FlexItem key={`flex-${setting}`} style={{ minWidth: selectMinWidth }}>
									<SelectControl
										__next40pxDefaultSize
										size="compact"
										label={label}
										value={currentFlex?.[setting] ?? ""}
										options={options}
										onChange={(value) => onChangeFlex(setting, value)}
									/>
								</FlexItem>
							))}
						</Flex>
					</CardBody>
				</Card>
			</PanelRow>
		</PanelBody>
	);
}
