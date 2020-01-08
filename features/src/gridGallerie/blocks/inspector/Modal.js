import SelectPages from "./selectPages";
const { Button, Modal, TextControl, SelectControl } = wp.components;

export default function Inspector({
	setAttributes,
	selectedItem,
	sortImages,
	isOpen,
	setOpen,
	images,
	tools,
	setSelectedItem
}) {
	const item = images.find(element => element.fileName === selectedItem);

	function setAlt(text) {
		let i = [...images];
		i.find(element => element.fileName === selectedItem).alt = text;
		setAttributes({
			images: i
		});
	}

	return (
		<div>
			{isOpen && (
				<Modal
					title="Image Settings"
					onRequestClose={() => {
						setOpen(false);
					}}
				>
					{/* <SelectPages tools={tools}></SelectPages>
					<h3>FileName</h3>
					<h5>{item.fileName}</h5>
					<h3>{item.alt}</h3>
					<TextControl
						label="Label"
						value={item.alt}
						onChange={e => setAlt(e)}
					></TextControl> */}

					<div className={"gallerie-modal-button-wrap"}>
						<Button
							isLarge
							isPrimary
							onClick={() => {
								setOpen(false);
							}}
						>
							Done
						</Button>
					</div>
				</Modal>
			)}
		</div>
	);
}
