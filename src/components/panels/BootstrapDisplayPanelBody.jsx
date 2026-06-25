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

const NONE = { label: "—", value: "" };

const DISPLAY_OPTIONS = [
	NONE,
	{ label: "none (d-none)", value: "none" },
	{ label: "inline (d-inline)", value: "inline" },
	{ label: "inline-block (d-inline-block)", value: "inline-block" },
	{ label: "block (d-block)", value: "block" },
	{ label: "grid (d-grid)", value: "grid" },
	{ label: "table (d-table)", value: "table" },
	{ label: "table-row (d-table-row)", value: "table-row" },
	{ label: "table-cell (d-table-cell)", value: "table-cell" },
	{ label: "flex (d-flex)", value: "flex" },
	{ label: "inline-flex (d-inline-flex)", value: "inline-flex" },
];

export default function BootstrapDisplayPanelBody({
													  bpLabel,
													  currentDisplay, // 'none'|'inline'|...|'inline-flex'|''
													  onChangeDisplay, // (nextVal: string) => void
													  onClearDisplay,
													  panelBodyClassName = "resource-panel-body",
													  cardHeaderClassName = "resource-card-header",
													  selectMinWidth = "190px",
												  }) {
	const isModified = !!currentDisplay;

	return (
		<PanelBody
			title={
				<PanelTitleWithClear
					title="Display"
					isModified={isModified}
					clearLabel={`Clear ${bpLabel} display`}
					onClear={onClearDisplay}
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
						{`${bpLabel} DISPLAY`}
					</CardHeader>

					<CardBody size="small">
						<Flex wrap={true}>
							<FlexItem style={{ minWidth: selectMinWidth }}>
								<SelectControl
									__next40pxDefaultSize
									size="compact"
									label="Display"
									value={currentDisplay || ""}
									options={DISPLAY_OPTIONS}
									onChange={onChangeDisplay}
								/>
							</FlexItem>
						</Flex>
					</CardBody>
				</Card>
			</PanelRow>
		</PanelBody>
	);
}
