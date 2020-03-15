const { InspectorControls } = wp.blockEditor;
const { TextControl, Button, RangeControl, ToggleControl } = wp.components;

import Link from "./Link/Link";
import PicMedia from "./PicMedia";
import AnimationPanel from "./AnimationPanel";
import Positionator from "./Positionator";

const { doAction } = wp.hooks;

import style from "../helper/style";

export default function Inspector(props) {
	const { setAttributes, attributes, device, clientId, parentId } = props;
	const { id } = attributes;

	function handleClick(direction) {
		doAction(`com-${parentId}`, {
			type: "MOVE",
			data: {
				direction: direction,
				id: id
			}
		});
	}
	function erase() {
		doAction(`com-${parentId}`, {
			type: "ERASE",
			data: {
				id: id,
				clientId: clientId
			}
		});
	}

	return (
		<InspectorControls>
			<h1>{device}</h1>

			<Positionator id={id} parentId={parentId}></Positionator>

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
