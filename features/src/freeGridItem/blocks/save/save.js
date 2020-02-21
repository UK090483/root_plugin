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
		overlay
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
		Object.keys(backgtroundImage).length > 0 ? backgtroundImage.large.url : "";
	console.log(backgroundSize);
	function getImageSizes() {
		return {
			desktop: "",
			tablet: "",
			mobile: ""
		};
	}

	function getStyle() {
		let e = `
		.ku-free-grid-item-inner-${clientId} {
			background-image: url(${backgtroundImageUrl});
			background-position: ${_focalPoint};
			background-size: ${backgroundSize};
		}
		@media only screen and (max-width: ${attributes["breakingPointmobile"]}px) {
				.ku-free-grid-item-${clientId} {
					-ms-grid-column:${attributes["gridColumnStartmobile"]};
					grid-column-start: ${attributes["gridColumnStartmobile"]};
					-ms-grid-column-span: ${attributes["gridColumnEndmobile"]};
					grid-column-end: span ${attributes["gridColumnEndmobile"]};
					-ms-grid-row: ${attributes["gridRowStartmobile"]};
					grid-row-start: ${attributes["gridRowStartmobile"]};
					-ms-grid-row-span: ${attributes["gridRowEndmobile"]};
					grid-row-end: span ${attributes["gridRowEndmobile"]};
					min-height:  ${attributes["minHeightmobile"]}px;
				}
				.ku-free-grid-item-inner-${clientId}::before {
					padding-top:  ${attributes["ratiomobile"]};
				}
				.ku-free-grid-item-${clientId}::before {
					padding-top:  ${attributes["ratiomobile"]};
				}
			  }
			  @media only screen and (min-width: ${attributes["breakingPointmobile"]}px) {
				.ku-free-grid-item-${clientId} {
					g-ms-grid-column:${attributes["gridColumnStarttablet"]};
					grid-column-start: ${attributes["gridColumnStarttablet"]};
					-ms-grid-column-span: ${attributes["gridColumnEndtablet"]};
					grid-column-end: span ${attributes["gridColumnEndtablet"]};
					-ms-grid-row: ${attributes["gridRowStarttablet"]};
					grid-row-start: ${attributes["gridRowStarttablet"]};
					-ms-grid-row-span: ${attributes["gridRowEndtablet"]};
					grid-row-end: span ${attributes["gridRowEndtablet"]};
					min-height:  ${attributes["minHeighttablet"]}px;
				}
				.ku-free-grid-item-inner-${clientId}::before {
					padding-top:  ${attributes["ratiotablet"]};
				}
				.ku-free-grid-item-${clientId}::before {
					padding-top:  ${attributes["ratiotablet"]};
				}
			  }
			  @media only screen and (min-width:${attributes["breakingPointtablet"]}px) {
				.ku-free-grid-item-${clientId} {
					-ms-grid-column:${attributes["gridColumnStartdesktop"]};
					grid-column-start: ${attributes["gridColumnStartdesktop"]};
					-ms-grid-column-span: ${attributes["gridColumnEnddesktop"]};
					grid-column-end: span ${attributes["gridColumnEnddesktop"]};
					-ms-grid-row: ${attributes["gridRowStartdesktop"]};
					grid-row-start: ${attributes["gridRowStartdesktop"]};
					-ms-grid-row-span: ${attributes["gridRowEnddesktop"]};
					grid-row-end: span ${attributes["gridRowEnddesktop"]};
					min-height:  ${attributes["minHeightmobile"]}px;
				}
				.ku-free-grid-item-inner-${clientId}::before {
					padding-top:  ${attributes["ratiodesktop"]};
				}
				.ku-free-grid-item-${clientId}::before {
					padding-top:  ${attributes["ratiodesktop"]};
				}
			  }
	`;

		return e;
	}
	return (
		<Fragment>
			{attributes.isActive && (
				<Fragment>
					<style>{getStyle()}</style>

					<div
						className={`ku-free-grid-item ku-free-grid-item-${clientId}  ${animationClasses.listener}`}
					>
						<div
							className={`ku-free-grid-item-inner ku-free-grid-item-inner-${clientId} ${animationClasses.target}`}
						>
							{overlay && (
								<div className={"ku-free-grid-item-overlay-box"}>
									{overlayText}
								</div>
							)}
							<InnerBlocks.Content />
						</div>
					</div>
				</Fragment>
			)}
		</Fragment>
	);
}
