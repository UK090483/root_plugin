import "./style.scss";
import "./editor.scss";
import edit from "./edit";
import save from "./save";
const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const { RichText } = wp.editor;
const textAlignments = ["left", "center", "right"];

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

registerBlockType("amh/amh-read-more-block", {
	title: __("Amh Read more"),
	icon: iconEl,
	category: "kubase-blocks",
	attributes: {
		mainBlock: {
			type: "string",
			default: ""
		},
		Id: {
			type: "number",
			default: 0
		},

		subBlocks: {
			type: "array",
			default: [
				{
					label: "CDU",
					short: "ja",
					content:
						"CDU Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et"
				},
				{
					label: "FDP",
					short: "nein",
					content:
						"FDP Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et"
				},
				{
					label: "Grüne",
					short: "unklar",
					content:
						"GRÜNE Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et"
				},
				{
					label: "Linke",
					short: "ja",
					content:
						"LINKE Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et"
				}
			]
		},
		textAlignment: {
			type: "string",
			default: textAlignments[0]
		}
	},
	edit,
	save
});
