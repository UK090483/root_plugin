import { arrow } from "./icons";
const { RichText } = wp.editor;
const { useState, useEffect } = wp.element;
const { TextControl, DateTimePicker, Button, BaseControl } = wp.components;
const textAlignmentsOptions = ["left", "center", "right"];

export default function edit(props) {
	const { attributes, className, setAttributes } = props;
	const { mainBlock, textAlignments, subBlocks, Id } = attributes;

	useEffect(() => {
		if (!Id) {
			setAttributes({ Id: Date.now() });
		}
	}, []);

	const setTextAlignment = event => {
		const selected = event.target.querySelector("option:checked");
		setAttributes({ textAlignment: selected.value });
		event.preventDefault();
	};

	function setSubContent(value, type, index) {
		let nextSubBlocks = [...subBlocks];
		nextSubBlocks[index][type] = value;
		setAttributes({ subBlocks: nextSubBlocks });
	}

	function getSubTexts(params) {
		return subBlocks.map((block, index) => {
			return (
				<div class="text-input">
					<TextControl
						label="Name"
						value={block.label}
						onChange={value => {
							setSubContent(value, "label", index);
						}}
					></TextControl>
					<TextControl
						label="short"
						value={block.short}
						onChange={value => {
							setSubContent(value, "short", index);
						}}
					></TextControl>
					<p>This will be hidden behind </p>
					<RichText
						id="contentBlock"
						placeholder="Thi will be hidden behind the read more section"
						value={subBlocks[index].content}
						onChange={content => setSubContent(content, "content", index)}
					/>
				</div>
			);
		});
	}

	return (
		<div>
			<p>Head</p>
			<div className="text-input">
				<RichText
					id="introBlock"
					placeholder="Thi text will always be visible"
					value={mainBlock}
					onChange={mainBlock => setAttributes({ mainBlock })}
				/>
			</div>
			<p>Content</p>
			{getSubTexts()}
		</div>
	);
}
