import "./style.scss";
import "./editor.scss";

import save from "./save/save.js";
import edit from "./edit/edit";
import attributes from "./attributes";

const { registerBlockType } = wp.blocks;

registerBlockType("kubase/free-grid-nogrid", {
	title: "Free Grid noGrid",
	icon: "images-alt2",
	category: "kubase-blocks",
	supports: {
		align: ["wide", "full", "center"]
	},

	attributes,
	edit,
	save
});
