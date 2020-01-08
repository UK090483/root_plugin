const { Button, ButtonGroup } = wp.components;

export default function EditPannel({ tools, index }) {
	const {
		eraseItem,
		setOpen,
		moveItem,
		attributes,
		setAttributes,
		selectedItem
	} = tools;

	function setPos(e) {
		let images = [...attributes.images];
		let index = images.findIndex(element => element.fileName === selectedItem);
		images[index].pos = e;
		setAttributes({ images });
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

			{/* <div className={"gallerie-item-edit-edit"}>
				<Button isSmall isPrimary onClick={() => setOpen(true)}>
					Edit
				</Button>
			</div> */}
		</div>
	);
}
