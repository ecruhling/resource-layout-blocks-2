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

const NONE = {label: "—", value: ""};

const COLUMN_OPTIONS = [
	NONE,
	{label: "equal", value: "equal"},
	{label: "1", value: "1"},
	{label: "2", value: "2"},
	{label: "3", value: "3"},
	{label: "4", value: "4"},
	{label: "5", value: "5"},
	{label: "6", value: "6"},
	{label: "7", value: "7"},
	{label: "8", value: "8"},
	{label: "9", value: "9"},
	{label: "10", value: "10"},
	{label: "11", value: "11"},
	{label: "12", value: "12"},
	{label: "auto", value: "auto"},
];

const OFFSET_OPTIONS = [
	NONE,
	{label: "1", value: "1"},
	{label: "2", value: "2"},
	{label: "3", value: "3"},
	{label: "4", value: "4"},
	{label: "5", value: "5"},
	{label: "6", value: "6"},
	{label: "7", value: "7"},
	{label: "8", value: "8"},
	{label: "9", value: "9"},
	{label: "10", value: "10"},
	{label: "11", value: "11"},
	{label: "12", value: "12"},
];

function hasAnyColumnSetting(currentColumn = {}) {
	return !!currentColumn?.columns || !!currentColumn?.offset;
}

export default function BootstrapColumnPanelBody({
													 bpLabel,
													 isBaseBreakpoint = false,
													 currentColumn,
													 onChangeColumn,
													 onClearColumn,
													 panelBodyClassName = "resource-panel-body",
													 cardHeaderClassName = "resource-card-header",
													 selectMinWidth = "50px",
													 selectMaxWidth = "100px",
												 }) {
	const isModified = hasAnyColumnSetting(currentColumn);
	const columnOptions = isBaseBreakpoint
		? COLUMN_OPTIONS.filter(({value}) => value !== "")
		: COLUMN_OPTIONS;
	const currentColumns = currentColumn?.columns || (isBaseBreakpoint ? "equal" : "");

	return (
		<PanelBody
			title={
				<PanelTitleWithClear
					title="Column"
					isModified={isModified}
					clearLabel={`Clear ${bpLabel} column settings`}
					onClear={onClearColumn}
				/>
			}
			initialOpen={true}
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
						{`${bpLabel} COLUMN`}
					</CardHeader>

					<CardBody size="small">
						<Flex wrap={true} direction="row" gap={3}>
							<FlexItem style={{minWidth: selectMinWidth, maxWidth: selectMaxWidth}}>
								<SelectControl
									__next40pxDefaultSize
									size="compact"
									label="Columns"
									value={currentColumns}
									options={columnOptions}
									onChange={(value) => onChangeColumn("columns", value)}
								/>
							</FlexItem>
							<FlexItem style={{minWidth: selectMinWidth, maxWidth: selectMaxWidth}}>
								<SelectControl
									__next40pxDefaultSize
									size="compact"
									label="Offset"
									value={currentColumn?.offset ?? ""}
									options={OFFSET_OPTIONS}
									onChange={(value) => onChangeColumn("offset", value)}
								/>
							</FlexItem>
						</Flex>
					</CardBody>
				</Card>
			</PanelRow>
		</PanelBody>
	);
}
