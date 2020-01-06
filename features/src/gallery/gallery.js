import "./style.scss";
import "./editor.scss";
import Inspector from "./inspector/inspector";
import Modal from "./inspector/Modal";
import getSortFunction from "./helper/sortfunction";

const { registerBlockType } = wp.blocks;
const { Button, ButtonGroup } = wp.components;
const { MediaPlaceholder } = wp.blockEditor;
const { useState, useEffect } = wp.element;

registerBlockType("cgb/gallery", {
	title: "Amh Logo-Gallery",
	icon: "smiley",
	category: "kubase-blocks",
	supports: {
		align: ["wide", "full"]
	},

	attributes: {
		images: {
			type: "array",
			default: []
		},
		sort: {
			type: "string",
			default: ">"
		},
		sortItem: {
			type: "string",
			default: "fileName"
		}
	},

	edit: function(props) {
		const { setAttributes, attributes, isSelected } = props;
		const { images, sort } = attributes;
		const [isOpen, setOpen] = useState(false);
		const [selectedItem, setSelectedItem] = useState(-1);

		useEffect(() => {
			!isSelected && setSelectedItem(-1);
		});

		function getImages() {
			return images.map((i, index) => {
				let url = i.sizes.hasOwnProperty("medium")
					? i.sizes.medium.url
					: i.sizes.full.url;

				let wrapClass =
					i.id === selectedItem
						? "gallerie-item gallerie-item-selected"
						: "gallerie-item";
				return (
					<div
						key={i.id}
						className={wrapClass}
						onClick={() => setSelectedItem(i.id)}
					>
						<img className={"image"} src={url}></img>
						<div
							className={"gallerie-item-edit"}
							onClick={() => setModal(index)}
						>
							<Button isSmall isPrimary>
								Edit
							</Button>
						</div>
					</div>
				);
			});
		}

		function sortImages(_sort) {
			setAttributes({ images: images.sort(getSortFunction(_sort || sort)) });
		}

		function setModal() {
			setOpen(true);
		}

		return (
			<div className={"gallerie-editor-wrap"}>
				<Inspector
					setAttributes={setAttributes}
					attributes={attributes}
					sortImages={sortImages}
				></Inspector>
				<Modal
					setAttributes={setAttributes}
					selectedItem={selectedItem}
					setSelectedItem={setSelectedItem}
					isOpen={isOpen}
					setOpen={setOpen}
					images={images}
					sortImages={sortImages}
				></Modal>

				{images.length > 0 && (
					<div className={"gallerie-wrap"}>{getImages()}</div>
				)}
			</div>
		);
	},

	save: function({ attributes }) {
		function getImages() {
			return attributes.images.map(i => {
				let url = i.sizes.hasOwnProperty("medium")
					? i.sizes.medium.url
					: i.sizes.full.url;
				return (
					<div className={"gallerie-item"}>
						<noscript>
							<img className={"image"} src={url}></img>
						</noscript>
						<img className={"lazy"} data-src={url}></img>
					</div>
				);
			});
		}

		return (
			<div>
				{attributes.images.length > 0 && (
					<div className={"gallerie-wrap"}>{getImages()}</div>
				)}
			</div>
		);
	}
});
