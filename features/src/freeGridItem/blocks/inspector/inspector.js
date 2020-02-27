const { InspectorControls } = wp.blockEditor;
const { TextControl, Button, RangeControl, ToggleControl } = wp.components;
import Link from "./Link/Link";
import PicMedia from "./PicMedia";
import AnimationPanel from "./AnimationPanel";
import Positionator from "./Positionator";

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

			<Positionator onClick={handleClick}></Positionator>

			<Button onClick={() => makeAuto()}></Button>
			<div className={style.row}>
				{/* <div className={style.row}>
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
				</div> */}
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

				<ToggleControl
					label="Free Hight"
					help={"rezize height to Conten"}
					checked={attributes[`autoHeight${device}`]}
					onChange={autoheight =>
						setAttributes({ [`autoHeight${device}`]: autoheight })
					}
				/>
			</div>

			<PicMedia {...props}></PicMedia>
			<Link {...props}></Link>
			<AnimationPanel {...props}></AnimationPanel>
		</InspectorControls>
	);
}
