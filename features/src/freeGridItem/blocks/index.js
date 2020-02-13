import "./style.scss";
import "./editor.scss";

import save from "./save/save.js";
import edit from "./edit/edit";
import attributes from "./attributes";

const { registerBlockType } = wp.blocks;

registerBlockType("kubase/free-grid-item", {
	title: "free Grid Item",
	icon: "images-alt2",
	category: "kubase-blocks",

	attributes,
	parent: ["kubase/free-grid"],
	supports: {
		inserter: false,
		reusable: false,
		html: false
	},

	getEditWrapperProps(attributes) {
		const { device, backgtroundImage } = attributes;

		return {
			style: {
				// border: attributes.isActive ? "red dotted 1px" : "grey dotted 1px",
				width: "100%",
				gridColumnStart: attributes[`gridColumnStart${device}`],
				gridColumnEnd: "span " + attributes[`gridColumnEnd${device}`],
				gridRowStart: attributes[`gridRowStart${device}`],
				gridRowEnd: "span " + attributes[`gridRowEnd${device}`]
			}
		};
	},

	edit,
	save
});
