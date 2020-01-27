const { Button, ButtonGroup } = wp.components;

export default function EditPannel({ tools, index }) {
	const {
		setOpen,
		attributes,
		setAttributes,
		selectedItem,
		setSelectedItem
	} = tools;

	function setPos(e) {
		let images = [...attributes.images];
		let index = images.findIndex(element => element.id === selectedItem);
		images[index].pos = e;
		setAttributes({ images });
	}

	function setImageAtribute(attribute, value) {
		let nextImages = [...attributes.images];
		nextImages[index][attribute] = value;
		setAttributes({ images: nextImages });
	}
	function moveItem(dir) {
		let i = [...attributes.images];

		let changeIndex = dir === "right" ? index + 1 : index - 1;
		let saveold = { ...i[changeIndex] };
		i[changeIndex] = i[index];
		i[index] = saveold;

		setAttributes({
			images: i
		});
	}
	function eraseItem() {
		let i = [...attributes.images];

		i.splice(index, 1);
		setAttributes({
			images: i
		});
		setSelectedItem(-1);
		setOpen(false);
	}

	return (
		<div className={"grid-Gallerie-item-edit"}>
			<div className={"grid-Gallerie-item-edit-move"}>
				<ButtonGroup>
					<Button
						isSmall
						isPrimary
						disabled={index < 1}
						onClick={() => moveItem("left")}
					>
						{"<"}
					</Button>
					<Button
						isSmall
						isPrimary
						disabled={index > attributes.images.length - 2}
						onClick={() => moveItem("right")}
					>
						{">"}
					</Button>
				</ButtonGroup>
			</div>
			<div className={"grid-Gallerie-item-edit-fit"}>
				<ButtonGroup>
					<Button
						isSmall
						isPrimary={attributes.images[index].fit === "cover"}
						onClick={() => setImageAtribute("fit", "cover")}
					>
						{"cover"}
					</Button>
					<Button
						isSmall
						isPrimary={attributes.images[index].fit === "contain"}
						onClick={() => setImageAtribute("fit", "contain")}
					>
						{"contain"}
					</Button>
				</ButtonGroup>
			</div>
			<div className={"grid-Gallerie-item-edit-erase"}>
				<Button isSmall isPrimary onClick={() => eraseItem()}>
					{"X"}
				</Button>
			</div>
			<div className={"grid-Gallerie-item-edit-pos"}>
				<div
					className={"grid-Gallerie-item-edit-pos-high"}
					onClick={() => setPos("high")}
				></div>
				<div
					className={"grid-Gallerie-item-edit-pos-even"}
					onClick={() => setPos("even")}
				></div>
				<div
					className={"grid-Gallerie-item-edit-pos-landscape"}
					onClick={() => setPos("landscape")}
				></div>
				<div
					className={"grid-Gallerie-item-edit-pos-small"}
					onClick={() => setPos("small")}
				></div>
			</div>

			<div className={"gallerie-item-edit-edit"}>
				<Button isSmall isPrimary onClick={() => setOpen(true)}>
					Edit
				</Button>
			</div>
		</div>
	);
}
