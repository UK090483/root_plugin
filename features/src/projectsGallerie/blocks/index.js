import "./style.scss";
import "./editor.scss";

import save from "./save/index.js";
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
