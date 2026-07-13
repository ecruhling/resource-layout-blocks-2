import {InnerBlocks, useBlockProps} from "@wordpress/block-editor";
import {convertStylesStringToObject} from "../../utils/convert-styles-string-to-object.js";
import {getBootstrapColumnClassName} from "../../utils/classname-bootstrap-column.js";

export default ({attributes}) => {
	const {
		className = "",
		inlineStyles,
	} = attributes;

	const blockProps = useBlockProps.save({
		className: getBootstrapColumnClassName(className),
		style: convertStylesStringToObject(inlineStyles),
	});

	return (
		<div {...blockProps}>
			<InnerBlocks.Content/>
		</div>
	);
};
