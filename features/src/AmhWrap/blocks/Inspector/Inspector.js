const { InspectorControls } = wp.blockEditor;
const { RangeControl, PanelBody, ColorPicker, Panel, PanelRow } = wp.components;

export default function Inspector({ setAttributes, attributes }) {
	const { color, fontColor } = attributes;

	function parseRGB(color) {
		return `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`;
	}

	return (
		<InspectorControls>
			<h1>BackGround</h1>
			<ColorPicker
				color={color}
				onChangeComplete={value => {
					setAttributes({ color: parseRGB(value.rgb) });
				}}
			></ColorPicker>
			<h1>Font</h1>
			<ColorPicker
				color={fontColor}
				onChangeComplete={value => {
					setAttributes({ fontColor: parseRGB(value.rgb) });
				}}
			></ColorPicker>
		</InspectorControls>
	);
}
