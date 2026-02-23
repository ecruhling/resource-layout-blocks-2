import {
	Card,
	CardBody,
	CardHeader,
	PanelBody,
	PanelRow,
	ToolbarButton,
	ToolbarGroup,
	VisuallyHidden,
} from "@wordpress/components";

import { alignCenter, alignLeft, alignRight, closeSmall } from "@wordpress/icons";

export default function BootstrapAlignmentPanelBody({
														bpLabel,
														currentAlign, // 'start'|'center'|'end'|''
														onChangeAlign, // (nextAlign: 'start'|'center'|'end'|'') => void
														panelBodyClassName = "resource-panel-body",
														cardHeaderClassName = "resource-card-header",
													}) {
	const isModified = !!currentAlign;

	return (
		<PanelBody
			title={
				<span className="resource-panel-title">
					Alignment
					{isModified && (
						<>
							<span className="resource-panel-dot" aria-hidden="true" />
							<VisuallyHidden>modified</VisuallyHidden>
						</>
					)}
				</span>
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
						{`${bpLabel} ALIGNMENT`}
					</CardHeader>

					<CardBody size="small">
						<ToolbarGroup>
							<ToolbarButton
								icon={alignLeft}
								label="Align start"
								isPressed={currentAlign === "start"}
								onClick={() => onChangeAlign(currentAlign === "start" ? "" : "start")}
							/>
							<ToolbarButton
								icon={alignCenter}
								label="Align center"
								isPressed={currentAlign === "center"}
								onClick={() => onChangeAlign(currentAlign === "center" ? "" : "center")}
							/>
							<ToolbarButton
								icon={alignRight}
								label="Align end"
								isPressed={currentAlign === "end"}
								onClick={() => onChangeAlign(currentAlign === "end" ? "" : "end")}
							/>
							<ToolbarButton
								icon={closeSmall}
								label="Clear alignment"
								isPressed={currentAlign === ""}
								onClick={() => onChangeAlign("")}
							/>
						</ToolbarGroup>
					</CardBody>
				</Card>
			</PanelRow>
		</PanelBody>
	);
}
