import {InnerBlocks, useBlockProps} from "@wordpress/block-editor";
import {convertStylesStringToObject} from "../../utils/convert-styles-string-to-object.js";

export default ({attributes}) => {
	const {
		className = "",
		inlineStyles,
	} = attributes;

	const blockProps = useBlockProps.save({
		className: `row rlb2-row ${className}`.trim(),
		style: convertStylesStringToObject(inlineStyles),
	});

	return (
		<div {...blockProps}>
			<InnerBlocks.Content/>
		</div>
	);
};
