const { SelectControl } = wp.components;
const { useSelect } = wp.data;
export default function SelectPages({ tools }) {
	const { selectedItem, attributes, setAttributes } = tools;
	const { images } = attributes;
	const itemIndex = images.findIndex(element => element.id === selectedItem);

	const { link } = images[itemIndex];

	const posttypes = useSelect(select => {
		let res = select("core").getPostTypes();
		return res ? res.filter(item => item.viewable === true) : undefined;
	}, []);

	const pages = useSelect(select => {
		return select("core").getEntityRecords("postType", "page", {
			per_page: -1
		});
	}, []);

	function getOptions() {
		let result = null;
		if (pages) {
			result = pages.map(page => {
				return { label: page.title.rendered, value: page.id };
			});

			result.unshift({ label: "-------", value: "" });
		}
		return result;
	}
	function getOptionsPT() {
		let result = null;
		if (posttypes) {
			result = posttypes.map(page => {
				return { label: page.labels.name, value: page.slug };
			});

			result.unshift({ label: "-------", value: "" });
		}
		return result;
	}

	function setLink(linkId) {
		let i = [...images];

		if (linkId) {
			let link = pages.find(element => element.id == linkId).link;
			i.find(element => element.id === selectedItem).link = {
				id: linkId,
				url: link
			};
		} else {
			i.find(element => element.id === selectedItem).link = {
				id: null,
				url: null
			};
		}

		setAttributes({
			images: i
		});
	}
	function setPostType(postType) {
		let i = [...images];

		if (postType) {
			i.find(element => element.id === selectedItem).link = {
				id: null,
				url: null,
				postType: postType
			};
		} else {
			i.find(element => element.id === selectedItem).link = {
				id: null,
				url: null,
				postType: null
			};
		}

		setAttributes({
			images: i
		});
	}

	return (
		<div>
			{/* <SelectControl
				label="Posttypes"
				value={link.postType}
				options={getOptionsPT()}
				onChange={_postType => {
					setPostType(_postType);
				}}
			/> */}

			<SelectControl
				label={link.postType}
				value={link.id}
				options={getOptions()}
				onChange={linkId => {
					setLink(linkId);
				}}
			/>
		</div>
	);
}
