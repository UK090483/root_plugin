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
const { MediaUpload, RichText } = wp.blockEditor;
const {
	ToggleControl,
	DateTimePicker,
	Button,
	BaseControl,
	DatePicker,
	TimePicker
} = wp.components;

import "./editor.scss";

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
registerBlockType("kuevents/events-date", {
	// Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
	title: __("eventsUI"), // Block title.
	category: "event-blocks", // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
	supports: {
		inserter: false,
		reusable: false,
		html: false
	},

	attributes: {
		startDate: {
			type: "string",
			source: "meta",
			meta: "kubase_event_start_date"
		},
		endDate: {
			type: "string",
			source: "meta",
			meta: "kubase_event_end_date"
		}
	},

	edit: function(props) {
		const { setAttributes } = props;
		const { startDate, endDate } = props.attributes;

		return (
			<div className={"wrap"}>
				<div className={"date"}>
					<DatePicker
						currentDate={startDate}
						onChange={startDate => {
							setAttributes({ startDate });
						}}
					></DatePicker>
					<TimePicker
						currentDate={startDate}
						onChange={startDate => {
							setAttributes({ startDate });
						}}
					></TimePicker>
				</div>
				<ToggleControl
					label={"end Date"}
					checked={endDate !== ""}
					onChange={e => {
						if (e) {
							setAttributes({ endDate: startDate });
						} else {
							setAttributes({ endDate: "" });
						}
					}}
				></ToggleControl>

				{endDate !== "" && (
					<div className={"date"}>
						<DatePicker
							currentDate={endDate}
							onChange={endDate => {
								setAttributes({ endDate });
							}}
						></DatePicker>
						<TimePicker
							currentDate={endDate}
							onChange={endDate => {
								setAttributes({ endDate });
							}}
						></TimePicker>
					</div>
				)}
			</div>
		);
	},

	save: function() {
		return false;
	}
});
