import PicMedia from "./PicMedia";
import ButtonGroup from "../helper/ButtonGroup";
const { InspectorControls } = wp.blockEditor;
const {
	CheckboxControl,
	RangeControl,
	FocalPointPicker,
	PanelBody
} = wp.components;

export default function InspectorC(props) {
	const { attributes, setAttributes } = props;
	const {
		showVideo,
		display,
		height,
		heightUnit,
		width,
		widthUnit,
		marginTop,
		marginBottom,
		marginLeft,
		marginRight,
		backgroundSize
	} = attributes;

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
					{ value: "%", label: "%" },
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
			<RangeControl
				label="Width"
				value={width}
				onChange={width => setAttributes({ width })}
				min={2}
				max={100}
			/>
			<ButtonGroup
				items={[
					{ value: "px", label: "Px" },
					{ value: "vw", label: "Vw" },
					{ value: "%", label: "%" }
				]}
				activeItem={widthUnit}
				onChange={widthUnit => {
					setAttributes({
						widthUnit: widthUnit,
						width: widthUnit === "vh" && width > 100 ? 100 : width
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
			<ButtonGroup
				items={[
					{ value: "cover", label: "Cover" },
					{ value: "contain", label: "Contain" }
				]}
				activeItem={backgroundSize}
				onChange={backgroundSize => setAttributes({ backgroundSize })}
			></ButtonGroup>
			<PanelBody title={"Margin"} initialOpen={false}>
				<RangeControl
					label="Top"
					value={marginTop}
					onChange={marginTop => setAttributes({ marginTop })}
					min={0}
					max={100}
				/>
				<RangeControl
					label="Bottom"
					value={marginBottom}
					onChange={marginBottom => setAttributes({ marginBottom })}
					min={0}
					max={100}
				/>
				<RangeControl
					label="Left"
					value={marginLeft}
					onChange={marginLeft => setAttributes({ marginLeft })}
					min={0}
					max={100}
				/>
				<RangeControl
					label="Right"
					value={marginRight}
					onChange={marginRight => setAttributes({ marginRight })}
					min={0}
					max={100}
				/>
			</PanelBody>

			<PicMedia {...props}></PicMedia>
		</InspectorControls>
	);
}
