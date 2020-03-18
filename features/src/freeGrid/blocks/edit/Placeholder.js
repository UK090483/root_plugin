import makeId from '../../../shared/makeId';

const { useState } = wp.element;

export default function( props ) {
	const {
		column,
		row,
		clientId,
		setActivateAble,
		setAttributes,
		attributes,
	} = props;

	const [ hoverd, setHoverd ] = useState( false );

	function insertBlock() {
		const id = makeId();
		const insert = wp.blocks.createBlock( 'kubase/free-grid-item', {
			id: id,
		} );
		const nextChildrenAtributes = {
			id: id,
			gridColumnStartdesktop: column,
			gridColumnStarttablet: column,
			gridColumnStartmobile: column,
			gridColumnEnddesktop: 1,
			gridColumnEndtablet: 1,
			gridColumnEndmobile: 1,
			gridRowStartdesktop: row,
			gridRowStarttablet: row,
			gridRowStartmobile: row,
			gridRowEnddesktop: 1,
			gridRowEndtablet: 1,
			gridRowEndmobile: 1,
			ownHeightdesktop: 0,
			ownHeightmobile: 0,
			ownHeighttablet: 0,
		};
		setAttributes( {
			childrenAttributes: [
				nextChildrenAtributes,
				...attributes.childrenAttributes,
			],
		} );
		wp.data
			.dispatch( 'core/block-editor' )
			.insertBlock( insert, 0, clientId, true );
	}

	return (
		<div
			onMouseEnter={ () => {
				setHoverd( true );
				// setActivateAble(true);
			} }
			onMouseLeave={ () => {
				setHoverd( false );
				// setActivateAble(false);
			} }
			style={ {
				// minHeight: height,
				pointerEvents: 'auto',
				border: '#80808043 dotted 1px',
				gridColumnStart: column,
				gridColumnEnd: 'span 1',
				gridRowStart: row,
				gridRowEnd: 'span 1',
			} }
		>
			{ hoverd && (
				// eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
				<h5
					onMouseDown={ () => setActivateAble( true ) }
					onMouseUp={ () => insertBlock() }
					style={ { margin: 0 } }
				>
					activate
				</h5>
			) }
		</div>
	);
}
