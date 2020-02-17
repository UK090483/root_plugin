import PicMedia from "./PicMedia";
import ButtonGroup from "../helper/ButtonGroup";
import ResponsiveTabs from "../../../shared/ResponsiveTabs";
const { InspectorControls } = wp.blockEditor;
const {
	CheckboxControl,
	RangeControl,
	FocalPointPicker,
	PanelBody,
	ColorPicker
} = wp.components;

export default function InspectorC(props) {
	const { attributes, setAttributes, device, setDevice } = props;
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
		backgroundSize,
		backgroundColor,
		spaceAround,
		ratio
	} = attributes;

	return (
		<InspectorControls>
			<ResponsiveTabs value={device} onSelect={setDevice}></ResponsiveTabs>
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
				label="ratio zähler"
				value={ratio[0]}
				onChange={value => {
					let _ratio = [...ratio];
					_ratio[0] = value;
					setAttributes({ ratio: _ratio });
				}}
				min={1}
				max={1000}
			/>

			<RangeControl
				label="ratio nenner"
				value={ratio[1]}
				onChange={value => {
					let _ratio = [...ratio];
					_ratio[1] = value;
					setAttributes({ ratio: _ratio });
				}}
				min={1}
				max={1000}
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
			<PanelBody title={"BackgroundColor"} initialOpen={false}>
				<ColorPicker
					color={backgroundColor}
					onChangeComplete={backgroundColor =>
						setAttributes({ backgroundColor: backgroundColor.hex })
					}
				/>
			</PanelBody>

			<PanelBody title={"Spacing"} initialOpen={false}>
				<RangeControl
					label="space Around Image"
					value={spaceAround}
					onChange={spaceAround => setAttributes({ spaceAround })}
					min={o}
					max={100}
				/>
			</PanelBody>

			<PicMedia {...props}></PicMedia>
		</InspectorControls>
	);
}
