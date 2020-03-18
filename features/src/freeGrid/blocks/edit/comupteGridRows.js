import useAttributes from './hooks/useAttributes';

export default function comupteGridRows(
	props,
	width,
	positionArray,
	children,
	childrenHeights
) {
	const { device, childrenAttributes } = props.attributes;
	const { rows, columns, gap, ratio } = useAttributes( props );

	const result = new Array( rows );
	const placeholderHeight = ( ( width - ( gap * ( columns - 1 ) ) ) / columns ) * ratio;
	result.fill( 0 );
	let hasItems = false;
	let rowheight = 0;

	positionArray.forEach( ( element, index ) => {
		const _row = Math.floor( index / columns );
		const child = children[ element ];
		if ( index % columns !== columns - 1 ) {
			setValues();
		} else {
			setValues();
			setRow();
			resetValues();
		}
		function setRow() {
			if ( hasItems ) {
				result[ _row ] = rowheight;
			} else {
				result[ _row ] = placeholderHeight;
			}
		}
		function resetValues() {
			hasItems = false;
			rowheight = 0;
		}
		function setValues() {
			if ( element !== undefined ) {
				hasItems = true;
				const ownHeight =
					( ( childrenHeights[ child.attributes.id ] -
						( ( childrenAttributes[ element ][ `gridRowEnd${ device }` ] - 1 ) * gap ) ) /
					childrenAttributes[ element ][ `gridRowEnd${ device }` ] );

				if ( child.innerBlocks.length === 0 ) {
					rowheight =
						rowheight < placeholderHeight ? placeholderHeight : rowheight;
				}
				if ( ownHeight > rowheight ) {
					rowheight = ownHeight;
				}
				if ( childrenAttributes[ element ][ `autoHeight${ device }` ] ) {
					if ( rowheight < ownHeight ) {
						rowheight = ownHeight
						;
					}
				}
			}
		}
	} );

	return result.join( 'px ' ) + 'px';
}
