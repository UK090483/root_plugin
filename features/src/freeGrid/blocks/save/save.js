const { InnerBlocks } = wp.blockEditor;
const { useEffect, Fragment, useRef, useState } = wp.element;
let layouts = ["desktop", "tablet", "mobile"];
export default function(props) {
	const { attributes } = props;
	const { clientId, noGrid } = attributes;

	function getGridStyle() {
		return `
		@media only screen and (max-width: ${attributes["breakingPointmobile"]}px) {
				.ku-free-grid-inner-wrap-${clientId} {
					grid-gap: ${attributes["gapmobile"]}px;
					-ms-grid-columns: 1fr 1fr 1fr ; 
					grid-template-columns: repeat(${attributes["columnsmobile"]}, 1fr);
					-ms-grid-rows: min-content min-content min-content min-content;
					grid-template-rows:  repeat(${attributes["rowsmobile"]}, min-content);
				}
				.ku-free-grid-ratio-wrap-${clientId} {
					margin: ${attributes["marginTopmobile"]}px auto ${attributes["marginBottommobile"]}px auto;
				}
			  }
			  
			  @media only screen and (min-width: ${attributes["breakingPointmobile"]}px) {

				.ku-free-grid-inner-wrap-${clientId} {
					grid-gap: ${attributes["gaptablet"]}px;
					-ms-grid-columns: 1fr 1fr 1fr ; 
					grid-template-columns: repeat(${attributes["columnstablet"]}, 1fr);
					-ms-grid-rows: min-content min-content min-content min-content;
					grid-template-rows: repeat(${attributes["rowstablet"]}, min-content);
				}
				.ku-free-grid-ratio-wrap-${clientId} {
					margin: ${attributes["marginToptablet"]}px auto ${attributes["marginBottomtablet"]}px auto;	
				}
			  }
			
			  @media only screen and (min-width: ${attributes["breakingPointtablet"]}px) {
				
				.ku-free-grid-inner-wrap-${clientId} {
					grid-gap: ${attributes["gapdesktop"]}px;
					-ms-grid-columns: 1fr 1fr 1fr ; 
					grid-template-columns: repeat(${attributes["columnsdesktop"]}, 1fr);
					-ms-grid-rows: min-content min-content min-content min-content;
					grid-template-rows:  repeat(${attributes["rowsdesktop"]}, min-content);
				}
				.ku-free-grid-ratio-wrap-${clientId} {
					margin: ${attributes["marginTopdesktop"]}px auto ${attributes["marginBottomdesktop"]}px auto;
				}
			  }
			  `;
	}

	return (
		<Fragment>
			{!noGrid && (
				<div className={`ku-free-grid-wrap-${clientId} ku-free-grid-wrap`}>
					<style>{getGridStyle()}</style>
					<div className={`ku-free-grid-ratio-wrap-${clientId}`}>
						<div
							className={`ku-free-grid-inner-wrap ku-free-grid-inner-wrap-${clientId}`}
						>
							<InnerBlocks.Content />
						</div>
					</div>
				</div>
			)}
			{noGrid && (
				<div
					className={`ku-free-grid-wrap-${clientId}`}
					style={{ position: "relative" }}
				>
					<InnerBlocks.Content />
				</div>
			)}
		</Fragment>
	);
}
