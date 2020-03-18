const { SelectControl } = wp.components;
const { useSelect } = wp.data;
export default function SelectPages( { tools } ) {
	const { selectedItem, attributes, setAttributes } = tools;
	const { images } = attributes;
	const itemIndex = images.findIndex( element => element.id === selectedItem );

	const { link } = images[ itemIndex ];

	const pages = useSelect( select => {
		return select( 'core' ).getEntityRecords( 'postType', 'page', {
			per_page: -1,
		} );
	}, [] );

	function getOptions() {
		let result = null;
		if ( pages ) {
			result = pages.map( page => {
				return { label: page.title.rendered, value: page.id };
			} );

			result.unshift( { label: '-------', value: '' } );
		}
		return result;
	}

	function setLink( linkId ) {
		const i = [ ...images ];

		if ( linkId ) {
			const _link = pages.find( element => element.id === linkId ).link;
			i.find( element => element.id === selectedItem ).link = {
				id: linkId,
				url: _link,
			};
		} else {
			i.find( element => element.id === selectedItem ).link = {
				id: null,
				url: null,
			};
		}

		setAttributes( {
			images: i,
		} );
	}

	return (
		<div>
			<SelectControl
				label={ link.postType }
				value={ link.id }
				options={ getOptions() }
				onChange={ linkId => {
					setLink( linkId );
				} }
			/>
		</div>
	);
}
