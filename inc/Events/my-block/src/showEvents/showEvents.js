/**
 * BLOCK: my-block
 *
 * Registering a basic block with Gutenberg.
 * Simple block, renders and saves the same content without any interactivity.
 */

//  Import CSS.
// import "./style.scss";
// import "./editor.scss";

// import CoverEdit from "./edit.js";

const { __ } = wp.i18n; // Import __() from wp.i18n
const { registerBlockType } = wp.blocks; // Import registerBlockType() from wp.blocks
const { ServerSideRender } = wp.components;
import "./editor.scss";
import "./style.scss";
import Inspector from "./inspector/inspector";

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

registerBlockType("kuevents/events", {
	title: __("Events"),
	category: "event-blocks",
	attributes: {
		showNext: {
			type: "boolean",
			default: true
		},
		showNextquantity: {
			type: "number",
			default: -1
		},
		showOld: {
			type: "boolean",
			default: true
		},
		showOldquantity: {
			type: "number",
			default: -1
		}
	},

	edit: function(props) {
		return (
			<div>
				<Inspector
					atttributes={props.attributes}
					setAttributes={props.setAttributes}
				></Inspector>
				<ServerSideRender
					block="kuevents/events"
					attributes={{ ...props.attributes }}
				/>
			</div>
		);
	},

	save: function() {
		return null;
	}
});
