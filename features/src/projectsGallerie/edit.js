import Inspector from "./inspector/inspector";
import getSortFunction from "./helper/sortfunction";
import Modal from "./inspector/Modal";
import EditPannel from "./inspector/EditPannel";

const { useState, useEffect } = wp.element;

export default function(props) {
	const { setAttributes, attributes, isSelected } = props;
	const { images, sort, Id } = attributes;
	const [isOpen, setOpen] = useState(false);
	const [selectedItem, setSelectedItem] = useState(-1);

	useEffect(() => {
		!isSelected && setSelectedItem(-1);
	});

	useEffect(() => {
		if (!Id) {
			setAttributes({ Id: Date.now() });
		}
	}, []);

	const tools = {
		eraseItem: eraseItem,
		selectedItem: selectedItem,
		setAttributes: setAttributes,
		attributes: attributes,
		setOpen: setOpen,
		moveItem: moveItem
	};

	// for (const key of images.keys()) {
	// 	console.log(key);
	// }

	function eraseItem() {
		let i = [...images];
		let index = i.findIndex(element => element.fileName === selectedItem);

		i.splice(index, 1);
		setAttributes({
			images: i
		});
		setSelectedItem(-1);
		setOpen(false);
	}

	function moveItem(dir) {
		let i = [...images];
		let index = i.findIndex(element => element.fileName === selectedItem);
		let changeIndex = dir === "right" ? index + 1 : index - 1;
		let saveold = { ...i[changeIndex] };
		i[changeIndex] = i[index];
		i[index] = saveold;
		setAttributes({
			images: i
		});
	}

	function getImages() {
		return images.map((i, index) => {
			let url = i.sizes.hasOwnProperty("medium")
				? i.sizes.medium.url
				: i.sizes.full.url;

			let wrapClass =
				i.fileName === selectedItem
					? "gallerie-item gallerie-item-selected"
					: "gallerie-item";
			return (
				<div
					key={i.fileName}
					className={wrapClass}
					onClick={() => setSelectedItem(i.fileName)}
				>
					<img className={"image"} src={url}></img>
					<div className={"gallerie-item-text"}>{i.alt}</div>
					<EditPannel tools={tools} index={index}></EditPannel>
				</div>
			);
		});
	}

	function sortImages(_sort) {
		setAttributes({ images: images.sort(getSortFunction(_sort || sort)) });
	}

	return (
		<div className={"gallerie-editor-wrap"}>
			<Inspector
				tools={tools}
				setAttributes={setAttributes}
				attributes={attributes}
				sortImages={sortImages}
			></Inspector>
			<Modal
				tools={tools}
				setAttributes={setAttributes}
				selectedItem={selectedItem}
				setSelectedItem={setSelectedItem}
				isOpen={isOpen}
				setOpen={setOpen}
				images={images}
				sortImages={sortImages}
			></Modal>

			{images.length > 0 && (
				<div className={"gallerie-wrap"}>{getImages()}</div>
			)}
		</div>
	);
}
