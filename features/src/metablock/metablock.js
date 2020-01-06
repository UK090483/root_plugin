const { registerBlockType } = wp.blocks;
const { TextControl, DateTimePicker, BaseControl, TabPanel } = wp.components;

registerBlockType("cgb/meta-block", {
	title: "Meta Block",
	icon: "smiley",
	category: "kubase-blocks",

	attributes: {
		date: {
			type: "string",
			source: "meta",
			meta: "ku_date"
		},
		endDate: {
			type: "string",
			source: "meta",
			meta: "ku_end_date",
			default: "null/null"
		},
		open: {
			type: "string",
			default: "no"
		}
	},

	edit({ className, setAttributes, attributes }) {
		return <div className={className}></div>;
	},

	save() {
		<div className={className}></div>;
	}
});
