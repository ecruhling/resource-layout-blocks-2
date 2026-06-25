import {
	Card,
	CardBody,
	CardHeader,
	PanelBody,
	PanelRow,
	ToolbarButton,
	ToolbarGroup,
} from "@wordpress/components";

import { alignCenter, alignLeft, alignRight, closeSmall } from "@wordpress/icons";
import PanelTitleWithClear from "./PanelTitleWithClear";

const ALIGNMENT_CONTROLS = [
	{ value: "start", icon: alignLeft, label: "Align start" },
	{ value: "center", icon: alignCenter, label: "Align center" },
	{ value: "end", icon: alignRight, label: "Align end" },
];

export default function BootstrapAlignmentPanelBody({
														bpLabel,
														currentAlign, // 'start'|'center'|'end'|''
														onChangeAlign, // (nextAlign: 'start'|'center'|'end'|'') => void
														onClearAlign,
														panelBodyClassName = "resource-panel-body",
														cardHeaderClassName = "resource-card-header",
													}) {
	const isModified = !!currentAlign;

	return (
		<PanelBody
			title={
				<PanelTitleWithClear
					title="Alignment"
					isModified={isModified}
					clearLabel={`Clear ${bpLabel} alignment`}
					onClear={onClearAlign}
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
						{`${bpLabel} ALIGNMENT`}
					</CardHeader>

					<CardBody size="small">
						<ToolbarGroup>
							{ALIGNMENT_CONTROLS.map(({ value, icon, label }) => (
								<ToolbarButton
									key={value}
									icon={icon}
									label={label}
									isPressed={currentAlign === value}
									onClick={() => onChangeAlign(currentAlign === value ? "" : value)}
								/>
							))}
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
