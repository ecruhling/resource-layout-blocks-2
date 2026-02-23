import {
	Card,
	CardBody,
	CardHeader,
	Flex,
	FlexItem,
	Icon,
	PanelBody,
	PanelRow,
	SelectControl,
	VisuallyHidden,
} from "@wordpress/components";

import { sidesBottom, sidesLeft, sidesRight, sidesTop } from "@wordpress/icons";

const NONE = { label: "— none —", value: "" };
const PAD_VALUES = ["0", "1", "2", "3", "4", "5"].map((v) => ({ label: v, value: v }));
const MAR_VALUES = [{ label: "auto", value: "auto" }, ...PAD_VALUES];

const DEFAULT_PADDING_CONTROLS = [
	{ side: "t", label: "Padding Top (pt-*)", icon: sidesTop },
	{ side: "e", label: "Padding End (pe-*)", icon: sidesRight },
	{ side: "b", label: "Padding Bottom (pb-*)", icon: sidesBottom },
	{ side: "s", label: "Padding Start (ps-*)", icon: sidesLeft },
];

const DEFAULT_MARGIN_CONTROLS = [
	{ side: "t", label: "Margin Top (mt-*)", icon: sidesTop },
	{ side: "e", label: "Margin End (me-*)", icon: sidesRight },
	{ side: "b", label: "Margin Bottom (mb-*)", icon: sidesBottom },
	{ side: "s", label: "Margin Start (ms-*)", icon: sidesLeft },
];

function getSpacingValue(parsedSpacing, type, bp, side) {
	return parsedSpacing?.[type]?.[bp]?.[side] ?? "";
}

function hasAnyForControls(parsedSpacing, bp, type, controls) {
	for (const { side } of controls) {
		const v = parsedSpacing?.[type]?.[bp]?.[side];
		if (v !== null && v !== undefined) return true; // includes '0' and 'auto'
	}
	return false;
}

export default function BootstrapSpacingPanelBody({
													  bp,
													  bpLabel,
													  parsedSpacing,
													  onChangeSpacing, // (type: 'p'|'m', side: 't'|'b'|'s'|'e', nextVal: string) => void
													  paddingControls = DEFAULT_PADDING_CONTROLS,
													  marginControls = DEFAULT_MARGIN_CONTROLS,
													  panelBodyClassName = "resource-panel-body",
													  cardHeaderClassName = "resource-card-header",
													  cellMaxWidth = "42.5px",
												  }) {
	const isModified =
		hasAnyForControls(parsedSpacing, bp, "p", paddingControls) ||
		hasAnyForControls(parsedSpacing, bp, "m", marginControls);

	return (
		<PanelBody
			title={
				<span className="resource-panel-title">
					Spacing
					{isModified && (
						<>
							<span className="resource-panel-dot" aria-hidden="true" />
							<VisuallyHidden>modified</VisuallyHidden>
						</>
					)}
				</span>
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
						{`${bpLabel} PADDING`}
					</CardHeader>

					<CardBody size="small">
						<Flex wrap={true}>
							{paddingControls.map(({ side, label, icon }) => (
								<FlexItem key={`p-${bp}-${side}`} style={{ maxWidth: cellMaxWidth }}>
									<Icon icon={icon} />
									<SelectControl
										__next40pxDefaultSize
										size="compact"
										hideLabelFromVision
										label={label}
										value={getSpacingValue(parsedSpacing, "p", bp, side)}
										options={[NONE, ...PAD_VALUES]}
										style={{ maxWidth: cellMaxWidth }}
										onChange={(v) => onChangeSpacing("p", side, v)}
									/>
								</FlexItem>
							))}
						</Flex>
					</CardBody>

					<CardHeader
						isRounded={false}
						isBorderless={true}
						isShady={true}
						size="extraSmall"
						className={cardHeaderClassName}
					>
						{`${bpLabel} MARGIN`}
					</CardHeader>

					<CardBody size="small">
						<Flex wrap={true}>
							{marginControls.map(({ side, label, icon }) => (
								<FlexItem key={`m-${bp}-${side}`} style={{ maxWidth: cellMaxWidth }}>
									<Icon icon={icon} />
									<SelectControl
										__next40pxDefaultSize
										size="compact"
										hideLabelFromVision
										label={label}
										value={getSpacingValue(parsedSpacing, "m", bp, side)}
										options={[NONE, ...MAR_VALUES]}
										style={{ maxWidth: cellMaxWidth }}
										onChange={(v) => onChangeSpacing("m", side, v)}
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
