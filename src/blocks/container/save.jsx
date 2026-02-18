import {InnerBlocks, useBlockProps} from "@wordpress/block-editor";

export default ({attributes}) => {
	const {className = "", isFluid = true} = attributes;

	const containerClass = isFluid ? "container-fluid" : "container";

	const blockProps = useBlockProps.save({
		className: `${containerClass} resource-layout-blocks-2-container ${className}`.trim(),
	});

	return (
		<div {...blockProps}>
			<InnerBlocks.Content/>
		</div>
	);
};
