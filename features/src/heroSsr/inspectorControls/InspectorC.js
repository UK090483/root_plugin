import PicMedia from "./PicMedia";
const { InspectorControls } = wp.editor;
const { ToggleControl, BaseControl, TextControl } = wp.components;

export default function InspectorC({ attributes, setAttributes }) {
	const { auto } = attributes;
	return (
		<InspectorControls>
			<BaseControl label="Auto/Manuell">
				<ToggleControl
					checked={auto}
					onChange={() => {
						setAttributes({ auto: !auto });
					}}
				></ToggleControl>
			</BaseControl>
			<PicMedia
				attributes={attributes}
				setAttributes={setAttributes}
			></PicMedia>
		</InspectorControls>
	);
}
