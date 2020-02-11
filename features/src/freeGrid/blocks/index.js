import "./style.scss";
import "./editor.scss";

import save from "./save/save.js";
import edit from "./edit";
import attributes from "./attributes";

const { registerBlockType } = wp.blocks;

registerBlockType("kubase/free-grid", {
	title: "Free Grid",
	icon: "images-alt2",
	category: "kubase-blocks",
	supports: {
		align: ["wide", "full", "center"]
	},

	attributes,
	edit,
	save
});
