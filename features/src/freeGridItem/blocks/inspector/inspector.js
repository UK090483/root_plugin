const { InspectorControls } = wp.blockEditor;
const { Button, ToggleControl } = wp.components;
const { useState } = wp.element;

import Link from './Link/Link';
import PicMedia from './PicMedia';
import AnimationPanel from './AnimationPanel';
import Positionator from './Positionator';

const { doAction } = wp.hooks;

import style from '../helper/style';

export default function Inspector( props ) {
	const {

		attributes,
		device,
		clientId,
		parentId,
		ownAttributes,
	} = props;
	const { id } = attributes;

	const [ , setstate ] = useState( 0 );

	function handleClick( direction ) {
		doAction( `com-${ parentId }`, {
			type: 'MOVE',
			data: {
				direction: direction,
				id: id,
			},
		} );
	}
	function erase() {
		doAction( `com-${ parentId }`, {
			type: 'ERASE',
			data: {
				id: id,
				clientId: clientId,
			},
		} );
	}
	function setAutoheight( autoHeight ) {
		setstate( Math.random() );
		doAction( `com-${ parentId }`, {
			type: 'AUTOHEIGHT',
			data: {
				id: id,
				clientId: clientId,
				autoHeight: autoHeight,
			},
		} );
	}

	return (
		<InspectorControls>
			<h1>{ device }</h1>

			<Positionator id={ id } parentId={ parentId }></Positionator>

			<Button isSmall isDestructive onClick={ () => erase() }>
				Erase
			</Button>
			<div className={ style.row }>
				<br></br>
				<div className={ style.row }>
					<Button isPrimary onClick={ () => handleClick( 'weiter' ) }>
						weiter
					</Button>
					<Button isPrimary onClick={ () => handleClick( 'schmaler' ) }>
						schmaler
					</Button>
				</div>
				<br></br>
				<div className={ style.row }>
					<Button isPrimary onClick={ () => handleClick( 'höher' ) }>
						höher
					</Button>
					<Button isPrimary onClick={ () => handleClick( 'niedriger' ) }>
						niedriger
					</Button>
				</div>
				<br></br>

				<ToggleControl
					label="Free Hight"
					help={ 'rezize height to Conten' }
					checked={ ownAttributes[ `autoHeight${ device }` ] }
					onChange={ autoheight => {
						setAutoheight( autoheight );
					} }
				/>
			</div>

			<PicMedia { ...props }></PicMedia>
			<Link { ...props }></Link>
			<AnimationPanel { ...props }></AnimationPanel>
		</InspectorControls>
	);
}
