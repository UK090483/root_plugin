const { useSelect } = wp.data;
const { TextControl, SelectControl, PanelBody } = wp.components;

export default function Link({ attributes, setAttributes }) {
	const data = useSelect(select => {
		const { getPostTypes, getEntityRecords } = select("core");

		const items = attributes.link.postType
			? getEntityRecords("postType", attributes.link.postType)
			: null;
		return {
			postTypes: getPostTypes() || null,
			items: items
		};
	});

	console.log(data);

	function getPostypes() {
		return data.postTypes.map(posType => ({
			label: posType.name,
			value: posType.slug
		}));
	}
	function getItems() {
		return data.items.map(item => ({
			label: item.title.rendered,
			value: item.link
		}));
	}
	return (
		<PanelBody title={"Link"} initialOpen={false}>
			<TextControl
				label={"overlay Text"}
				value={attributes.overlayText}
				onChange={overlayText => {
					setAttributes({ overlayText });
				}}
			></TextControl>
			<TextControl
				label={"Link"}
				value={attributes.link.link}
				onChange={link => {
					let nextLink = { ...attributes.link };
					nextLink.link = link;
					setAttributes({ link: nextLink });
				}}
			></TextControl>
			{data.postTypes && (
				<SelectControl
					label="Post Type"
					value={attributes.link.postType}
					options={getPostypes()}
					onChange={postType => {
						let nextLink = { ...attributes.link };
						nextLink.postType = postType;
						setAttributes({ link: nextLink });
					}}
				/>
			)}
			{data.items && (
				<SelectControl
					label="Post Type"
					value={""}
					options={getItems()}
					onChange={postType => {
						let nextLink = { ...attributes.link };
						nextLink.link = postType;
						setAttributes({ link: nextLink });
					}}
				/>
			)}
		</PanelBody>
	);
}
