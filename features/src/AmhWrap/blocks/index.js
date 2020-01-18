import "./style.scss";
import "./editor.scss";
import edit from "./edit/edit";
import save from "./save";

const { registerBlockType } = wp.blocks;

registerBlockType("amh/amh-wrap", {
	title: "Amh Wrap",
	icon: "editor-insertmore",
	category: "kubase-blocks",
	attributes: {
		mainBlock: {
			type: "string",
			default: "header"
		},
		color: {
			type: "string",
			default: "rgb(128, 128, 128)"
		},
		fontColor: {
			type: "string",
			default: "rgb(255, 255, 255)"
		}
	},
	edit,
	save
});
