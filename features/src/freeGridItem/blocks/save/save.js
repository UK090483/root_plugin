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

	function getStyle() {
		let e = `
		.ku-free-grid-item-background-${clientId} {
			background-image: url(${backgtroundImageUrl});
			background-position: ${_focalPoint};
			background-size: ${backgroundSize};
		}
		@media only screen and (max-width: ${attributes["breakingPointmobile"]}px) {
				.ku-free-grid-item-${clientId} {
					grid-area: ${attributes["gridRowStartmobile"]} / ${attributes["gridColumnStartmobile"]} / span ${attributes["gridRowEndmobile"]} / span ${attributes["gridColumnEndmobile"]};
					-ms-grid-row: ${attributes["gridRowStartmobile"]};
					-ms-grid-column:${attributes["gridColumnStartmobile"]};
					-ms-grid-row-span: ${attributes["gridRowEndmobile"]};
					-ms-grid-column-span: ${attributes["gridColumnEndmobile"]};	
					margin: ${attributes["gapMarginmobile"]};			
				}
				.ku-free-grid-item-${clientId}::before{
					padding-top:  ${attributes["ratiomobile"]};
				}
			  }
			  @media only screen and (min-width: ${attributes["breakingPointtablet"]}px) {
				.ku-free-grid-item-${clientId} {
					grid-area: ${attributes["gridRowStarttablet"]} / ${attributes["gridColumnStarttablet"]} / span ${attributes["gridRowEndtablet"]} / span ${attributes["gridColumnEndtablet"]};
					-ms-grid-row: ${attributes["gridRowStarttablet"]};
					-ms-grid-column:${attributes["gridColumnStarttablet"]};
					-ms-grid-row-span: ${attributes["gridRowEndtablet"]};
					-ms-grid-column-span: ${attributes["gridColumnEndtablet"]};	
					margin: ${attributes["gapMargintablet"]};				
				}
				.ku-free-grid-item-${clientId}::before{
					padding-top:  ${attributes["ratiotablet"]};
				}
			  }
			  @media only screen and (min-width:${attributes["breakingPointtablet"]}px) {
				.ku-free-grid-item-${clientId} {
					grid-area: ${attributes["gridRowStartdesktop"]} / ${attributes["gridColumnStartdesktop"]} / span ${attributes["gridRowEnddesktop"]} / span ${attributes["gridColumnEnddesktop"]};
					-ms-grid-row: ${attributes["gridRowStartdesktop"]};
					-ms-grid-column:${attributes["gridColumnStartdesktop"]};
					-ms-grid-row-span: ${attributes["gridRowEnddesktop"]};
					-ms-grid-column-span: ${attributes["gridColumnEnddesktop"]};	
					margin: ${attributes["gapMargindesktop"]};						
				}
				.ku-free-grid-item-${clientId}::before{
					padding-top:  ${attributes["ratiodesktop"]};
				}
			  }
	`;

		return e;
	}
	return (
		<Fragment>
			<style>{getStyle()}</style>

			<div
				className={`ku-free-grid-item ku-free-grid-item-${clientId}  ${animationClasses.listener}`}
			>
				<div
					className={`ku-free-grid-item-background ku-free-grid-item-background-${clientId} ${animationClasses.target}`}
				></div>
				<div
					className={`ku-free-grid-item-content ku-free-grid-item-content-${clientId} ${animationClasses.target}`}
				>
					<InnerBlocks.Content />
				</div>
			</div>
		</Fragment>
	);
}
