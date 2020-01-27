import "./style.scss";
import "./editor.scss";

import save from "./save/index";
import edit from "./edit";

const { registerBlockType } = wp.blocks;

registerBlockType("kubase/projects-gallery", {
	title: "Project gallery",
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
		rows: {
			type: "string",
			default: "[{}]"
		},
		columns: {
			type: "number",
			default: 4
		},
		ratio: {
			type: "number",
			default: 100
		},
		gap: {
			type: "number",
			default: 20
		},

		sort: {
			type: "string",
			default: ">"
		},
		sortItem: {
			type: "string",
			default: "fileName"
		},
		Id: {
			type: "number",
			default: 0
		}
	},

	edit,
	save
});
