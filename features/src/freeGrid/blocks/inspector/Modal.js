import SelectPages from './selectPages';
const { Button, Modal, TextControl } = wp.components;

export default function KUmodal( {
	setAttributes,
	selectedItem,
	isOpen,
	setOpen,
	images,
	tools,
} ) {
	const item = images.find( element => element.id === selectedItem );

	function setAlt( text ) {
		const i = [ ...images ];
		i.find( element => element.id === selectedItem ).alt = text;
		setAttributes( {
			images: i,
		} );
	}

	return (
		<div>
			{ isOpen && (
				<Modal
					title="Image Settings"
					onRequestClose={ () => {
						setOpen( false );
					} }
				>
					<SelectPages tools={ tools }></SelectPages>

					<TextControl
						label="Label"
						value={ item.alt }
						onChange={ e => setAlt( e ) }
					></TextControl>

					<div className={ 'gallerie-modal-button-wrap' }>
						<Button
							isLarge
							isPrimary
							onClick={ () => {
								setOpen( false );
							} }
						>
							Done
						</Button>
					</div>
				</Modal>
			) }
		</div>
	);
}
