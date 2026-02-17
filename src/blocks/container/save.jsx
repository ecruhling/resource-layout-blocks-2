import {InnerBlocks, useBlockProps} from "@wordpress/block-editor";

export default () => {
    const props = useBlockProps.save({className: "resource-layout-blocks-2-container"});
    return (
        <div {...props}>
            <InnerBlocks.Content/>
        </div>
    );
};
