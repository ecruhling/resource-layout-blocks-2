import {InnerBlocks, useBlockProps} from "@wordpress/block-editor";
import {convertStylesStringToObject} from "../../utils/convert-styles-string-to-object.js";

export default ({attributes}) => {
	const {
		className = "",
		isFluid = true,
		tagName: TagName = 'div',
		inlineStyles,
	} = attributes;

	const containerClass = isFluid ? "container-fluid" : "container";

	const blockProps = useBlockProps.save({
		className: `${containerClass} rlb2-container ${className}`.trim(),
		style: convertStylesStringToObject(inlineStyles),
	});

	return (
		<TagName {...blockProps}>
			<InnerBlocks.Content/>
		</TagName>
	);
};
