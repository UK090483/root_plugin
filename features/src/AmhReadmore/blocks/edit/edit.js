import ButtonGroupCustom from "../Inspector/ButtonGroup";
import Item from "./item";
const { RichText } = wp.blockEditor;
const { useEffect, useState } = wp.element;
const {
	TextControl,
	Button,
	ButtonGroup,
	ColorPicker,
	BaseControl
} = wp.components;

export default function edit(props) {
	const { attributes, setAttributes } = props;
	const { mainBlock, subBlocks, Id } = attributes;
	const encodedSubblocks = JSON.parse(subBlocks);
	const [activeColor, setactiveColor] = useState(-1);
	const [active, setActive] = useState(false);
	useEffect(() => {
		if (!Id) {
			setAttributes({ Id: Date.now() });
		}
	}, []);

	function addItem() {
		const nextSubBlocks = [...encodedSubblocks];
		const newItem = {
			label: "NEU",
			short: "ja",
			color: "inherit",
			content: "Neues Item"
		};
		nextSubBlocks.push(newItem);
		setAttributes({ subBlocks: JSON.stringify(nextSubBlocks) });
	}

	function getSubTexts() {
		return encodedSubblocks.map((block, index) => (
			<Item
				{...props}
				block={block}
				index={index}
				activeColor={activeColor}
				setactiveColor={setactiveColor}
			></Item>
		));
	}

	return (
		<div
			style={{
				borderRadius: 10
			}}
		>
			<div
				style={{
					display: "flex",
					justifyContent: "space-between",
					alignItems: "center",
					backgroundColor: active
						? "rgba(0, 0, 0, 0.35)"
						: "rgba(0, 0, 0, 0.15)",
					margin: "5px auto",
					padding: 5,
					borderRadius: "10px"
				}}
			>
				<Button
					isPrimary
					onClick={() => {
						setactiveColor(setActive(!active));
					}}
				>
					{active ? "Close" : "Edit"}
				</Button>
				<RichText
					style={{
						padding: 10,
						backgroundColor: "white",
						borderRadius: "10px",
						margin: 5
					}}
					placeholder="This text will always be visible"
					value={mainBlock}
					onChange={mainBlock => setAttributes({ mainBlock })}
				/>
			</div>

			{active && (
				<div>
					{getSubTexts()}
					<Button isSmall isPrimary onClick={() => addItem()}>
						{"add Item"}
					</Button>
				</div>
			)}
		</div>
	);
}
