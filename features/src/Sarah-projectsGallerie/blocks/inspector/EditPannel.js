const { Button, ButtonGroup } = wp.components;

export default function EditPannel({ tools, index }) {
	const {
		eraseItem,
		setOpen,
		moveItem,
		attributes,
		setAttributes,
		setSelectedItem
	} = tools;

	function setImageAtribute(attribute, value) {
		let nextImages = [...attributes.images];
		nextImages[index][attribute] = value;
		setAttributes({ images: nextImages });
	}

	return (
		<div className={"gallerie-item-edit"}>
			<div className={"gallerie-item-edit-move"}>
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

			<div className={"gallerie-item-edit-size"}>
				<ButtonGroup>
					<h5>horizontal</h5>
					<Button
						isSmall
						isPrimary
						onClick={() => {
							let nextSize = [...attributes.images[index].size];
							nextSize[0] = nextSize[0] + 1;
							setImageAtribute("size", nextSize);
						}}
					>
						{">"}
					</Button>

					<Button
						isSmall
						isPrimary
						onClick={() => {
							let nextSize = [...attributes.images[index].size];
							nextSize[0] = nextSize[0] - 1;
							setImageAtribute("size", nextSize);
						}}
					>
						{"<"}
					</Button>
					<h5>vertical</h5>
					<Button
						isSmall
						isPrimary
						onClick={() => {
							let nextSize = [...attributes.images[index].size];
							nextSize[1] = nextSize[1] + 1;
							setImageAtribute("size", nextSize);
						}}
					>
						{">"}
					</Button>
					<Button
						isSmall
						isPrimary
						onClick={() => {
							let nextSize = [...attributes.images[index].size];
							nextSize[1] = nextSize[1] - 1;
							setImageAtribute("size", nextSize);
						}}
					>
						{"<"}
					</Button>
				</ButtonGroup>
			</div>

			<div className={"gallerie-item-edit-fit"}>
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
			<div className={"gallerie-item-edit-erase"}>
				<Button isSmall isPrimary onClick={() => eraseItem()}>
					{"X"}
				</Button>
			</div>
			<div className={"gallerie-item-edit-edit"}>
				<Button isSmall isPrimary onClick={() => setOpen(true)}>
					Edit
				</Button>
			</div>
		</div>
	);
}
