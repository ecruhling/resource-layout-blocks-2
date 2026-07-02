import {__} from "@wordpress/i18n";
import {InnerBlocks, InspectorControls, useBlockProps} from "@wordpress/block-editor";
import {TextControl} from "@wordpress/components";
import {convertStylesStringToObject} from "../../utils/convert-styles-string-to-object.js";
import ClassNameAndBootstrapControls from "../../components/ClassNameAndBootstrapControls.jsx";

const COLUMN_BLOCK = "resource-layout-blocks-2/column";
const ALLOWED = [COLUMN_BLOCK];
const TEMPLATE = [[COLUMN_BLOCK], [COLUMN_BLOCK]];

export default ({attributes, setAttributes}) => {
	const {
		className = "",
		inlineStyles,
	} = attributes;

	const setClassName = (next) => setAttributes({className: next});
	const setInlineStyles = (value) => {
		setAttributes({
			inlineStyles: value !== "" ? value : undefined,
		});
	};

	const blockProps = useBlockProps({
		className: `row resource-layout-blocks-2-row ${className}`.trim(),
		style: convertStylesStringToObject(inlineStyles),
	});

	return (
		<>
			<ClassNameAndBootstrapControls className={className} setClassName={setClassName}/>
			<InspectorControls group="advanced">
				<TextControl
					__nextHasNoMarginBottom
					className="inline-style-control"
					autoComplete="off"
					label={__("Inline Styles")}
					value={inlineStyles || ""}
					onChange={setInlineStyles}
				/>
			</InspectorControls>
			<div {...blockProps}>
				<InnerBlocks allowedBlocks={ALLOWED} template={TEMPLATE} templateLock={false}/>
			</div>
		</>
	);
};
