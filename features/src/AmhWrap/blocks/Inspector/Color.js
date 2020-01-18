const { ColorPicker, PanelBody } = wp.components;
const { useState, useEffect } = wp.element;
import style from "../Helper/style";
import ButtonGroup from "./ButtonGroup";

const INIT_COLOR = "rgb(255, 255, 255)";

export default function Color({ attributes, setAttributes }) {
	const [bufferedColor, setBufferedColor] = useState(INIT_COLOR);
	useEffect(() => {
		if (color) {
			setBufferedColor(color);
		}
	}, []);

	const { color } = attributes;

	function setColor(color) {
		setAttributes({ color });
	}

	function getMode() {
		return color === "" ? "amh" : "custom";
	}

	function parseRGB(color) {
		return `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`;
	}

	return (
		<PanelBody title="Color" icon="welcome-widgets-menus" initialOpen={false}>
			<div style={style.row}>
				<ButtonGroup
					items={[
						{ value: "amh", label: "amh Color" },
						// { value: "inherit", label: "Inherit" },
						{ value: "custom", label: "Custom" }
					]}
					activeItem={getMode()}
					onChange={e => {
						e === "amh" ? setColor("") : setColor(bufferedColor);
					}}
				></ButtonGroup>
			</div>
			{getMode() === "custom" && (
				<ColorPicker
					color={bufferedColor}
					onChangeComplete={value => {
						let c = parseRGB(value.rgb);
						setBufferedColor(c);
						setColor(c);
					}}
				></ColorPicker>
			)}
		</PanelBody>
	);
}
