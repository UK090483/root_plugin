const { InnerBlocks } = wp.blockEditor;
const { useEffect, Fragment, useRef, useState } = wp.element;
let layouts = ["desktop", "tablet", "mobile"];
export default function(props) {
	const { attributes } = props;
	const { clientId, noGrid } = attributes;

	function getgridTemplatColumns(_columns) {
		let ms = new Array(_columns).fill("1fr").join(" ");
		return `grid-template-columns: repeat(${_columns}, ${100 /
			_columns}%); -ms-grid-columns: ${ms};`;
	}

	function getGridStyle() {
		return `
		@media only screen and (max-width: ${attributes["breakingPointmobile"]}px) {
				.ku-free-grid-wrap-${clientId} {
					${getgridTemplatColumns(attributes["columnsmobile"])}
					margin-bottom: -${attributes["gapmobile"]}px; 
				}
			  }
			  @media only screen and (min-width: ${attributes["breakingPointmobile"]}px) {
				.ku-free-grid-wrap-${clientId} {
					${getgridTemplatColumns(attributes["columnstablet"])}
					margin-bottom: -${attributes["gaptablet"]}px; 
				}
			  }
			  @media only screen and (min-width: ${attributes["breakingPointtablet"]}px) {
				.ku-free-grid-wrap-${clientId} {
					${getgridTemplatColumns(attributes["columnsdesktop"])}
					margin-bottom: -${attributes["gapdesktop"]}px; 
				}
			  }
			  `;
	}

	return (
		<Fragment>
			<style>{getGridStyle()}</style>
			<div className={`ku-free-grid-wrap-${clientId} ku-free-grid-wrap`}>
				<InnerBlocks.Content />
			</div>
		</Fragment>
	);
}
