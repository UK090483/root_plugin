/**
 * BLOCK: my-block
 *
 * Registering a basic block with Gutenberg.
 * Simple block, renders and saves the same content without any interactivity.
 */

//  Import CSS.
import "./style.scss";
import "./editor.scss";
import InspectorC from "./inspectorControls/InspectorC";

// import CoverEdit from "./edit.js";

const { __ } = wp.i18n; // Import __() from wp.i18n
const { registerBlockType } = wp.blocks; // Import registerBlockType() from wp.blocks
const { withSelect } = wp.data;

const { MediaPlaceholder, InnerBlocks } = wp.blockEditor;
const { ServerSideRender } = wp.components;

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
registerBlockType("cgb/hero", {
	// Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
	title: __("HERO"), // Block title.
	icon: "shield", // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
	category: "kubase-blocks", // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
	keywords: [__(" — CGB Block"), __("CGB Example"), __("create-guten-block")],
	supports: {
		align: ["wide", "full"]
	},
	attributes: {
		imageSrcSet: {
			type: "string",
			source: "attribute",
			selector: "img",
			attribute: "srcset"
		},
		imageSrc: {
			type: "string",
			source: "attribute",
			selector: "img",
			attribute: "src"
		},
		videoUrl: {
			type: "string",
			source: "attribute",
			selector: "video",
			attribute: "src"
		},
		showVideo: {
			type: "boolean",
			default: false
		}
	},

	edit: function(props) {
		const { attributes } = props;
		const { imageSrc, videoUrl, showVideo } = attributes;

		return (
			<div>
				<InspectorC {...props}></InspectorC>

				<div className={"hero-wrap"}>
					{imageSrc && (
						<div
							className={"hero-image"}
							style={{
								backgroundImage: `url(${imageSrc})`
							}}
						></div>
					)}
					{videoUrl && showVideo && (
						<video
							autoPlay
							muted
							playsinline
							loop
							className={"hero-image"}
							src={videoUrl}
						></video>
					)}
					<div className={"hero_innerblock"}>
						<InnerBlocks />
					</div>
				</div>
			</div>
		);
	},

	save: function({ attributes }) {
		const { imageSrcSet, imageSrc, videoUrl, showVideo } = attributes;

		return (
			<div className="hero-wrap">
				<div className="hero-paralax-wrap">
					<img class="hero-image" src={imageSrc} srcSet={imageSrcSet} />
					{videoUrl && showVideo && (
						<video
							autoPlay
							muted
							playsinline
							loop
							className={"hero-image hero-image-video"}
							src={videoUrl}
						></video>
					)}
				</div>
				<div class="hero_innerblock">
					<InnerBlocks.Content />
				</div>
			</div>
		);
	}
});
