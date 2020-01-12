import ButtonGroupCustom from "./Inspector/ButtonGroup";
const { RichText } = wp.blockEditor;
const { useEffect } = wp.element;
const { TextControl, Button, ButtonGroup } = wp.components;

export default function edit(props) {
	const { attributes, setAttributes } = props;
	const { mainBlock, subBlocks, Id } = attributes;

	useEffect(() => {
		if (!Id) {
			setAttributes({ Id: Date.now() });
		}
	}, []);

	function setSubContent(value, type, index) {
		let nextSubBlocks = [...subBlocks];
		nextSubBlocks[index][type] = value;
		setAttributes({ subBlocks: nextSubBlocks });
	}
	function moveItem(direction, index) {
		let newSubblocks = [...subBlocks];
		let changeIndex = direction === "down" ? index + 1 : index - 1;
		let saveold = { ...newSubblocks[changeIndex] };
		newSubblocks[changeIndex] = newSubblocks[index];
		newSubblocks[index] = saveold;
		setAttributes({ subBlocks: newSubblocks });
	}
	function addItem(index) {
		let newSubblocks = [...subBlocks];
		let newItem = {
			label: "NEU",
			short: "ja",
			color: "inherit",
			content: "Neues Item"
		};
		newSubblocks.splice(index, 0, newItem);
		setAttributes({ subBlocks: newSubblocks });
	}
	function eraseItem(index) {
		let newSubblocks = [...subBlocks];
		newSubblocks.splice(index, 1);
		setAttributes({ subBlocks: newSubblocks });
	}
	function getSubTexts() {
		return subBlocks.map((block, index) => {
			return (
				<div class="text-input">
					<ButtonGroup>
						<Button
							isSmall
							isPrimary
							disabled={index > subBlocks.length - 2}
							onClick={() => moveItem("down", index)}
						>
							{"move down"}
						</Button>
						<Button
							isSmall
							isPrimary
							disabled={index < 1}
							onClick={() => moveItem("up", index)}
						>
							{"move up"}
						</Button>
					</ButtonGroup>

					<TextControl
						label="Name"
						value={block.label}
						onChange={value => {
							setSubContent(value, "label", index);
						}}
					></TextControl>
					<TextControl
						style={{ color: block.color }}
						label="short"
						value={block.short}
						onChange={value => {
							setSubContent(value, "short", index);
						}}
					></TextControl>
					<ButtonGroupCustom
						items={[
							{ value: "inherit", label: "none" },
							{ value: "red", label: "Red" },
							{ value: "green", label: "Green" },
							{ value: "orange", label: "Orange" }
						]}
						activeItem={block.color}
						onChange={color => setSubContent(color, "color", index)}
					></ButtonGroupCustom>
					<p>This will be hidden behind </p>
					<RichText
						// id="contentBlock"
						placeholder="This will be hidden behind the read more section"
						value={subBlocks[index].content}
						onChange={content => setSubContent(content, "content", index)}
					/>

					<Button isSmall isPrimary onClick={() => addItem(index)}>
						{"add Item"}
					</Button>
					<Button isSmall isPrimary onClick={() => eraseItem(index)}>
						{"erase Item"}
					</Button>
				</div>
			);
		});
	}

	return (
		<div>
			<p>Head</p>
			<div className="text-input">
				<RichText
					// id="introBlock"
					placeholder="This text will always be visible"
					value={mainBlock}
					onChange={mainBlock => setAttributes({ mainBlock })}
				/>
			</div>
			<p>Content</p>
			{getSubTexts()}
		</div>
	);
}
