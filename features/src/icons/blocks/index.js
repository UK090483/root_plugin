/**
 * Block dependencies
 */

import "./style.scss";
import "./editor.scss";
import edit from "./edit";
import save from "./save";

import apiCall from "./apiCalll";

const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;

export default registerBlockType("webfactory/icons", {
	title: "icons",
	description: "Simple yet powerfull Mailchimp subscribe form.",
	category: "kubase-blocks",
	icon: "email-alt",
	keywords: ["icons"],
	attributes: {
		icons: {
			type: "array",
			default: []
		},
		size: {
			type: "number",
			default: 30
		},
		margin: {
			type: "number",
			default: 30
		},
		align: {
			type: "string",
			default: "flex-start"
		}
	},
	edit,
	save
});
