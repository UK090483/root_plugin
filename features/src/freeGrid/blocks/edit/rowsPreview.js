export default function RowsPreview( {
	rows,
	columns,
	gap,
	breakingPoint,
	state,
} ) {
	function getPreviewRows() {
		const PrevRows = new Array( rows ).fill( 1 );
		return PrevRows.map( ( item, index ) => {
			return (
				<div
					key={ index }
					style={ {
						backgroundColor: '#007cba10',
						gridColumnStart: 1,
						gridRowStart: index + 1,
						gridColumnEnd: `span ${ columns }`,
					} }
				></div>
			);
		} );
	}
	return (
		<div
			className={ 'grid-Gallerie-editor-pref' }
			style={ {
				pointerEvents: 'none',
				position: 'absolute',
				top: 0,
				display: 'grid',
				gridTemplateColumns: `repeat( ${ columns } , 1fr)`,
				gridTemplateRows: state.gridTemplateRows,
				gridGap: gap + 'px',
				width: 'calc(100% + 20px)',
				left: 0,
				maxWidth: breakingPoint,
			} }
		>
			{ getPreviewRows() }
		</div>
	);
}
