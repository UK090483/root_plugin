import Inspector from "./inspector/inspector";
import getSortFunction from "./helper/sortfunction";
import Modal from "./inspector/Modal";
import EditPannel from "./inspector/EditPannel";

const { useState, useEffect } = wp.element;

export default function(props) {
	const { setAttributes, attributes, isSelected } = props;
	const { images, sort, Id, borderRadius, gridHeight, collumns } = attributes;
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
	function getRowCount() {
		let space = 0;
		images.forEach(image => {
			if (image.pos === "high") {
				space += 2;
			}
			if (image.pos === "even") {
				space += 4;
			}
			if (image.pos === "landscape") {
				space += 2;
			}
			if (image.pos === "small") {
				space += 1;
			}
		});
		return space / collumns.value;
	}

	console.log(getRowCount());

	function getImages() {
		return images.map((i, index) => {
			let url = i.sizes.hasOwnProperty("medium")
				? i.sizes.medium.url
				: i.sizes.full.url;

			let wrapClass =
				i.fileName === selectedItem
					? `grid-Gallerie-item grid-Gallery-${i.pos} grid-Gallerie-item-selected`
					: `grid-Gallerie-item grid-Gallery-${i.pos}`;

			return (
				<div
					key={i.fileName}
					className={wrapClass}
					onClick={() => setSelectedItem(i.fileName)}
					style={{
						backgroundImage: `url(${url})`,
						borderRadius: borderRadius.value + borderRadius.unit
					}}
				>
					{/* <img
						className={`grid-Gallery-image grid-Gallery-${i.pos}`}
						src={url}
					></img> */}

					<EditPannel tools={tools} index={index}></EditPannel>
				</div>
			);
		});
	}
	const wrapStyle = {
		height: gridHeight.value + gridHeight.unit,
		gridTemplateColumns: `repeat(${collumns.value}, 1fr)`
	};

	return (
		<div className={"grid-Gallerie-editor-wrap"}>
			<Inspector
				tools={tools}
				setAttributes={setAttributes}
				attributes={attributes}
			></Inspector>
			{/* <Modal
				tools={tools}
				setAttributes={setAttributes}
				selectedItem={selectedItem}
				setSelectedItem={setSelectedItem}
				isOpen={isOpen}
				setOpen={setOpen}
				images={images}
			></Modal> */}

			{images.length > 0 && (
				<div className={"grid-Gallerie-wrap"} style={wrapStyle}>
					{getImages()}
				</div>
			)}
		</div>
	);
}
