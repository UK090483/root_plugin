const { InspectorControls, MediaPlaceholder } = wp.blockEditor;

const { Button, Modal, TextControl } = wp.components;

export default function Inspector({
	setAttributes,
	selectedItem,
	sortImages,
	isOpen,
	setOpen,
	images,
	setSelectedItem
}) {
	const item = images.find(element => element.id === selectedItem);

	function setAlt(text) {
		let i = [...images];
		i.find(element => element.id === selectedItem).alt = text;
		setAttributes({
			images: i
		});
		sortImages();
	}
	function erase() {
		let i = [...images];
		let index = i.findIndex(element => element.id === selectedItem);
		i.splice(index, 1);
		setAttributes({
			images: i
		});
		setSelectedItem(-1);
		setOpen(false);
	}

	return (
		<div>
			{isOpen && (
				<Modal
					title="This is my modal"
					onRequestClose={() => {
						setOpen(false);
					}}
				>
					<h1>FileName</h1>
					<h3>{item.fileName}</h3>
					<h3>{item.alt}</h3>
					<TextControl
						label="Alternative Sort name"
						value={item.alt}
						onChange={e => setAlt(e)}
					></TextControl>
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
						<Button isLarge isPrimary onClick={() => erase(false)}>
							Erase
						</Button>
					</div>
				</Modal>
			)}
		</div>
	);
}
