const { InspectorControls } = wp.blockEditor;
const { TextControl, Button, RangeControl, CheckboxControl } = wp.components;
import PicMedia from "./PicMedia";
import AnimationPanel from "./AnimationPanel";

import style from "../helper/style";

export default function Inspector(props) {
	const { setAttributes, attributes, device } = props;
	const { autoHeight, overlay, overlayText } = attributes;

	function handleClick(dir) {
		if (dir === "up") {
			let newValue = attributes[`gridRowStart${device}`] - 1;
			newValue < 1 && (newValue = 1);

			setAttributes({ [`gridRowStart${device}`]: newValue });
		}
		if (dir === "down") {
			let newValue = attributes[`gridRowStart${device}`] + 1;
			setAttributes({ [`gridRowStart${device}`]: newValue });
		}
		if (dir === "left") {
			let newValue = attributes[`gridColumnStart${device}`] - 1;
			newValue < 1 && (newValue = 1);
			setAttributes({ [`gridColumnStart${device}`]: newValue });
		}
		if (dir === "right") {
			let newValue = attributes[`gridColumnStart${device}`] + 1;
			setAttributes({ [`gridColumnStart${device}`]: newValue });
		}
		if (dir === "weiter") {
			let newValue = attributes[`gridColumnEnd${device}`] + 1;

			setAttributes({ [`gridColumnEnd${device}`]: newValue });
		}
		if (dir === "schmaler") {
			let newValue = attributes[`gridColumnEnd${device}`] - 1;
			newValue < 1 && (newValue = 1);
			setAttributes({ [`gridColumnEnd${device}`]: newValue });
		}
		if (dir === "höher") {
			let newValue = attributes[`gridRowEnd${device}`] + 1;
			setAttributes({ [`gridRowEnd${device}`]: newValue });
		}
		if (dir === "niedriger") {
			let newValue = attributes[`gridRowEnd${device}`] - 1;
			newValue < 1 && (newValue = 1);
			setAttributes({ [`gridRowEnd${device}`]: newValue });
		}
	}
	return (
		<InspectorControls>
			<h1>{device}</h1>
			<div className={style.row}>
				{/* <TextControl
					label={"gridColumnStart"}
					value={attributes[`gridColumnStart${device}`]}
					onChange={value => {
						setAttributes({ [`gridColumnStart${device}`]: value });
					}}
				></TextControl>
				<TextControl
					label={"gridColumnEnd"}
					value={attributes[`gridColumnEnd${device}`]}
					onChange={value => {
						setAttributes({ [`gridColumnEnd${device}`]: value });
					}}
				></TextControl>
				<TextControl
					label={"gridRowStart"}
					value={attributes[`gridRowStart${device}`]}
					onChange={value => {
						setAttributes({ [`gridRowStart${device}`]: value });
					}}
				></TextControl>
				<TextControl
					label={"gridRowEnd"}
					value={attributes[`gridRowEnd${device}`]}
					onChange={value => {
						setAttributes({ [`gridRowEnd${device}`]: value });
					}}
				></TextControl>  */}
				<div className={style.row}>
					<Button isPrimary onClick={() => handleClick("up")}>
						Up
					</Button>
					<Button isPrimary onClick={() => handleClick("down")}>
						Down
					</Button>
				</div>
				<br></br>
				<div className={style.row}>
					<Button isPrimary onClick={() => handleClick("left")}>
						Left
					</Button>
					<Button isPrimary onClick={() => handleClick("right")}>
						Right
					</Button>
				</div>
				<br></br>
				<div className={style.row}>
					<Button isPrimary onClick={() => handleClick("weiter")}>
						weiter
					</Button>
					<Button isPrimary onClick={() => handleClick("schmaler")}>
						schmaler
					</Button>
				</div>
				<br></br>
				<div className={style.row}>
					<Button isPrimary onClick={() => handleClick("höher")}>
						höher
					</Button>
					<Button isPrimary onClick={() => handleClick("niedriger")}>
						niedriger
					</Button>
				</div>
				<br></br>
				<CheckboxControl
					heading="User"
					label="autoHeight"
					help="Is the user a author or not?"
					checked={attributes[`autoHeight${device}`]}
					onChange={value => {
						setAttributes({ [`autoHeight${device}`]: value });
					}}
				></CheckboxControl>

				<div className={style.row}></div>
				<RangeControl
					label="min Height"
					value={attributes[`minHeight${device}`]}
					onChange={value => {
						setAttributes({ [`minHeight${device}`]: value });
					}}
					min={0}
					max={2000}
				/>
				<TextControl
					label={"overlay Text"}
					value={overlayText}
					onChange={overlayText => {
						setAttributes({ overlayText });
					}}
				></TextControl>
				<CheckboxControl
					heading="User"
					label="overlay"
					checked={overlay}
					onChange={overlay => {
						setAttributes({ overlay });
					}}
				></CheckboxControl>
			</div>

			<PicMedia {...props}></PicMedia>
			<AnimationPanel {...props}></AnimationPanel>
		</InspectorControls>
	);
}
