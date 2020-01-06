const { Button, ButtonGroup } = wp.components;

export default function EditPannel({ tools, index }) {
	const { eraseItem, setOpen, moveItem, attributes } = tools;
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
