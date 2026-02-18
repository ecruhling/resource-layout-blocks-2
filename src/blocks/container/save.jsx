import {InnerBlocks, useBlockProps} from "@wordpress/block-editor";
import {convertStylesStringToObject} from "../../util/convertStylesStringToObject.js";

export default ({attributes}) => {
	const {
		className = "",
		isFluid = true,
		tagName: TagName = 'div',
		inlineStyles,
	} = attributes;

	const containerClass = isFluid ? "container-fluid" : "container";

	const blockProps = useBlockProps.save({
		className: `${containerClass} resource-layout-blocks-2-container ${className}`.trim(),
		style: convertStylesStringToObject(inlineStyles),
	});

	return (
		<TagName {...blockProps}>
			<InnerBlocks.Content/>
		</TagName>
	);
};
