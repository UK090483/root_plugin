/**
 * BLOCK: my-block
 *
 * Registering a basic block with Gutenberg.
 * Simple block, renders and saves the same content without any interactivity.
 */

//  Import CSS.

import "./style.scss";
import "./editor.scss";
import edit from "./edit";
import save from "./save";
import attributes from "./attributes";
const { __ } = wp.i18n; // Import __() from wp.i18n
const { registerBlockType } = wp.blocks; // Import registerBlockType() from wp.blocks

registerBlockType("cgb/image", {
	title: __("KU Image"), // Block title.
	icon: "shield", // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
	category: "kubase-blocks", // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
	keywords: [__(" — CGB Block"), __("CGB Example"), __("create-guten-block")],
	supports: {
		align: ["wide", "full"]
	},
	attributes,
	edit,
	save
});
