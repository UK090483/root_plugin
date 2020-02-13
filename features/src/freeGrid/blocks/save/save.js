const { InnerBlocks } = wp.blockEditor;

export default function(props) {
	const { attributes } = props;
	const { clientId } = attributes;

	function getStyle() {
		return `
		.ku-free-grid-inner-wrap-${clientId} {
			display:grid;
		}
		
		@media only screen and (max-width: ${attributes["breakingPointmobile"]}px) {
				.ku-free-grid-inner-wrap-${clientId} {
					grid-gap: ${attributes["gapmobile"]}px;
					grid-template-columns: repeat(${attributes["columnsmobile"]}, 1fr);
					grid-template-rows: ${attributes["gridTemplateRowsmobile"]};
				}
				.ku-free-grid-ratio-wrap-${clientId} {
					margin: ${attributes["marginTopmobile"]}px auto ${attributes["marginBottommobile"]}px auto;
				}
			  }
			  
			  @media only screen and (min-width: ${attributes["breakingPointmobile"]}px) {
				.ku-free-grid-inner-wrap-${clientId} {
					grid-gap: ${attributes["gaptablet"]}px;
					grid-template-columns: repeat(${attributes["columnstablet"]}, 1fr);
					grid-template-rows: ${attributes["gridTemplateRowstablet"]};
				}
				.ku-free-grid-ratio-wrap-${clientId} {
					margin: ${attributes["marginToptablet"]}px auto ${attributes["marginBottomtablet"]}px auto;	
				}
			  }
			
			  @media only screen and (min-width: ${attributes["breakingPointtablet"]}px) {
				.ku-free-grid-inner-wrap-${clientId} {
					grid-gap: ${attributes["gapdesktop"]}px;
					grid-template-columns: repeat(${attributes["columnsdesktop"]}, 1fr);
					grid-template-rows: ${attributes["gridTemplateRowsdesktop"]};
				}
				.ku-free-grid-ratio-wrap-${clientId} {
					margin: ${attributes["marginTopdesktop"]}px auto ${attributes["marginBottomdesktop"]}px auto;
				}
			  }
			  `;
	}

	return (
		<div
			className={`ku-free-grid-wrap-${clientId}`}
			style={{
				position: "relative"
			}}
		>
			<style>{getStyle()}</style>
			<div className={`ku-free-grid-ratio-wrap-${clientId}`}>
				<div className={`ku-free-grid-inner-wrap-${clientId}`}>
					<InnerBlocks.Content />
				</div>
			</div>
		</div>
	);
}
