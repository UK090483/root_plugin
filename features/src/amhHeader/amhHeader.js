/**
 * BLOCK: my-block
 *
 * Registering a basic block with Gutenberg.
 * Simple block, renders and saves the same content without any interactivity.
 */

//  Import CSS.
import Inspector from "./Inspector/Inspector";
import "./style.scss";
import "./editor.scss";
import presets from "./Helper/presets";
import save from "./save";
import edit from "./edit";
import transforms from "./transforms";

// import CoverEdit from "./edit.js";

const { __ } = wp.i18n; // Import __() from wp.i18n
const { registerBlockType } = wp.blocks; // Import registerBlockType() from wp.blocks

const { RichText } = wp.blockEditor;
/**
 * Register: aa Gutenberg Block.
 *
 * Registers a new block provided a unique name and an object defining its
 * behavior. Once registered, the block is made editor as an option to any
 * editor interface where blocks are implemented.
 *
 * @link https://wordpress.org/gutenberg/handbook/block-api/
 * @param  {string}   name     Block name.
 * @param  {Object}   settings Block settings.
 * @return {?WPBlock}          The block, if it has been successfully
 *                             registered; otherwise `undefined`.
 */
registerBlockType("cgb/amh-header", {
	// Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
	title: "AMH Header", // Block title.
	icon: "shield", // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
	category: "kubase-blocks", // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.

	attributes: {
		content: {
			type: "string"
		},
		fontSize: {
			type: "object",
			default: {
				mobile: presets.h1.fontSize,
				tablet: presets.h1.fontSize,
				desktop: presets.h1.fontSize
			}
		},
		textAlign: {
			type: "object",
			default: { mobile: "left", tablet: "left", desktop: "left" }
		},
		marginTop: {
			type: "object",
			default: {
				mobile: presets.h1.margin,
				tablet: presets.h1.margin,
				desktop: presets.h1.margin
			}
		},
		marginBottom: {
			type: "object",
			default: {
				mobile: presets.h1.margin,
				tablet: presets.h1.margin,
				desktop: presets.h1.margin
			}
		},
		fontWeight: {
			type: "object",
			default: {
				mobile: presets.h1.fontWeight,
				tablet: presets.h1.fontWeight,
				desktop: presets.h1.fontWeight
			}
		},
		lineHeight: {
			type: "object",
			default: {
				mobile: presets.h1.lineHeight,
				tablet: presets.h1.lineHeight,
				desktop: presets.h1.lineHeight
			}
		},
		color: {
			type: "string",
			default: ""
		},
		Id: {
			type: "number",
			default: 0
		}
	},
	transforms,
	edit,
	save
});
