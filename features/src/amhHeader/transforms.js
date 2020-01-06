/**
 * WordPress dependencies
 */
import { createBlock } from "@wordpress/blocks";

const name = "cgb/amh-header";

const transforms = {
	from: [
		{
			type: "block",
			blocks: ["core/paragraph", "core/heading"],
			transform: ({ content }) => {
				return createBlock(name, {
					content
				});
			}
		}
	],
	to: [
		{
			type: "block",
			blocks: ["core/paragraph"],
			transform: ({ content }) => {
				return createBlock("core/paragraph", {
					content
				});
			}
		},
		{
			type: "block",
			blocks: ["core/heading"],
			transform: ({ content }) => {
				return createBlock("core/heading", {
					content
				});
			}
		}
	]
};

export default transforms;
