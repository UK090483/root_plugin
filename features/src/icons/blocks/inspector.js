import apiCall from "./apiCalll";
import ButtonGroup from "./helper/ButtonGroup";
const { Component } = wp.element;

const { InspectorControls } = wp.blockEditor;
const {
	Button,
	CheckboxControl,
	PanelBody,
	PanelRow,
	PanelColor,
	RadioControl,
	RangeControl,
	TextControl,
	TextareaControl,
	ToggleControl,
	Toolbar,
	SelectControl
} = wp.components;

const { G, Path, SVG } = wp.components;
const { useEffect, useState } = wp.element;

/**
 * Create an Inspector Controls wrapper Component
 */
export default function Inspector({ attributes, setAttributes }) {
	const { size, margin, align } = attributes;
	const [icons, setIcons] = useState(null);
	useEffect(() => {
		apiCall().then(r => {
			setIcons(r);
		});
	}, []);

	function iconClick(index) {
		let nextIcons = [...attributes.icons];
		nextIcons.push(icons[index]);
		setAttributes({ icons: nextIcons });
	}

	function getIcons() {
		return icons.map((i, index) => {
			const paths = i.path.map(path => {
				return <Path d={path} />;
			});
			return (
				<SVG
					onClick={() => iconClick(index)}
					style={{ height: 30, width: 30 }}
					viewBox="0 0 24 24"
					xmlns="http://www.w3.org/2000/svg"
				>
					<G>{paths}</G>
				</SVG>
			);
		});
	}

	function setValue(name, value) {
		setAttributes({ [name]: value });
	}

	return (
		<InspectorControls>
			<div className={"ku_icon_prev"}>{icons && getIcons()}</div>

			<RangeControl
				label={"size"}
				value={size}
				onChange={value => setValue("size", value)}
				min={10}
				max={100}
			></RangeControl>
			<RangeControl
				label={"margin"}
				value={margin}
				onChange={value => setValue("margin", value)}
				min={10}
				max={100}
			></RangeControl>

			<ButtonGroup
				items={[
					{ value: "flex-start", label: "Left" },
					{ value: "center", label: "Center" },
					{ value: "flex-end", label: "Right" }
				]}
				activeItem={align}
				onChange={value => setValue("align", value)}
			></ButtonGroup>
		</InspectorControls>
	);
}
