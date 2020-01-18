const { TextControl, Button, ButtonGroup, ColorPicker } = wp.components;
const { MediaUpload } = wp.editor;
import ButtonGroupCustom from "../Inspector/ButtonGroup";
const { RichText } = wp.blockEditor;

export default function item(props) {
	const {
		attributes,
		setAttributes,
		block,
		index,
		activeColor,
		setactiveColor
	} = props;

	const { mainBlock, subBlocks } = attributes;
	const encodedSubblocks = JSON.parse(subBlocks);

	function setSubContent(value, type) {
		const nextSubBlocks = [...encodedSubblocks];
		nextSubBlocks[index][type] = value;
		setAttributes({ subBlocks: JSON.stringify(nextSubBlocks) });
	}
	function moveItem(direction) {
		const nextSubBlocks = [...encodedSubblocks];
		const changeIndex = direction === "down" ? index + 1 : index - 1;
		const saveold = { ...nextSubBlocks[changeIndex] };
		nextSubBlocks[changeIndex] = nextSubBlocks[index];
		nextSubBlocks[index] = saveold;
		setAttributes({ subBlocks: JSON.stringify(nextSubBlocks) });
	}

	function eraseItem() {
		const nextSubBlocks = [...encodedSubblocks];
		nextSubBlocks.splice(index, 1);
		setactiveColor(-1);
		setAttributes({ subBlocks: JSON.stringify(nextSubBlocks) });
	}

	return (
		<div>
			<div
				style={{
					display: "flex",
					justifyContent: "space-between",
					alignItems: "center",
					border: "black solid 1px",
					margin: "5px auto",
					padding: 5,
					borderRadius: 10
				}}
			>
				<Button
					isPrimary
					onClick={() => {
						setactiveColor(activeColor === index ? -1 : index);
					}}
				>
					Edit
				</Button>
				<TextControl
					value={block.label}
					onChange={value => {
						setSubContent(value, "label");
					}}
				></TextControl>
				<ButtonGroup>
					<Button
						isSmall
						isPrimary
						disabled={index > encodedSubblocks.length - 2}
						onClick={() => moveItem("down")}
					>
						{"move down"}
					</Button>
					<Button
						isSmall
						isPrimary
						disabled={index < 1}
						onClick={() => moveItem("up")}
					>
						{"move up"}
					</Button>
				</ButtonGroup>
			</div>

			{activeColor === index && (
				<div
					style={{
						padding: 20,
						backgroundColor: "rgba(0, 0, 0, 0.05)",
						borderRadius: 10
					}}
				>
					{/* <div style={{ maxWidth: 200 }}>
						<ColorPicker
							color={block.bgColor || "#ffffff"}
							onChangeComplete={value => setSubContent(value.hex, "bgColor")}
						></ColorPicker>
					</div> */}
					<div
						style={{
							display: "flex",
							alignItems: "center",
							flexWrap: "wrap",
							justifyContent: "space-around"
						}}
					>
						{block.logo && (
							<img src={block.logo} style={{ with: 100, height: 100 }}></img>
						)}
						<MediaUpload
							title={"Select Logo"}
							onSelect={image => setSubContent(image.sizes.medium.url, "logo")}
							allowedTypes={["image"]}
							value={block.imageId}
							render={({ open }) => (
								<Button isDefault onClick={open}>
									{!block.imageId ? "Select Logo" : "Replace Logo"}
								</Button>
							)}
						/>
						{block.logo && (
							<Button isPrimary onClick={image => setSubContent(null, "logo")}>
								{"Erase Image"}
							</Button>
						)}
					</div>
					<TextControl
						style={{ color: block.color }}
						label="short"
						value={block.short}
						onChange={value => {
							setSubContent(value, "short");
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
						onChange={color => setSubContent(color, "color")}
					></ButtonGroupCustom>
					<p>This will be hidden behind </p>
					<RichText
						style={{ backgroundColor: "#ffffff", border: "black solid 1px" }}
						placeholder="This will be hidden behind the read more section"
						value={block.content}
						onChange={content => setSubContent(content, "content")}
					/>
					<Button isSmall isPrimary onClick={() => eraseItem()}>
						{"erase Item"}
					</Button>
				</div>
			)}
		</div>
	);
}
