import "./style.scss";
import "./editor.scss";

import save from "./save/index.js";
import edit from "./edit";

const { registerBlockType } = wp.blocks;

registerBlockType("kubase/grid-gallery", {
	title: "Grid gallery",
	icon: "images-alt2",
	category: "kubase-blocks",
	supports: {
		align: ["wide", "full"]
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
			default: { value: 0, unit: "px" }
		},
		gridHeight: {
			type: "object",
			default: { value: 0, unit: "px" }
		},
		collumns: {
			type: "object",
			default: { value: 4, unit: "px" }
		}
	},

	edit,
	save
});
