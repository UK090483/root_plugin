import "./style.scss";
import "./editor.scss";

import save from "./save/save.js";
import edit from "./edit";

const { registerBlockType } = wp.blocks;

registerBlockType("kubase/grid-gallery", {
	title: "Grid gallery",
	icon: "images-alt2",
	category: "kubase-blocks",
	supports: {
		align: ["wide", "full", "center"]
	},

	attributes: {
		images: {
			type: "array",
			default: []
		},
		Id: {
			type: "number",
			default: 0
		},
		borderRadius: {
			type: "object",
			default: { value: 0, unit: "%" }
		},
		gridHeight: {
			type: "number",
			default: 100
		},
		containerHeight: {
			type: "number",
			default: 100
		},
		gap: {
			type: "number",
			default: 20
		},
		collumns: {
			type: "object",
			default: { value: 4, unit: "px" }
		},
		positions: {
			type: "string",
			default: "[]"
		},
		ratio: {
			type: "number",
			default: 100
		},
		marginTop: {
			type: "number",
			default: 0
		},
		marginBottom: {
			type: "number",
			default: 0
		}
	},

	edit,
	save
});
