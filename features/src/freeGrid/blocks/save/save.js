const { InnerBlocks } = wp.blockEditor;
const { Fragment } = wp.element;
export default function( props ) {
	const { attributes } = props;
	const { clientId, childrenAttributes } = attributes;

	function getgridTemplatColumns( _columns ) {
		const ms = new Array( _columns ).fill( '1fr' ).join( ' ' );
		return `grid-template-columns: repeat(${ _columns }, ${ 100 /
			_columns }%); -ms-grid-columns: ${ ms };`;
	}
	function getMargin( device ) {
		const mb = attributes[ `marginBottom${ device }` ];
		const mt = attributes[ `marginTop${ device }` ];
		return mb || mt ? `margin: ${ mt }px 0px ${ mb }px 0px ;` : '';
	}

	function getGapMargin( device, child ) {
		const gap = attributes[ `gap${ device }` ];
		const columns = attributes[ `columns${ device }` ];
		const rows = attributes[ `rows${ device }` ];
		const gridRowStart = child[ `gridRowStart${ device }` ];
		const gridRowEnd = child[ `gridRowEnd${ device }` ];
		const gridColumnStart = child[ `gridColumnStart${ device }` ];
		const gridColumnEnd = child[ `gridColumnEnd${ device }` ];
		const mbox = ( gap * ( columns - 1 || 1 ) ) / columns;
		const mb = gridRowStart + ( gridRowEnd - 1 ) < rows ? gap : 0;
		const ml = mbox * ( ( gridColumnStart - 1 ) / ( columns - 1 || 1 ) );
		const mr =
			mbox *
			( ( columns - ( gridColumnStart + gridColumnEnd - 1 ) ) / ( columns - 1 || 1 ) );
		return `0 ${ mr }px ${ mb }px ${ ml }px`;
	}

	function getRatio( device, child ) {
		const gridRowEnd = child[ `gridRowEnd${ device }` ];
		const gridColumnEnd = child[ `gridColumnEnd${ device }` ];
		const ratio =
			attributes[ `ratio${ device }` ][ 0 ] / attributes[ `ratio${ device }` ][ 1 ];

		const gapHeight = ( gridRowEnd - 1 ) * attributes[ `gap${ device }` ];
		const gapWidth = ( gridColumnEnd - 1 ) * attributes[ `gap${ device }` ];
		const r = ( ratio / gridColumnEnd ) * gridRowEnd * 100;
		const gabSum = gapHeight - ( gapWidth * ( r / 100 ) );

		return `padding-top: calc(${ r }% + ${ gabSum }px );`;
	}

	function getChildrenStyle( device ) {
		let res = '';
		childrenAttributes.forEach( child => {
			res += `.ku-free-grid-item-${ child.id } {
				grid-area: ${ child[ `gridRowStart${ device }` ] } / ${
	child[ `gridColumnStart${ device }` ]
} / span ${ child[ `gridRowEnd${ device }` ] } / span ${
	child[ `gridColumnEnd${ device }` ]
};
				-ms-grid-row: ${ child[ `gridRowStart${ device }` ] };
				-ms-grid-column:${ child[ `gridColumnStart${ device }` ] };
				-ms-grid-row-span: ${ child[ `gridRowEnd${ device }` ] };
				-ms-grid-column-span: ${ child[ `gridColumnEnd${ device }` ] };	
				margin:${ getGapMargin( device, child ) };
			}
			.ku-free-grid-item-${ child.id }::before{
				${ child[ `autoHeight${ device }` ] ? 'padding-top: 0%;' : getRatio( device, child ) }
		   }
			 `;
		} );
		return res;
	}

	function getGridStyle() {
		const s = `
		@media only screen and (max-width: ${ attributes.breakingPointmobile }px) {
				.ku-free-grid-wrap-${ clientId } {
					${ getgridTemplatColumns( attributes.columnsmobile ) }
					${ getMargin( 'mobile' ) }	
				}
				${ getChildrenStyle( 'mobile' ) }
			  }
			  @media only screen and (min-width: ${ attributes.breakingPointmobile }px) {
				.ku-free-grid-wrap-${ clientId } {
					${ getgridTemplatColumns( attributes.columnstablet ) }
					${ getMargin( 'tablet' ) }
				}
				${ getChildrenStyle( 'tablet' ) }
			  }
			  @media only screen and (min-width: ${ attributes.breakingPointtablet }px) {
				.ku-free-grid-wrap-${ clientId } {
					${ getgridTemplatColumns( attributes.columnsdesktop ) }
					${ getMargin( 'desktop' ) }
				}
				${ getChildrenStyle( 'desktop' ) }
			  }
			  `;
		// return s.replace(/\s\s/g, "");
		return s;
	}

	return (
		<Fragment>
			<style>{ getGridStyle() }</style>
			<div className={ `ku-free-grid-wrap-${ clientId } ku-free-grid-wrap` }>
				<InnerBlocks.Content />
			</div>
		</Fragment>
	);
}
