const { InnerBlocks } = wp.blockEditor;
const { Fragment } = wp.element;

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

	function getStyle() {
		let e = `
		.ku-free-grid-item-${clientId} {
			width: 100%;
			align-self: start;
		}
		.ku-free-grid-item-${clientId}{
			background-image: url(${backgtroundImage});
			background-position: ${_focalPoint};
			background-size: ${backgroundSize};
			background-repeat: no-repeat ;
		}
		@media only screen and (max-width: ${attributes["breakingPointmobile"]}px) {
				.ku-free-grid-item-${clientId} {
					grid-column-start: ${attributes["gridColumnStartmobile"]};
					grid-column-end: span ${attributes["gridColumnEndmobile"]};
					grid-row-start: ${attributes["gridRowStartmobile"]};
					grid-row-end: span ${attributes["gridRowEndmobile"]};
					min-height:  ${attributes["minHeightmobile"]}px;
				}
				
				.ku-free-grid-item-${clientId}::before {
					content: "";
					width: 1px;
					margin-left: -1px;
					float: left;
					height: 0;
					padding-top:  ${attributes["ratiomobile"]};
				}
				.ku-free-grid-item-${clientId}::after {
					content: "";
					display: table;
					clear: both;
				}
			  }
			  @media only screen and (min-width: ${attributes["breakingPointmobile"]}px) {
				.ku-free-grid-item-${clientId} {
					grid-column-start: ${attributes["gridColumnStarttablet"]};
					grid-column-end: span ${attributes["gridColumnEndtablet"]};
					grid-row-start: ${attributes["gridRowStarttablet"]};
					grid-row-end: span ${attributes["gridRowEndtablet"]};
					min-height:  ${attributes["minHeighttablet"]}px;
				}
				.ku-free-grid-item-${clientId}::before {
					content: "";
					width: 1px;
					margin-left: -1px;
					float: left;
					height: 0;
					padding-top:  ${attributes["ratiotablet"]};
				}
				.ku-free-grid-item-${clientId}::after {
					content: "";
					display: table;
					clear: both;
				}
			  }
			  @media only screen and (min-width:${attributes["breakingPointtablet"]}px) {
				.ku-free-grid-item-${clientId} {
					grid-column-start: ${attributes["gridColumnStartdesktop"]};
					grid-column-end: span ${attributes["gridColumnEnddesktop"]};
					grid-row-start: ${attributes["gridRowStartdesktop"]};
					grid-row-end: span ${attributes["gridRowEnddesktop"]};
					min-height:  ${attributes["minHeightdesktop"]}px;
				}
				.ku-free-grid-item-${clientId}::before {
					content: "";
					width: 1px;
					margin-left: -1px;
					float: left;
					height: 0;
					padding-top:  ${attributes["ratiodesktop"]};
				}
				.ku-free-grid-item-${clientId}::after {
					content: "";
					display: table;
					clear: both;
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

					<div className={`ku-free-grid-item-${clientId} ku-free-grid-item`}>
						{overlay && (
							<div className={"ku-free-grid-item-overlay-box"}>
								{overlayText}
							</div>
						)}
						<InnerBlocks.Content />
					</div>
				</Fragment>
			)}
		</Fragment>
	);
}
