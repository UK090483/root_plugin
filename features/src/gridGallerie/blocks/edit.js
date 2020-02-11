import Inspector from "./inspector/inspector";
import Modal from "./inspector/Modal";
import EditPannel from "./inspector/EditPannel";

const { useState, useEffect, useRef } = wp.element;

export default function(props) {
	const { setAttributes, attributes, isSelected } = props;
	const {
		images,
		Id,
		borderRadius,
		gridHeight,
		collumns,
		gap,
		positions,
		ratio,
		containerHeight
	} = attributes;

	const [isOpen, setOpen] = useState(false);
	const [selectedItem, setSelectedItem] = useState(-1);
	const [container, Setcontainer] = useState(null);
	const [containerSize, setContainerSize] = useState(null);
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

	useEffect(() => {
		if (images.length > 0) {
			getPositions();
		}
	}, [images, collumns, ratio, gap]);

	useEffect(() => {
		setContainerSize(ref.current.getBoundingClientRect());
	}, []);

	const tools = {
		setSelectedItem: setSelectedItem,
		selectedItem: selectedItem,
		setAttributes: setAttributes,
		attributes: attributes,
		setOpen: setOpen
	};

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
		let res = space / collumns.value;
		if (res - Math.trunc(res) !== 0) {
			return Math.trunc(res) + 1;
		} else {
			return res;
		}
	}

	function getPositions() {
		let nextImages = [...images];
		if (container) {
			if (container.childNodes[2]) {
				let itemContainer = container.childNodes[2];
				let size = itemContainer.getBoundingClientRect();
				let res = [];
				let cx = size.x;
				let cy = size.y;
				let w = size.width;
				let h = getContainerHeight();

				itemContainer.childNodes.forEach((item, index) => {
					let rect = item.getBoundingClientRect();
					let left = ((rect.x - cx) / w) * 100;
					let top = ((rect.y - cy) / h) * 100;
					let width = (rect.width / w) * 100;
					let height = (rect.height / h) * 100;
					res.push({ left: left, top: top, width: width, height: height });

					nextImages[index].top = top;
					nextImages[index].left = left;
					nextImages[index].width = width;
					nextImages[index].height = height;
				});
				if (positions !== JSON.stringify(res)) {
					setAttributes({
						positions: JSON.stringify(res),
						images: nextImages
					});
				}
			}
		}
	}

	function getContainerHeight() {
		if (!container) {
			return "100";
		} else {
			let containerW = container.getBoundingClientRect().width;
			let rowCount = getRowCount();

			let ItemWidth =
				(containerW - gap * (collumns.value - 1)) / collumns.value;

			let heightContainer = ItemWidth * rowCount + gap * (rowCount - 1);
			let heightContainerContainer =
				(heightContainer / containerW) * (ratio / 100);

			if (gridHeight !== heightContainer) {
				setAttributes({ gridHeight: heightContainer });
			}
			if (containerHeight !== heightContainerContainer) {
				setAttributes({ containerHeight: heightContainerContainer });
			}
			return heightContainer * (ratio / 100);
		}
	}

	function getImages() {
		return images.map((i, index) => {
			let url = i.sizes.hasOwnProperty("medium")
				? i.sizes.medium.url
				: i.sizes.full.url;

			let wrapClass =
				i.id === selectedItem
					? `grid-Gallerie-item grid-Gallery-${i.pos} grid-Gallerie-item-selected`
					: `grid-Gallerie-item grid-Gallery-${i.pos}`;

			return (
				<div
					key={i.id}
					className={wrapClass}
					onClick={() => setSelectedItem(i.id)}
					style={{
						backgroundImage: `url(${url})`,
						borderRadius: borderRadius.value + borderRadius.unit,
						backgroundSize: i.fit
					}}
				>
					<EditPannel tools={tools} index={index}></EditPannel>
				</div>
			);
		});
	}

	const wrapStyle = {
		height: getContainerHeight() + "px",
		gridTemplateColumns: `repeat(${collumns.value}, 1fr)`,
		gridGap: gap + "px"
	};

	return (
		<div ref={ref} className={"grid-Gallerie-editor-wrap"}>
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
				<div className={"grid-Gallerie-e-wrap"} style={wrapStyle}>
					{getImages()}
				</div>
			)}
		</div>
	);
}
