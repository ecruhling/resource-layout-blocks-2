import { Button, VisuallyHidden } from "@wordpress/components";
import { closeSmall } from "@wordpress/icons";

export default function PanelTitleWithClear({
												title,
												isModified = false,
												onClear,
												clearLabel = "Clear settings",
											}) {
	return (
		<span className="resource-panel-title">
			<span>{title}</span>

			{isModified && (
				<>
					<span className="resource-panel-dot" aria-hidden="true" />
					<VisuallyHidden>modified</VisuallyHidden>
				</>
			)}

			<Button
				className="resource-panel-clear"
				icon={closeSmall}
				label={clearLabel}
				size="small"
				variant="tertiary"
				disabled={!isModified}
				onMouseDown={(event) => {
					// Prevent PanelBody toggle when clicking the clear button.
					event.preventDefault();
					event.stopPropagation();
				}}
				onClick={(event) => {
					event.preventDefault();
					event.stopPropagation();
					onClear?.();
				}}
			/>
		</span>
	);
}
