import "./style.scss";
import "./editor.scss";
import Inspector from "./inspector";
const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const { RichText } = wp.editor;

const el = wp.element.createElement;
const iconEl = el(
	"svg",
	{ width: 128, height: 128, viewBox: "0 0 128 128" },
	el("rect", { x: 0, y: 0, width: 128, height: 128, stroke: "white" }),
	el("path", {
		d:
			"M41.7607 39.0615H52.8432V60.866L73.2637 39.0615H86.6547L66.1434 60.2237L87.5885 88.9388H74.2753L58.66 67.706L52.8432 73.6982V88.9388H41.7607V39.0615Z",
		fill: "white"
	})
);

registerBlockType("klarity/klarity-read-more-block", {
	title: __("Read more"),
	icon: iconEl,
	category: "kubase-blocks",
	attributes: {
		introBlock: {
			type: "string",
			default: ""
		},
		contentBlock: {
			type: "string",
			default: ""
		},
		textAlignment: {
			type: "string",
			default: "left"
		},
		showMore: {
			type: "string",
			default: "Show more"
		},
		showLess: {
			type: "string",
			default: "Show less"
		},
		buttonAlign: {
			type: "string",
			default: "center"
		}
	},
	edit(props) {
		const { attributes, className, setAttributes } = props;

		return (
			<div>
				<Inspector {...props}></Inspector>

				<p>This text will always be visible</p>
				<div class="text-input">
					<RichText
						id="introBlock"
						placeholder="Thi text will always be visible"
						value={attributes.introBlock}
						onChange={content => setAttributes({ introBlock: content })}
					/>
				</div>
				<p>This will be hidden behind the read more section</p>
				<div class="text-input">
					<RichText
						id="contentBlock"
						placeholder="Thi will be hidden behind the read more section"
						value={attributes.contentBlock}
						onChange={content => setAttributes({ contentBlock: content })}
					/>
				</div>
			</div>
		);
	},

	save: props => {
		const { attributes } = props;
		const { showMore, showLess, buttonAlign } = attributes;
		return (
			<div class="text-center">
				<div
					className={`read-more-wrap text-${props.attributes.textAlignment}`}
				>
					<RichText.Content tagName="p" value={props.attributes.introBlock} />

					<div className={"read-more-target collapsed"}>
						<RichText.Content
							tagName="p"
							value={props.attributes.contentBlock}
						/>
					</div>
				</div>
				<div
					className={"ku_base_show_more_button"}
					style={{ justifyContent: buttonAlign }}
				>
					<button
						className={"read-more-trigger"}
						data-more={showMore}
						data-less={showLess}
					>
						{showMore}
					</button>
				</div>
			</div>
		);
	}
});
