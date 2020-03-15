import setAuto from "./auto";
import recover from "./recover";
const {
	RangeControl,
	PanelBody,
	Button,
	ButtonGroup,
	CheckboxControl
} = wp.components;
const { useState, useEffect, useRef, Fragment } = wp.element;
export default function AutoComponent({
	children,
	device,
	setAttributes,
	attributes
}) {
	const [state, setState] = useState(null);

	function manageAuto() {
		// setState(setAuto(children, device, setAttributes, attributes));
		setAuto(attributes, setAttributes);
	}

	function manageBack() {
		setState(recover(state, setAttributes, device));
	}

	return (
		<div>
			<Button isPrimary onClick={manageAuto}>
				Auto
			</Button>
			{state && (
				<Button isPrimary onClick={manageBack}>
					Back
				</Button>
			)}
		</div>
	);
}
