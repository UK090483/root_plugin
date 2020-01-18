const { InnerBlocks } = wp.blockEditor;
import Inspector from "../Inspector/Inspector";
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
	const { mainBlock, color, fontColor } = attributes;
	const [active, setActive] = useState(false);

	return (
		<div
			style={{
				borderRadius: 10
			}}
		>
			<Inspector {...props}></Inspector>
			<div
				style={{
					display: "flex",
					justifyContent: "space-between",
					alignItems: "center",
					backgroundColor: color,
					color: fontColor,
					margin: "5px auto",
					padding: 5,
					borderRadius: "10px"
				}}
			>
				<RichText
					style={{
						padding: 10,
						borderRadius: "10px",
						margin: 5
					}}
					placeholder="...write a header"
					value={mainBlock}
					onChange={mainBlock => setAttributes({ mainBlock })}
				/>
				<Button
					isPrimary
					onClick={() => {
						setActive(!active);
					}}
				>
					{active ? "Close" : "Edit"}
				</Button>
			</div>

			{active && (
				<div
					style={{
						border: `${color} 3px solid`,
						borderRadius: 10,
						minHeight: 100
					}}
				>
					<InnerBlocks></InnerBlocks>
				</div>
			)}
		</div>
	);
}
