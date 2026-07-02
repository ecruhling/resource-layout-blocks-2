import { registerBlockType } from "@wordpress/blocks";
import { InnerBlocks, useBlockProps } from "@wordpress/block-editor";
import metadata from "./block.json";
import icons from "../../icons/icons.jsx";

registerBlockType(metadata.name, {
    ...metadata,
	icon: icons.column,
    edit() {
        const props = useBlockProps({ className: "col resource-layout-blocks-2-column" });
        return (
            <div {...props}>
                <InnerBlocks templateLock={false} />
            </div>
        );
    },
    save() {
        const props = useBlockProps.save({ className: "col resource-layout-blocks-2-column" });
        return (
            <div {...props}>
                <InnerBlocks.Content />
            </div>
        );
    },
});
