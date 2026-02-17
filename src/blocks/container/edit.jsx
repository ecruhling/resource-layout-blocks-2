/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import {
    BlockControls,
    InnerBlocks,
    InspectorControls,
    useBlockProps,
} from '@wordpress/block-editor';
import {
    Card,
    CardBody,
    CardHeader,
    CheckboxControl,
    Flex,
    FlexItem,
    SelectControl,
    TabPanel,
    TextControl,
    Toolbar,
} from '@wordpress/components';

/**
 * External dependencies
 */
import classnames from 'classnames';
import {omit} from 'lodash';

/**
 * Internal dependencies
 */
import { tagNameMessages } from '../../help/tagNameMessages';
// import DisplayControl from '../../block-controls/displayControl';
// import PaddingControl from '../../block-controls/paddingControl';
// import MarginControl from '../../block-controls/marginControl';
// import AlignControl from '../../block-controls/alignControl';
// import FlexControl from '../../block-controls/flexControl';
import {convertStylesStringToObject} from '../../util/convertStylesStringToObject';
import ClassNameAndBootstrapSpacingControls from "../../components/ClassNameAndBootstrapSpacingControls";

const ALLOWED = ["resource-layout-blocks-2/row"];
const TEMPLATE = [["resource-layout-blocks-2/row", {}, [["resource-layout-blocks-2/column"], ["resource-layout-blocks-2/column"]]]];

export default ({attributes, setAttributes}) => {
    const {
        isFluid,
        tagName: TagName = 'div',
        inlineStyles,
        baseDisplay,
        baseAlignText,
        baseFlexDirection,
        baseFillGrowShrink,
        baseWrap,
        baseOrder,
        baseAlignContent,
        baseAlignItems,
        baseAlignSelf,
        baseJustifyContent,
        smDisplay,
        smAlignText,
        smFlexDirection,
        smFillGrowShrink,
        smWrap,
        smOrder,
        smAlignContent,
        smAlignItems,
        smAlignSelf,
        smJustifyContent,
        mdDisplay,
        mdAlignText,
        mdFlexDirection,
        mdFillGrowShrink,
        mdWrap,
        mdOrder,
        mdAlignContent,
        mdAlignItems,
        mdAlignSelf,
        mdJustifyContent,
        lgDisplay,
        lgAlignText,
        lgFlexDirection,
        lgFillGrowShrink,
        lgWrap,
        lgOrder,
        lgAlignContent,
        lgAlignItems,
        lgAlignSelf,
        lgJustifyContent,
        xlDisplay,
        xlAlignText,
        xlFlexDirection,
        xlFillGrowShrink,
        xlWrap,
        xlOrder,
        xlAlignContent,
        xlAlignItems,
        xlAlignSelf,
        xlJustifyContent,
        xxlDisplay,
        xxlAlignText,
        xxlFlexDirection,
        xxlFillGrowShrink,
        xxlWrap,
        xxlOrder,
        xxlAlignContent,
        xxlAlignItems,
        xxlAlignSelf,
        xxlJustifyContent,
    } = attributes;

    // const classNameAttributes = omit(attributes, [
    //     'anchor',
    //     'isFluid',
    //     'tagName',
    //     'inlineStyles',
    //     'className',
    // ]);

    // const classes = classnames(
    //     {
    //         container: !isFluid,
    //         'container-fluid': isFluid,
    //     },
    //     Object.values(classNameAttributes),
    //     className
    // );

    // const blockProps = useBlockProps({
    //     className: classes,
    //     style: convertStylesStringToObject(inlineStyles),
    // });

    const className = attributes.className || "";
    const setClassName = (next) => setAttributes({ className: next });

    const blockProps = useBlockProps({
        className: `${className}`.trim(),
    });

    return (
        <>
            <InspectorControls>
                <Card isRounded={false}>
                    <CardHeader
                        isRounded={false}
                        isBorderless={ true }
                        isShady={ true }
                        size="extraSmall"
                        className="resource-card-header"
                    >
                        { __( 'CONTAINER', 'resource' ) }
                    </CardHeader>
                    <CardBody size="small">
                        <Flex wrap={ true }>
                            <FlexItem>
                                <SelectControl
                                    label={ __( 'HTML element', 'resource' ) }
                                    options={ [
                                        {
                                            label: __(
                                                'Default (<div>)',
                                                'resource'
                                            ),
                                            value: 'div',
                                        },
                                        { label: '<header>', value: 'header' },
                                        { label: '<main>', value: 'main' },
                                        {
                                            label: '<section>',
                                            value: 'section',
                                        },
                                        {
                                            label: '<article>',
                                            value: 'article',
                                        },
                                        { label: '<aside>', value: 'aside' },
                                        { label: '<footer>', value: 'footer' },
                                    ] }
                                    value={ TagName }
                                    onChange={ ( value ) =>
                                        setAttributes( { tagName: value } )
                                    }
                                    help={ tagNameMessages[ TagName ] }
                                />
                            </FlexItem>
                            <FlexItem>
                                <CheckboxControl
                                    label={ __( 'Fluid', 'resource' ) }
                                    checked={ isFluid }
                                    onChange={ ( value ) =>
                                        setAttributes( { isFluid: value } )
                                    }
                                />
                            </FlexItem>
                        </Flex>
                    </CardBody>
                </Card>
            </InspectorControls>
            <ClassNameAndBootstrapSpacingControls className={className} setClassName={setClassName} />
            <div {...blockProps}>
                <InnerBlocks allowedBlocks={ALLOWED} template={TEMPLATE} templateLock={false}/>
            </div>
        </>
    );
};
