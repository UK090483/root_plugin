const { InnerBlocks } = wp.blockEditor;
const { Fragment } = wp.element;
let layouts = ["desktop", "tablet", "mobile"];
import animations from "../animations/animations";

export default function(props) {
	const { attributes } = props;
	const {
		backgtroundImage,
		clientId,
		backgroundSize,
		focalPoint,
		overlayText,
		overlay,
		link,
		id
	} = attributes;

	function getFocalPoint() {
		let x = focalPoint.x * 100;
		let y = focalPoint.y * 100;
		return `${x}% ${y}%`;
	}

	let _focalPoint = getFocalPoint();

	function getAnimation() {
		let res = "";

		attributes[`animationsdesktop`].forEach(animation => {
			res += " " + animations[animation].class;
		});

		return {
			listener: res.length > 0 ? "ku-free-grid-animation-listener" : "",
			target: res.length > 0 ? "ku-free-grid-animation-target" + res : ""
		};
	}

	const animationClasses = getAnimation();

	const backgtroundImageUrl =
		Object.keys(backgtroundImage).length > 0
			? backgtroundImage.large
				? backgtroundImage.large.url
				: backgtroundImage.full.url
			: "";

	function getInnerItem() {
		return (
			<Fragment>
				<div
					className={`ku-free-grid-item-background ku-free-grid-item-background-${id} ${animationClasses.target}`}
				>
					{overlayText && (
						<div className={`ku-free-grid-item-content-overlay`}>
							<div className={`ku-free-grid-item-content-overlay-text`}>
								<p>{overlayText}</p>
							</div>
						</div>
					)}
				</div>
				<div
					className={`ku-free-grid-item-content ku-free-grid-item-content-${id} ${animationClasses.target}`}
				>
					<InnerBlocks.Content />
				</div>
			</Fragment>
		);
	}

	function getStyle() {
		let e = `
		.ku-free-grid-item-background-${id} {
			background-image: url(${backgtroundImageUrl});
			background-position: ${_focalPoint};
			background-size: ${backgroundSize};
		}
	`;

		// 	justincase = `@media only screen and (max-width: ${attributes["breakingPointmobile"]}px) {

		// }
		// @media only screen and (min-width: ${attributes["breakingPointmobile"]}px) {

		// }
		// @media only screen and (min-width: ${attributes["breakingPointtablet"]}px) {

		// }`;

		return e;
	}
	return (
		<Fragment>
			<style>{getStyle()}</style>
			{!link.link && (
				<div
					className={`ku-free-grid-item ku-free-grid-item-${id}  ${animationClasses.listener}`}
				>
					{getInnerItem()}
				</div>
			)}
			{link.link && (
				<a
					href={link.link}
					className={`ku-free-grid-item ku-free-grid-item-${id}  ${animationClasses.listener}`}
				>
					{getInnerItem()}
				</a>
			)}
		</Fragment>
	);
}
