import {__} from "@wordpress/i18n";
import {InnerBlocks, InspectorControls, useBlockProps} from "@wordpress/block-editor";
import {TextControl} from "@wordpress/components";
import {convertStylesStringToObject} from "../../utils/convert-styles-string-to-object.js";
import {getBootstrapColumnClassName} from "../../utils/classname-bootstrap-column.js";
import ClassNameAndBootstrapControls from "../../components/ClassNameAndBootstrapControls.jsx";

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
	const columnClassName = getBootstrapColumnClassName(className);

	const blockProps = useBlockProps({
		className: columnClassName,
		style: convertStylesStringToObject(inlineStyles),
	});

	return (
		<>
			<ClassNameAndBootstrapControls
				className={columnClassName}
				setClassName={setClassName}
				showColumnControls={true}
			/>
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
				<InnerBlocks templateLock={false}/>
			</div>
		</>
	);
};
