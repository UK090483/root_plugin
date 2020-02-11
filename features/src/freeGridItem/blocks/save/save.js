const { InnerBlocks } = wp.blockEditor;
const { Fragment } = wp.element;

export default function(props) {
	const { attributes } = props;
	const { backgtroundImage, clientId } = attributes;

	function getStyle() {
		return `
		.ku-free-grid-item-${clientId} {
			width: 100%;
			background-image: url(${backgtroundImage});
			background-position: center;
			background-size: cover;
		}
		@media only screen and (max-width: ${attributes["breakingPointmobile"]}px) {
				.ku-free-grid-item-${clientId} {
					grid-column-start: ${attributes["gridColumnStartmobile"]};
					grid-column-end: span ${attributes["gridColumnEndmobile"]};
					grid-row-start: ${attributes["gridRowStartmobile"]};
					grid-row-end: span ${attributes["gridRowEndmobile"]};
					min-height:  ${attributes["minHeightmobile"]}px;
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
			  }
			  @media only screen and (min-width:${attributes["breakingPointtablet"]}px) {
				.ku-free-grid-item-${clientId} {
					grid-column-start: ${attributes["gridColumnStartdesktop"]};
					grid-column-end: span ${attributes["gridColumnEnddesktop"]};
					grid-row-start: ${attributes["gridRowStartdesktop"]};
					grid-row-end: span ${attributes["gridRowEnddesktop"]};
					min-height:  ${attributes["minHeightdesktop"]}px;
				}
			  }
			  `;
	}
	return (
		<Fragment>
			{attributes.isActive && (
				<Fragment>
					<style>{getStyle()}</style>

					<div className={`ku-free-grid-item-${clientId} ku-free-grid-item`}>
						<InnerBlocks.Content />
					</div>
				</Fragment>
			)}
		</Fragment>
	);
}
