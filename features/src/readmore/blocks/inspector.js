import ButtonGroup from "./ButtonGroup";
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
const { useState } = wp.element;

/**
 * Create an Inspector Controls wrapper Component
 */
export default function Inspector(props) {
	const { attributes, setAttributes } = props;
	const { showLess, showMore, buttonAlign, textAlignment } = attributes;
	console.log(textAlignment);
	return (
		<InspectorControls>
			<PanelBody>
				<TextControl
					label={"ShowMore Text"}
					value={showMore}
					onChange={showMore => setAttributes({ showMore })}
				/>
			</PanelBody>
			<PanelBody>
				<TextControl
					label={"ShowLess Text"}
					value={showLess}
					onChange={showLess => setAttributes({ showLess })}
				/>
			</PanelBody>
			<h5>{"Button Align"}</h5>
			<ButtonGroup
				items={[
					{ value: "flex-start", label: "Left" },
					{ value: "center", label: "Center" },
					{ value: "flex-end", label: "Right" }
				]}
				activeItem={buttonAlign}
				onChange={buttonAlign => setAttributes({ buttonAlign })}
			></ButtonGroup>
			<h5>{"Text Align"}</h5>
			<ButtonGroup
				items={[
					{ value: "left", label: "Left" },
					{ value: "center", label: "Center" },
					{ value: "right", label: "Right" }
				]}
				activeItem={textAlignment}
				onChange={textAlignment => setAttributes({ textAlignment })}
			></ButtonGroup>
		</InspectorControls>
	);
}
