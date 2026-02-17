import { registerBlockType } from "@wordpress/blocks";
import { InnerBlocks, useBlockProps } from "@wordpress/block-editor";
import metadata from "./block.json";

const ALLOWED = ["my-layout/column"];
const TEMPLATE = [["my-layout/column"], ["my-layout/column"]];

registerBlockType(metadata.name, {
    ...metadata,
    edit() {
        const props = useBlockProps({ className: "my-layout-row" });
        return (
            <div {...props}>
                <InnerBlocks allowedBlocks={ALLOWED} template={TEMPLATE} templateLock={false} />
            </div>
        );
    },
    save() {
        const props = useBlockProps.save({ className: "my-layout-row" });
        return (
            <div {...props}>
                <InnerBlocks.Content />
            </div>
        );
    },
});
