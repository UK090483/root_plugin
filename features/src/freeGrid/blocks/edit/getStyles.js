import useAttributes from './hooks/useAttributes';

export default function getStyles( props ) {
	const { attributes, clientId, state, children } = props;
	const { device, childrenAttributes } = attributes;
	const {
		gap,
		columns,
		breakingPoint,
		marginTop,
		marginBottom,
	} = useAttributes( props );

	function getRatio( _device, child ) {
		const _gridRowEnd = child[ `gridRowEnd${ _device }` ];
		const _gridColumnEnd = child[ `gridColumnEnd${ _device }` ];
		const ratio =
			attributes[ `ratio${ _device }` ][ 0 ] / attributes[ `ratio${ _device }` ][ 1 ];
		const gapHeight = ( _gridRowEnd - 1 ) * gap;
		const gapWidth = ( _gridColumnEnd - 1 ) * gap;
		const r = ( ratio / _gridColumnEnd ) * _gridRowEnd * 100;
		const gabSum = gapHeight - ( gapWidth * ( r / 100 ) );

		return `padding-top: calc(${ r }% + ${ gabSum }px );`;
	}
	function styles() {
		const _gridTemplateRows = state.gridTemplateRows;
		let s = `.grid-Gallerie-e-wrap-${ clientId } > .editor-inner-blocks > .editor-block-list__layout {
		  display: grid;
		  grid-gap: ${ gap }px;
		  grid-template-columns: repeat(${ columns }, 1fr);
		  grid-template-rows: ${ _gridTemplateRows };
		  max-width:${ breakingPoint }px;
		  margin: ${ marginTop }px auto ${ marginBottom }px auto;
		  position:relative;
	  `;
		s += '}';
		childrenAttributes.forEach( ( attr, index ) => {
			s += `#block-${ children[ index ].clientId } {
				width:100%;
				grid-area:
				${ attr[ `gridRowStart${ device }` ] } / 
				${ attr[ `gridColumnStart${ device }` ] } / 
				span ${ attr[ `gridRowEnd${ device }` ] } /
				span ${ attr[ `gridColumnEnd${ device }` ] };
			}
				.ku-freegrid-item-wrap-${ children[ index ].attributes.id }::before{
					content: "";
					width: 1px;
					margin-left: -1px;
					float: left;
					height: 0;
					 ${ attr[ `autoHeight${ device }` ] ? 'padding-top: 0%;' : getRatio( device, attr ) }
				} 
				.ku-freegrid-item-wrap-${ children[ index ].attributes.id }::after{
					content: "";
			display: table;
			clear: both;
				} 
			`;
		} );
		return s;
	}
	return <style>{ styles() }</style>;
}
