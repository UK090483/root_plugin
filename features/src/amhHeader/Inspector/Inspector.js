import ButtonGroup from "./ButtonGroup";
import Color from "./Color";
import presets from "../Helper/presets";
import style from "../Helper/style";
const { InspectorControls } = wp.blockEditor;
const { RangeControl, PanelBody, PanelRow } = wp.components;

export default function Inspector({
	setScreen,
	screen,
	setAttributes,
	attributes
}) {
	const {
		fontSize,
		textAlign,
		marginTop,
		marginBottom,
		fontWeight,
		lineHeight
	} = attributes;

	function setValue(params, name) {
		let newValues = { ...attributes[name] };
		newValues[screen] = params;
		setAttributes({ [name]: newValues });
	}

	function setPreset(a) {
		let newAttributes = { ...attributes };
		newAttributes.fontSize[screen] = presets[a].fontSize;
		newAttributes.fontWeight[screen] = presets[a].fontWeight;
		newAttributes.marginTop[screen] = presets[a].margin;
		newAttributes.marginBottom[screen] = presets[a].margin;

		setValue(presets[a].fontSize, "fontSize");
		setValue(presets[a].fontWeight, "fontWeight");
		setValue(presets[a].margin, "marginTop");
		setValue(presets[a].margin, "marginBottom");
		setValue(presets[a].lineHeight, "lineHeight");
	}

	return (
		<InspectorControls>
			<PanelBody title=" Settings" initialOpen={true}>
				<div
					style={{
						...style.center,
						borderBottom: " #10a1ea79 solid 4px",
						height: 60
					}}
				>
					<ButtonGroup
						items={[
							{ value: "desktop", label: "Desktop" },
							{ value: "tablet", label: "Tablet" },
							{ value: "mobile", label: "Mobile" }
						]}
						activeItem={screen}
						onChange={e => setScreen(e)}
					></ButtonGroup>
				</div>

				<PanelRow className={"amhHeader-inspector-row"}>
					<ButtonGroup
						items={[
							{ value: "left", icon: "editor-alignleft" },
							{ value: "center", icon: "editor-aligncenter" },
							{ value: "right", icon: "editor-alignright" }
						]}
						activeItem={textAlign[screen]}
						onChange={e => setValue(e, "textAlign")}
					></ButtonGroup>
				</PanelRow>
				<PanelRow className={"amhHeader-inspector-row"}>
					<ButtonGroup
						items={[
							{ value: "p", label: "p" },
							{ value: "h1", label: "h1" },
							{ value: "h2", label: "h2" },
							{ value: "h3", label: "h3" },
							{ value: "h4", label: "h4" },
							{ value: "h5", label: "h5" },
							{ value: "h6", label: "h6" }
						]}
						activeItem={"0"}
						onChange={e => setPreset(e)}
					></ButtonGroup>
				</PanelRow>
				<RangeControl
					label="Font-Size"
					value={fontSize[screen] * 100}
					onChange={size => setValue(size / 100, "fontSize")}
					min={50}
					max={800}
				></RangeControl>
				<div style={style.row}>
					<ButtonGroup
						items={[
							{ value: 200, label: "Normal" },
							{ value: 800, label: "Bold" }
						]}
						activeItem={fontWeight[screen]}
						onChange={e => setValue(e, "fontWeight")}
					></ButtonGroup>
				</div>
				<RangeControl
					label="Line Height"
					value={lineHeight[screen] * 100}
					onChange={size => setValue(size / 100, "lineHeight")}
					min={10}
					max={400}
				></RangeControl>

				<RangeControl
					label="Margin-Top"
					value={marginTop[screen] * 100}
					onChange={size => setValue(size / 100, "marginTop")}
					min={0}
					max={800}
				></RangeControl>
				<RangeControl
					label="Margin-Bottom"
					value={marginBottom[screen] * 100}
					onChange={size => setValue(size / 100, "marginBottom")}
					min={0}
					max={800}
				></RangeControl>
				<Color setAttributes={setAttributes} attributes={attributes}></Color>
			</PanelBody>
		</InspectorControls>
	);
}
