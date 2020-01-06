const { registerBlockType } = wp.blocks;
const { MediaPlaceholder } = wp.blockEditor;

import "./style.scss";
import "./editor.scss";

registerBlockType("cgb/fade-block", {
	title: "Fade Block",
	icon: "smiley",
	category: "kubase-blocks",

	attributes: {
		images: {
			type: "array",
			default: []
		}
	},

	edit({ setAttributes, attributes }) {
		const [state, setstate] = useState(0);

		function fire(params) {
			console.log(state);
			setstate(state + 1);
			setAttributes({ images: params });
			setTimeout(() => {
				setstate(0);
			}, 200);
		}

		return (
			<div>
				{attributes.images.length !== 0 && <h1>{attributes.images.length}</h1>}
				<MediaPlaceholder
					onSelect={function(el) {
						fire(el);
					}}
					allowedTypes={["image"]}
					multiple={true}
					labels={{ title: "The Image" }}
				></MediaPlaceholder>
			</div>
		);
	},

	// No information saved to the block
	// Data is saved to post meta via attributes
	save({ className, setAttributes, attributes }) {
		return <div className="fade-animate">bla</div>;
	}
});
