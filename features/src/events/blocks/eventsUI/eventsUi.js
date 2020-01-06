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
const { TextControl, DateTimePicker, Button, BaseControl } = wp.components;
const { withState } = wp.compose;

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
registerBlockType("kuevents/events-ui", {
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
		},

		venue: {
			type: "string",
			source: "meta",
			meta: "kubase_event_venue"
		},
		city: {
			type: "string",
			source: "meta",
			meta: "kubase_event_city"
		},
		link: {
			type: "string",
			source: "meta",
			meta: "kubase_event_link"
		},
		mediaId: {
			type: "number",
			source: "meta",
			meta: "kubase_event_mediaId"
		},
		mediaUrl: {
			type: "string",
			source: "meta",
			meta: "kubase_event_mediaUrl"
		}
	},

	edit: function(props) {
		const { setAttributes } = props;
		const { city, link, venue } = props.attributes;

		return (
			<div className={"wrap"}>
				<TextControl
					label="venue"
					value={venue}
					onChange={venue => {
						setAttributes({ venue });
					}}
				></TextControl>

				<TextControl
					label="city"
					value={city}
					onChange={city => {
						setAttributes({ city });
					}}
				></TextControl>

				<TextControl
					label="link"
					value={link}
					onChange={link => {
						setAttributes({ link });
					}}
				></TextControl>
				{/* <BaseControl label="description">
					<DateTimePicker
						label="StartTime"
						currentDate={ startDate }
						onChange={ startDate => {
							setAttributes( { startDate } );
						} }
					></DateTimePicker>
				</BaseControl>
				<DateTimePicker
					label="StartTime"
					currentDate={ endDate }
					onChange={ endDate => {
						setAttributes( { endDate } );
					} }
				></DateTimePicker>
				{ mediaUrl && (
					<img alt={ 'bla' } src={ mediaUrl } style={ { width: '200px' } }></img>
				) }
				<MediaUpload
					title={ __( 'Select Image' ) }
					onSelect={ ImageObject => {
						setAttributes( {
							mediaUrl: ImageObject.url,
						} );
						setAttributes( {
							mediaId: ImageObject.id,
						} );
					} }
					allowedTypes={ [ 'image' ] }
					value={ mediaId }
					render={ ( { open } ) => (
						<Button isDefault onClick={ open }>
							{ ! mediaId ? __( 'Select Image' ) : __( 'Replace image' ) }
						</Button>
					) }
				/> */}
			</div>
		);
	},

	save: function() {
		return false;
	}
});
