import { registerBlockType } from "@wordpress/blocks";
import metadata from "./block.json";
import icons from "../../icons/icons.jsx";
import edit from "./edit";
import save from "./save";

registerBlockType(metadata.name, {
    ...metadata,
	icon: icons.row,
	edit,
    save,
});
