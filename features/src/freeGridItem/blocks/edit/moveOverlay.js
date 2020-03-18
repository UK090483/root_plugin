/* eslint-disable react/jsx-indent-props */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
const { Icon, Path, SVG } = wp.components;
const { doAction } = wp.hooks;
const { useState } = wp.element;

export default function MoveOverlay( { parentId, id } ) {
	function handleClick( direction ) {
		doAction( `com-${ parentId }`, {
			type: 'MOVE',
			data: {
				direction: direction,
				id: id,
			},
		} );
	}

	return (
		<div
			style={ {
				position: 'absolute',
				backgroundColor: '#007cba90',
				height: '100%',
				width: '100%',
				display: 'flex',
				justifyContent: 'stretch',

				flexWrap: 'wrap',

			} }

		>

			<div style={ {
				alignSelf: 'flex-start',

				height: '30%',
				width: '100%',
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',

			} } >

				<MoveIcon onClick={ handleClick } icon="up" />

			</div>
			<div style={ {
				alignSelf: 'center',

				height: '30%',
				width: '100%',
				display: 'flex',
				justifyContent: 'space-between',
				alignItems: 'center',

			} } >

				<MoveIcon onClick={ handleClick } icon="left" />

				<div style={ {
					alignSelf: 'center',

					height: '100%',
					width: '100px',
					display: 'flex',
					justifyContent: 'space-between',
					alignItems: 'center',

				} }>
					<MoveIcon onClick={ handleClick } icon="höher" />
					<MoveIcon onClick={ handleClick } icon="niedriger" />
					<MoveIcon onClick={ handleClick } icon="weiter" />
					<MoveIcon onClick={ handleClick } icon="schmaler" />

				</div>

				<MoveIcon onClick={ handleClick } icon="right" />

			</div>

			<div style={ {
				alignSelf: 'flex-end',

				height: '30%',
				width: '100%',
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',

			} } >

				<MoveIcon onClick={ handleClick } icon="down" />

			</div>

			{ /* <MoveIcon onClick={ handleClick } icon="höher" />
			<MoveIcon onClick={ handleClick } icon="niedriger" />
			<MoveIcon onClick={ handleClick } icon="weiter" />
			<MoveIcon onClick={ handleClick } icon="schmaler" />
			<MoveIcon onClick={ handleClick } icon="left" /> */ }
			{ /* <div
				style={ {
					position: 'absolute',
					left: '50%',
					transform: 'translateY(-100%)',
					top: '50%',
				} }><MoveIcon onClick={ handleClick } icon="left" />
			</div> */ }

		</div>
	);
}

function MoveIcon( { onClick, icon } ) {
	const [ hovered, setHovered ] = useState( false );

	function getIcon( icon ) {
		if ( icon === 'höher' || icon === 'weiter' ) {
			return <Path d="M0 0h24v24H0z" d="M12 5.83L15.17 9l1.41-1.41L12 3 7.41 7.59 8.83 9 12 5.83zm0 12.34L8.83 15l-1.41 1.41L12 21l4.59-4.59L15.17 15 12 18.17z" />;
		}
		if ( icon === 'niedriger' || icon === 'schmaler' ) {
			return <Path d="M0 0h24v24H0V0z" d="M7.41 18.59L8.83 20 12 16.83 15.17 20l1.41-1.41L12 14l-4.59 4.59zm9.18-13.18L15.17 4 12 7.17 8.83 4 7.41 5.41 12 10l4.59-4.59z" />;
		}
		if ( icon === 'left' || icon === 'right' ) {
			return <Path d="M0 0h24v24H0V0z" d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z" />;
		}
		if ( icon === 'up' || icon === 'down' ) {
			return <Path d="M0 0h24v24H0V0z" d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z" />;
		}
	}

	function getTransform( icon ) {
		if ( icon === 'weiter' || icon === 'schmaler' ) {
			return 'rotate(90deg)';
		}
		if ( icon === 'left' || icon === 'up' ) {
			return 'rotate(180deg)';
		}
	}

	return <SVG
		style={ {
			width: 50,

			transition: 'all 0.2s',
			transform: getTransform( icon ),
		} }

		fill={ hovered ? '#3b3b3b' : 'white' }
		viewBox="0 0 24 24"
		xmlns="http://www.w3.org/2000/svg"
		onMouseEnter={ ()=> setHovered( true ) }
		onMouseLeave={ ()=> setHovered( false ) }
		onClick={ ()=>onClick( icon ) }
	>
		{ getIcon( icon ) }
	</SVG>;
}
