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

const FLEX_GROW_OPTIONS = withNone(["0", "1"]);
const FLEX_SHRINK_OPTIONS = withNone(["0", "1"]);
const ALIGN_SELF_OPTIONS = withNone(["start", "end", "center", "baseline", "stretch"]);
const ORDER_OPTIONS = withNone(["first", "0", "1", "2", "3", "4", "5", "last"]);

const FLEX_ITEM_CONTROLS = [
	{
		setting: "grow",
		label: "Flex Grow",
		options: FLEX_GROW_OPTIONS,
	},
	{
		setting: "shrink",
		label: "Flex Shrink",
		options: FLEX_SHRINK_OPTIONS,
	},
	{
		setting: "alignSelf",
		label: "Align Self",
		options: ALIGN_SELF_OPTIONS,
	},
	{
		setting: "order",
		label: "Flex Order",
		options: ORDER_OPTIONS,
	},
];

function hasAnyFlexItemSetting(currentFlexItem = {}) {
	return FLEX_ITEM_CONTROLS.some(({ setting }) => currentFlexItem?.[setting]);
}

export default function BootstrapFlexItemPanelBody({
													   bpLabel,
													   currentFlexItem,
													   onChangeFlexItem,
													   onClearFlexItem,
													   panelBodyClassName = "resource-panel-body",
													   cardHeaderClassName = "resource-card-header",
													   selectMinWidth = "190px",
												   }) {
	const isModified = hasAnyFlexItemSetting(currentFlexItem);

	return (
		<PanelBody
			title={
				<PanelTitleWithClear
					title="Flex Item"
					isModified={isModified}
					clearLabel={`Clear ${bpLabel} flex item settings`}
					onClear={onClearFlexItem}
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
						{`${bpLabel} FLEX ITEM`}
					</CardHeader>

					<CardBody size="small">
						<Flex wrap={true} direction="column" gap={3}>
							{FLEX_ITEM_CONTROLS.map(({ setting, label, options }) => (
								<FlexItem key={`flex-item-${setting}`} style={{ minWidth: selectMinWidth }}>
									<SelectControl
										__next40pxDefaultSize
										size="compact"
										label={label}
										value={currentFlexItem?.[setting] ?? ""}
										options={options}
										onChange={(value) => onChangeFlexItem(setting, value)}
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
