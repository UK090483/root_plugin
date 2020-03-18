import Inspector from '../inspector/inspector';
import makeId from '../../../shared/makeId';
import { getPositionArray } from '../inspector/move/helper/positionArray';
import RowsPreview from './rowsPreview';
import EditOverlay from './EditOverlay';
import useCom from './hooks/useCom';
import useAttributes from './hooks/useAttributes';
import GetStyles from './getStyles';
import comupteGridRows from './comupteGridRows';

const { InnerBlocks, BlockControls } = wp.blockEditor;
const { useState, useEffect, useRef, Fragment } = wp.element;
const { useSelect } = wp.data;

const ALLOWED_BLOCKS = [ 'kubase/free-grid-item-nogrid' ];

export default function( props ) {
	const { setAttributes, attributes, clientId } = props;
	const { device } = attributes;
	const { gap, columns, rows, ratio, breakingPoint } = useAttributes( props );

	const Container = useRef();

	const [ state, setState ] = useState( {
		containerWidth: null,
		gridTemplateRows: '',
	} );

	const [ activateAble, setActivateAble ] = useState( false );
	const [ childrenHeights, setchildrenHeights ] = useState( {} );

	const { children, isEditorSidebarOpened } = useSelect( select => {
		return {
			children: select( 'core/block-editor' ).getBlock( clientId ).innerBlocks,
			isEditorSidebarOpened: select( 'core/edit-post' ).isEditorSidebarOpened(),
		};
	} );

	const positionArray = getPositionArray( attributes );

	useCom( props, [ children ] );

	useEffect( () => {
		if ( attributes.clientId === '' ) {
			setAttributes( { clientId: makeId() } );
		}
	}, [] );

	useEffect( () => {
		if ( activateAble ) {
			setActivateAble( false );
		}
	}, [ children ] );

	useEffect( () => {
		if ( Container.current ) {
			const cWidth = Container.current.getBoundingClientRect().width;
			setState( {
				containerWidth: cWidth,
				gridTemplateRows: comupteGridRows(
					props,
					cWidth,
					positionArray,
					children,
					childrenHeights
				),
			} );

			setTimeout( () => {
				const res = { ...childrenHeights };
				let needsUpdate = false;
				children.forEach( child => {
					const item = Container.current.querySelector(
						`.ku-freegrid-item-wrap-${ child.attributes.id }`
					);

					const _h = item.getBoundingClientRect().height;

					if ( childrenHeights[ child.attributes.id ] !== _h ) {
						needsUpdate = true;
						res[ child.attributes.id ] = item.getBoundingClientRect().height;
					}
				} );

				if ( needsUpdate ) {
					setchildrenHeights( res );
				}
			}, 1 );
		}
	}, [
		Container,
		device,
		gap,
		ratio,
		children,
		childrenHeights,
		columns,
		isEditorSidebarOpened,
	] );

	return (
		<div className={ 'grid-Gallerie-editor-wrap' }>
			<Inspector { ...props }></Inspector>
			<BlockControls>{ /* <Button>b</Button> */ }</BlockControls>
			<div
				ref={ Container }
				style={ {
					maxWidth: breakingPoint,
					width: '100%',
					margin: ' 0 auto',
					position: 'relative',
				} }
			>
				{ state.containerWidth && (
					<Fragment>
						<RowsPreview
							rows={ rows }
							columns={ columns }
							gap={ gap }
							breakingPoint={ breakingPoint }
							state={ state }
						></RowsPreview>
						<GetStyles { ...props } state={ state } children={ children }></GetStyles>
						<div
							className={ `grid-Gallerie-e-wrap-${ clientId } ` }
							style={ {
								position: 'relative',
								maxWidth: breakingPoint,
								margin: ' 0 auto',
							} }
						>
							<InnerBlocks
								allowedBlocks={ ALLOWED_BLOCKS }
								templateLock={ activateAble ? '' : 'all' }
							/>
						</div>
						<EditOverlay
							{ ...props }
							positionArray={ positionArray }
							state={ state }
							children={ children }
							setActivateAble={ setActivateAble }
						></EditOverlay>
					</Fragment>
				) }
			</div>
		</div>
	);
}
