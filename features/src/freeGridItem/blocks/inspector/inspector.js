const { InspectorControls } = wp.blockEditor;
const { TextControl, Button, RangeControl, ToggleControl } = wp.components;

import Link from "./Link/Link";
import PicMedia from "./PicMedia";
import AnimationPanel from "./AnimationPanel";
import Positionator from "./Positionator";

const { doAction } = wp.hooks;

import style from "../helper/style";

export default function Inspector(props) {
	const { setAttributes, attributes, device, clientId } = props;

	function handleClick(dir) {
		doAction("move", dir, clientId);
	}

	function erase() {
		doAction("erase", clientId);
	}

	return (
		<InspectorControls>
			<h1>{device}</h1>

			<Positionator onClick={handleClick}></Positionator>

			<Button isSmall isDestructive onClick={() => erase()}>
				Erase
			</Button>
			<div className={style.row}>
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
