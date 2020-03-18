import Inspector from '../inspector/inspector';
import makeId from '../../../shared/makeId';
import MoveOverlay from './moveOverlay';

const { InnerBlocks, BlockControls } = wp.blockEditor;
const { useSelect } = wp.data;
const { useEffect, Fragment, useState } = wp.element;
const { Toolbar } = wp.components;

export default function( props ) {
	const { attributes, setAttributes, clientId, isSelected } = props;
	const {
		backgtroundImage,
		focalPoint,
		backgroundSize,
		id,
	} = attributes;
	const { device, parentClientId, ownAttributes } = useSelect(
		select => {
			const { getBlockAttributes, getBlockRootClientId } = select(
				'core/block-editor'
			);

			const { isEditorSidebarOpened } = select( 'core/edit-post' );
			const blockRootClientId = getBlockRootClientId( clientId );
			const _parentAttr = getBlockAttributes( blockRootClientId );
			const _ownAttributes = _parentAttr.childrenAttributes.find(
				c => c.id === attributes.id
			);

			return {
				parentClientId: blockRootClientId,
				device: _parentAttr.device,
				parentAttr: _parentAttr,
				isEditorSidebarOpened: isEditorSidebarOpened(),
				ownAttributes: _ownAttributes,
			};
		}
	);

	const [ hovered, setHovered ] = useState( false );

	const [ overlay, setOverlay ] = useState( null );

	function getFocalPoint() {
		const x = focalPoint.x * 100;
		const y = focalPoint.y * 100;
		return `${ x }% ${ y }%`;
	}

	const hasChildBlocks = useSelect( select => {
		const { getBlockOrder } = select( 'core/block-editor' );
		return getBlockOrder( clientId ).length > 0;
	} );

	useEffect( () => {
		if ( attributes.clientId === '' ) {
			setAttributes( { clientId: makeId() } );
		}
	}, [] );

	function handleOverlay( overlayName ) {
		if ( overlayName === overlay ) {
			setOverlay( null )
			;
		} else {
			setOverlay( 'move' )
			;
		}
	}

	return (
		<Fragment>
			<BlockControls> <Toolbar controls={ [ { icon: 'move', onClick: ()=>handleOverlay( 'move' ) } ] }></Toolbar> </BlockControls>

			<div
				onMouseEnter={ () => {
					setHovered( true );
				} }
				onMouseLeave={ () => {
					setHovered( false );
				} }
				style={ {
					zIndex: isSelected ? 100 : 0,
					margin: '-28px -15px -28px -15px',
					backgroundSize: backgroundSize,
					backgroundRepeat: 'no-repeat',
					backgroundPosition: getFocalPoint(),
					backgroundImage:
						Object.keys( backgtroundImage ).length !== 0 &&
						`url(${ backgtroundImage.full.url })`,
					position: 'relative',
				} }
				className={ `ku-freegrid-item ku-freegrid-item-wrap-${ id }` }
			>
				{ hovered && (
					<Fragment>
						<div
							style={ {
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center',
								borderRadius: '50%',
								width: 50,
								height: 50,
								position: 'absolute',
								right: -15,
								top: -15,
								zIndex: 500,
								backgroundColor: 'red',
								opacity: 1,
								transition: 'all 1s',
							} }
							className={ 'hoverbox' }
						>
							{ 'select' }
						</div>

					</Fragment>
				) }
				{ overlay === 'move' && <MoveOverlay parentId={ parentClientId } id={ id }></MoveOverlay> }
				<Fragment>
					<Inspector
						{ ...props }
						device={ device }
						clientId={ clientId }
						parentId={ parentClientId }
						ownAttributes={ ownAttributes }
					></Inspector>

					<InnerBlocks
						templateLock={ false }
						renderAppender={
							! hasChildBlocks && isSelected && ! overlay ?
								() => <InnerBlocks.ButtonBlockAppender /> :
								false
						}
					/>
				</Fragment>

			</div>
		</Fragment>
	);
}
