import ButtonGroup from '../../../shared/ButtonGroup';
const { PanelBody, Button, FocalPointPicker } = wp.components;
const { MediaUpload } = wp.blockEditor;

export default function PicMedia( props ) {
	const { setAttributes, attributes } = props;
	const { backgtroundImage, focalPoint, backgroundSize } = attributes;

	function onSelectImage( media ) {
		setAttributes( { backgtroundImage: media.sizes } );
	}

	return (
		<PanelBody title={ 'Image' } initialOpen={ false }>
			{ backgtroundImage.medium && (
				<FocalPointPicker
					url={ backgtroundImage.medium.url }
					dimensions={ { width: 300, height: 200 } }
					value={ focalPoint }
					onChange={ _focalPoint => {
						setAttributes( { _focalPoint } );
					} }
				/>
			) }
			<MediaUpload
				title={ 'Select Image' }
				onSelect={ onSelectImage }
				allowedTypes={ [ 'image' ] }
				render={ ( { open } ) => (
					<Button isDefault onClick={ open }>
						select Image
					</Button>
				) }
			/>

			<ButtonGroup
				items={ [
					{ value: 'cover', label: 'Cover' },
					{ value: 'contain', label: 'Contain' },
				] }
				activeItem={ backgroundSize }
				onChange={ _backgroundSize => setAttributes( { _backgroundSize } ) }
			></ButtonGroup>
		</PanelBody>
	);
}
