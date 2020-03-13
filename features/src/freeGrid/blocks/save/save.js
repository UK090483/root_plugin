const { InnerBlocks } = wp.blockEditor;
const { useEffect, Fragment, useRef, useState } = wp.element;
let layouts = ["desktop", "tablet", "mobile"];
export default function(props) {
	const { attributes } = props;
	const { clientId, childrenAttributes } = attributes;

	function getgridTemplatColumns(_columns) {
		let ms = new Array(_columns).fill("1fr").join(" ");
		return `grid-template-columns: repeat(${_columns}, ${100 /
			_columns}%); -ms-grid-columns: ${ms};`;
	}
	function getMargin(device) {
		let mb = attributes[`marginBottom${device}`];
		let mt = attributes[`marginTop${device}`];
		return mb || mt ? `margin: ${mt}px 0px ${mb}px 0px ;` : "";
	}

	function getChildrenStyle(device) {
		let res = "";
		childrenAttributes.forEach(child => {
			res += `.ku-free-grid-item{
				
			} `;
		});
	}

	function getGridStyle() {
		let s = `
		@media only screen and (max-width: ${attributes["breakingPointmobile"]}px) {
				.ku-free-grid-wrap-${clientId} {
					${getgridTemplatColumns(attributes["columnsmobile"])}
					${getMargin("mobile")}
				}
			  }
			  @media only screen and (min-width: ${attributes["breakingPointmobile"]}px) {
				.ku-free-grid-wrap-${clientId} {
					${getgridTemplatColumns(attributes["columnstablet"])}
					${getMargin("tablet")}
				}
			  }
			  @media only screen and (min-width: ${attributes["breakingPointtablet"]}px) {
				.ku-free-grid-wrap-${clientId} {
					${getgridTemplatColumns(attributes["columnsdesktop"])}
					${getMargin("desktop")}
				}
			  }
			  `;
		return s.replace(/\s\s/g, "");
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
