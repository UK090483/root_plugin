import animations from "../animations/animations";

const { PanelBody, Button, FocalPointPicker, CheckboxControl } = wp.components;
const { MediaUpload } = wp.blockEditor;
const { __ } = wp.i18n;

export default function Animation(props) {
	const { setAttributes, attributes, resetWrap } = props;
	const { device } = attributes;

	const getAnimations = () =>
		animations.map((animation, index) => (
			<CheckboxControl
				label={animation.name}
				checked={
					!!(attributes[`animations${device}`].find(a => a === index) + 1)
				}
				onChange={animation => {
					let NewAnimations = [...attributes[`animations${device}`]];
					animation
						? NewAnimations.push(index)
						: (NewAnimations = NewAnimations.filter(a => a !== index));
					setAttributes({ [`animations${device}`]: NewAnimations });
				}}
			></CheckboxControl>
		));

	return (
		<PanelBody title={"Animation"} initialOpen={false}>
			<CheckboxControl
				heading="Amimation"
				label="overlay"
				checked={attributes[`animation${device}`]}
				onChange={animation => {
					setAttributes({ [`animation${device}`]: animation });
				}}
			></CheckboxControl>
			{getAnimations()}
		</PanelBody>
	);
}
