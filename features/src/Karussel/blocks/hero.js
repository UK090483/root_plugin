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
const { __ } = wp.i18n; // Import __() from wp.i18n
const { registerBlockType } = wp.blocks; // Import registerBlockType() from wp.blocks

registerBlockType("cgb/karussell", {
	title: __("karussell"), // Block title.
	icon: "shield", // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
	category: "kubase-blocks", // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
	keywords: [__(" — CGB Block"), __("CGB Example"), __("create-guten-block")],
	supports: {
		align: ["wide", "full"]
	},
	attributes: {
		images: {
			type: "array",
			default: []
		},
		imageSrcSet: {
			type: "string",
			default: null
		},
		imageSrc: {
			type: "array",
			default: []
		},
		focalPoint: {
			type: "object",
			default: {
				x: 0.5,
				y: 0.5
			}
		},
		videoUrl: {
			type: "string",
			default: null
		},
		showVideo: {
			type: "boolean",
			default: false
		},
		display: {
			type: "string",
			default: "paralax"
		},
		height: {
			type: "number",
			default: 100
		},
		heightUnit: {
			type: "string",
			default: "vh"
		}
	},

	edit,
	save
});
