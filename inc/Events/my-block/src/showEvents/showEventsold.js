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
	// Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
	title: __("Events"), // Block title.
	category: "event-blocks", // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.

	attributes: {},

	edit: function() {
		wp.hooks.doAction("bla");
		// const [ events, setEvents ] = useState( [] );
		// useEffect( () => {
		// 	apiFetch( {
		// 		path: '/wp/v2/events',
		// 	} ).then( _events => {
		// 		setEvents( _events );
		// 	} );
		// }, [] );

		// const getEvents = () => {
		// 	return events.map( ( { id, title, meta } ) => {
		// 		const EventdateDate = parseDate(
		// 			meta.kubase_event_start_date,
		// 			meta.kubase_event_end_date
		// 		);
		// 		return (
		// 			<div key={ id } className={ 'ku_event_wrap' }>
		// 				{ meta.kubase_event_mediaUrl && (
		// 					<img
		// 						style={ { width: 100, height: 100 } }
		// 						src={ meta.kubase_event_mediaUrl }
		// 						alt={ 'non' }
		// 					></img>
		// 				) }
		// 				<div className={ 'ku_events_info' }>
		// 					<div className={ 'ku_events_info_title' }>{ title.rendered }</div>
		// 					<div className={ 'ku_events_info_date' }>{ EventdateDate }</div>
		// 				</div>
		// 			</div>
		// 		);
		// 	} );
		// };

		return <ServerSideRender block="kuevents/events" />;
	},

	save: function() {
		return null;
	}
});

function parseDate(startDate, endDate) {
	if (!startDate) {
		return "TBA";
	}
	const _sD = new Date(startDate);

	const day = _sD.getDate();
	const month = _sD.getMonth() + 1;
	const year = _sD
		.getFullYear()
		.toString()
		.slice(2, 4);
	const time = _sD.getHours() + ":" + _sD.getMinutes();

	if (!endDate) {
		return day + "." + month + "." + year + " " + time;
	}
}
