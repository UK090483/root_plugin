import Inspector from "./inspector/inspector";
import getSortFunction from "./helper/sortfunction";
import Modal from "./inspector/Modal";
import EditPannel from "./inspector/EditPannel";

const { useState, useEffect, useRef } = wp.element;

export default function(props) {
	const { setAttributes, attributes, isSelected } = props;
	const { images, sort, Id, rows, columns, ratio, gap } = attributes;
	const encodetRows = JSON.parse(rows);
	const [isOpen, setOpen] = useState(false);
	const [container, Setcontainer] = useState(null);
	const [selectedItem, setSelectedItem] = useState(-1);
	const [positionArray, setPositionArray] = useState([]);
	const ref = useRef();
	useEffect(() => {
		!isSelected && setSelectedItem(-1);
	});

	useEffect(() => {
		Setcontainer(ref.current);

		if (!Id) {
			setAttributes({ Id: Date.now() });
		}
	}, []);

	const tools = {
		eraseItem: eraseItem,
		selectedItem: selectedItem,
		setSelectedItem: setSelectedItem,
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

	function makePositionArr() {
		var carry = [];
		for (let i = 0; i < columns; i++) {
			carry.push(-1);
		}
		let nextPosArr = [];
		images.forEach((item, index) => {
			if (!nextPosArr[Math.floor(index / columns)]) {
				nextPosArr.push([...carry]);
			}

			nextPosArr[Math.floor(index / columns)][index % columns] = index;
		});
		console.log(nextPosArr);
	}

	makePositionArr();

	function getImages() {
		if (!container) {
			return;
		}

		let containerWidth = container.getBoundingClientRect().width;
		let ratioTransalated = ratio / 100;
		let rowcount = Math.floor(images.length / columns) + 1;
		let width = (containerWidth - gap * (columns - 1)) / columns;
		let height = width * ratioTransalated;
		let wrapHeight = rowcount * height + rowcount * gap;
		ref.current.style.height = wrapHeight + "px";

		return images.map((i, index) => {
			// console.log("h: " + i.size[0] + " v:" + i.size[1]);
			let posX = (index % columns) * (width + gap);
			let posY = Math.floor(index / columns) * (height + gap);

			let style = {
				width: width,
				height: height,
				left: posX,
				top: posY
			};

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
					onClick={e => {
						if (e.target.classList.contains("gallerie-item-text")) {
							setSelectedItem(i.fileName);
						} else {
							if (e.target.classList.contains("gallerie-item-edit")) {
								setSelectedItem(-1);
							}
						}
					}}
					style={style}
					data-fit={i.fit}
				>
					<img className={"image"} src={url}></img>
					<div className={"gallerie-item-text"}>{i.alt}</div>
					<EditPannel tools={tools} index={index}></EditPannel>
				</div>
			);
		});
	}

	function getRows() {}

	return (
		<div className={"gallerie-editor-wrap"}>
			<Inspector
				tools={tools}
				setAttributes={setAttributes}
				attributes={attributes}
			></Inspector>
			<Modal
				tools={tools}
				setAttributes={setAttributes}
				selectedItem={selectedItem}
				setSelectedItem={setSelectedItem}
				isOpen={isOpen}
				setOpen={setOpen}
				images={images}
			></Modal>

			{images.length > 0 && (
				<div ref={ref} className={"gallerie-wrap"}>
					{getImages()}
				</div>
			)}
		</div>
	);
}
