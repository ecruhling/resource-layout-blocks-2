import {InnerBlocks, useBlockProps} from "@wordpress/block-editor";

export default ({attributes}) => {
	const {
		className = "",
		isFluid = true,
		tagName: TagName = 'div',
	} = attributes;

	const containerClass = isFluid ? "container-fluid" : "container";

	const blockProps = useBlockProps.save({
		className: `${containerClass} resource-layout-blocks-2-container ${className}`.trim(),
	});

	return (
		<TagName {...blockProps}>
			<InnerBlocks.Content/>
		</TagName>
	);
};
