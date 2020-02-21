import PicMedia from "./PicMedia";
import ButtonGroup from "../helper/ButtonGroup";
const { InspectorControls } = wp.blockEditor;
const { CheckboxControl, RangeControl, FocalPointPicker } = wp.components;

export default function InspectorC(props) {
	const { attributes, setAttributes } = props;
	const { showVideo, display, height, heightUnit } = attributes;

	return (
		<InspectorControls>
			<CheckboxControl
				label="ShowVideo"
				checked={showVideo}
				onChange={() =>
					setAttributes({
						showVideo: !showVideo
					})
				}
			/>
			<RangeControl
				label="Height"
				value={height}
				onChange={height => setAttributes({ height })}
				min={2}
				max={heightUnit === "vh" ? 100 : 1000}
			/>
			<ButtonGroup
				items={[
					{ value: "px", label: "Px" },
					{ value: "vh", label: "Vh" }
				]}
				activeItem={heightUnit}
				onChange={heightUnit => {
					setAttributes({
						heightUnit: heightUnit,
						height: heightUnit === "vh" && height > 100 ? 100 : height
					});
				}}
			></ButtonGroup>

			<ButtonGroup
				items={[
					{ value: "fixed", label: "Fixed" },
					{ value: "paralax", label: "Paralax" }
				]}
				activeItem={display}
				onChange={display => setAttributes({ display })}
			></ButtonGroup>

			<PicMedia {...props}></PicMedia>
		</InspectorControls>
	);
}
