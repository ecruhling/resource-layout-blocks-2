import { registerBlockType } from "@wordpress/blocks";
import { InnerBlocks, useBlockProps } from "@wordpress/block-editor";
import metadata from "./block.json";

registerBlockType(metadata.name, {
    ...metadata,
    edit() {
        const props = useBlockProps({ className: "my-layout-column" });
        return (
            <div {...props}>
                <InnerBlocks templateLock={false} />
            </div>
        );
    },
    save() {
        const props = useBlockProps.save({ className: "my-layout-column" });
        return (
            <div {...props}>
                <InnerBlocks.Content />
            </div>
        );
    },
});
