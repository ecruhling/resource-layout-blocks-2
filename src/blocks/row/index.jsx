import { registerBlockType } from "@wordpress/blocks";
import { InnerBlocks, useBlockProps } from "@wordpress/block-editor";
import metadata from "./block.json";
import icons from "../../icons/icons.jsx";

const COLUMN_BLOCK = "resource-layout-blocks-2/column";
const ALLOWED = [COLUMN_BLOCK];
const TEMPLATE = [[COLUMN_BLOCK], [COLUMN_BLOCK]];

registerBlockType(metadata.name, {
    ...metadata,
	icon: icons.row,
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
