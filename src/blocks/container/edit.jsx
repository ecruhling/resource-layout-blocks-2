/**
 * WordPress dependencies
 */
import {__} from '@wordpress/i18n';
import {InnerBlocks, InspectorControls, useBlockProps,} from '@wordpress/block-editor';
import {
	Card,
	CardBody,
	CardHeader,
	CheckboxControl,
	Flex,
	FlexItem,
	SelectControl,
	TextControl,
} from '@wordpress/components';

/**
 * Internal dependencies
 */
import {tagNameMessages} from '../../help/tagNameMessages';
import ClassNameAndBootstrapSpacingControls from "../../components/ClassNameAndBootstrapSpacingControls";
import {convertStylesStringToObject} from "../../util/convertStylesStringToObject.js";

const ALLOWED = ["resource-layout-blocks-2/row"];
const TEMPLATE = [["resource-layout-blocks-2/row", {}, [["resource-layout-blocks-2/column"], ["resource-layout-blocks-2/column"]]]];

export default ({attributes, setAttributes}) => {
	const {
		className = "",
		isFluid = true,
		tagName: TagName = 'div',
		inlineStyles,
	} = attributes;

	const setClassName = (next) => setAttributes({className: next});

	const containerClass = isFluid ? "container-fluid" : "container";

	const blockProps = useBlockProps({
		className: `${containerClass} resource-layout-blocks-2-container ${className}`.trim(),
		style: convertStylesStringToObject(inlineStyles),
	});

	return (
		<>
			<InspectorControls>
				<Card isRounded={false}>
					<CardHeader
						isRounded={false}
						isBorderless={true}
						isShady={true}
						size="extraSmall"
						className="resource-card-header"
					>
						{__('CONTAINER', 'resource')}
					</CardHeader>
					<CardBody size="small">
						<Flex wrap={true}>
							<FlexItem>
								<SelectControl
									label={__('HTML element', 'resource')}
									options={[
										{
											label: __(
												'Default (<div>)',
												'resource'
											),
											value: 'div',
										},
										{label: '<header>', value: 'header'},
										{label: '<main>', value: 'main'},
										{
											label: '<section>',
											value: 'section',
										},
										{
											label: '<article>',
											value: 'article',
										},
										{label: '<aside>', value: 'aside'},
										{label: '<footer>', value: 'footer'},
									]}
									value={TagName}
									onChange={(value) =>
										setAttributes({tagName: value})
									}
									help={tagNameMessages[TagName]}
								/>
							</FlexItem>
							<FlexItem>
								<CheckboxControl
									label={__('Fluid', 'resource')}
									checked={!!isFluid}
									onChange={(next) => setAttributes({isFluid: !!next})}
								/>
							</FlexItem>
						</Flex>
					</CardBody>
				</Card>
			</InspectorControls>
			<ClassNameAndBootstrapSpacingControls className={className} setClassName={setClassName}/>
			<InspectorControls group="advanced">
				<TextControl
					__nextHasNoMarginBottom
					className="inline-style-control"
					autoComplete="off"
					label={__('Inline Styles')}
					value={inlineStyles || ''}
					onChange={(value) => {
						setAttributes({
							inlineStyles: value !== '' ? value : undefined,
						});
					}}
				/>
			</InspectorControls>
			<TagName {...blockProps}>
				<InnerBlocks allowedBlocks={ALLOWED} template={TEMPLATE} templateLock={false}/>
			</TagName>
		</>
	);
};
