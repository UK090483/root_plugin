const { RichText, AlignmentToolbar, InspectorControls } = wp.editor;
const { PanelBody, BaseControl, ToggleControl, RangeControl } = wp.components;

export default function inspector( { setAttributes, atttributes } ) {
	const { showNext, showNextquantity, showOld, showOldquantity } = atttributes;
	return (
		<InspectorControls>
			<br></br>
			<br></br>
			<BaseControl label={ 'Next Events' }>
				<ToggleControl
					label={ 'showNext' }
					checked={ showNext }
					onChange={ showNext => setAttributes( { showNext } ) }
				></ToggleControl>
				<ToggleControl
					label={ 'All' }
					checked={ showNextquantity === -1 }
					onChange={ e =>
						e ?
							setAttributes( { showNextquantity: -1 } ) :
							setAttributes( { showNextquantity: 1 } )
					}
				></ToggleControl>
				{ showNextquantity > 0 && (
					<RangeControl
						label="Number of Events"
						value={ showNextquantity }
						onChange={ showNextquantity => setAttributes( { showNextquantity } ) }
						min={ 1 }
						max={ 100 }
					/>
				) }

				<br></br>
			</BaseControl>
			<BaseControl label={ 'Old Events' }>
				<br></br>
				<ToggleControl
					label={ 'showOld' }
					checked={ showOld }
					onChange={ showOld => setAttributes( { showOld } ) }
				></ToggleControl>
				<ToggleControl
					label={ 'All' }
					checked={ showOldquantity === -1 }
					onChange={ e =>
						e ?
							setAttributes( { showOldquantity: -1 } ) :
							setAttributes( { showOldquantity: 1 } )
					}
				></ToggleControl>
				{ showOldquantity > 0 && (
					<RangeControl
						label="Number of Events"
						value={ showOldquantity }
						onChange={ showOldquantity => setAttributes( { showOldquantity } ) }
						min={ 1 }
						max={ 100 }
					/>
				) }

				<br></br>
			</BaseControl>
		</InspectorControls>
	);
}
