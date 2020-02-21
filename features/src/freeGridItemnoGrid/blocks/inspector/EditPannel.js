const { Button, ButtonGroup } = wp.components;
import KuButton from "../helper/KuButton";
import KuButtonGroupe from "../helper/KuButtonGroupe";

export default function EditPannel({ tools, index }) {
	const {
		setOpen,
		attributes,
		setAttributes,
		selectedItem,
		setSelectedItem
	} = tools;

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
				<KuButtonGroupe>
					<KuButton
						isSmall
						isPrimary
						disabled={index < 1}
						onClick={() => moveItem("left")}
					>
						{"<"}
					</KuButton>
					<KuButton
						isSmall
						isPrimary
						disabled={index > attributes.images.length - 2}
						onClick={() => moveItem("right")}
					>
						{">"}
					</KuButton>
				</KuButtonGroupe>
			</div>
			<div className={"grid-Gallerie-item-edit-fit"}>
				<KuButtonGroupe>
					<KuButton
						isSmall
						isPrimary={attributes.images[index].fit === "cover"}
						onClick={() => setImageAtribute("fit", "cover")}
					>
						{"cover"}
					</KuButton>
					<KuButton
						isSmall
						isPrimary={attributes.images[index].fit === "contain"}
						onClick={() => setImageAtribute("fit", "contain")}
					>
						{"contain"}
					</KuButton>
				</KuButtonGroupe>
			</div>
			<div className={"grid-Gallerie-item-edit-erase"}>
				<KuButton isSmall isPrimary onClick={() => eraseItem()}>
					{"X"}
				</KuButton>
			</div>
			<div className={"grid-Gallerie-item-edit-pos"}>
				<div
					className={"grid-Gallerie-item-edit-pos-high"}
					onClick={() => setImageAtribute("pos", "high")}
				></div>
				<div
					className={"grid-Gallerie-item-edit-pos-even"}
					onClick={() => setImageAtribute("pos", "even")}
				></div>
				<div
					className={"grid-Gallerie-item-edit-pos-landscape"}
					onClick={() => setImageAtribute("pos", "landscape")}
				></div>
				<div
					className={"grid-Gallerie-item-edit-pos-small"}
					onClick={() => setImageAtribute("pos", "small")}
				></div>
			</div>

			<div className={"gallerie-item-edit-edit"}>
				<KuButton isSmall isPrimary onClick={() => setOpen(true)}>
					Edit
				</KuButton>
			</div>
		</div>
	);
}
