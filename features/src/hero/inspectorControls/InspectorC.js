import PicMedia from "./PicMedia";
const { InspectorControls } = wp.blockEditor;
const { CheckboxControl } = wp.components;

export default function InspectorC({ attributes, setAttributes }) {
	const { showVideo } = attributes;

	function handleCheckbox() {
		setAttributes({
			showVideo: !showVideo
		});
	}
	return (
		<InspectorControls>
			<CheckboxControl
				label="ShowVideo"
				checked={showVideo}
				onChange={handleCheckbox}
			/>
			<PicMedia
				attributes={attributes}
				setAttributes={setAttributes}
			></PicMedia>
		</InspectorControls>
	);
}
