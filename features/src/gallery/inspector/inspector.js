const { InspectorControls, MediaPlaceholder } = wp.blockEditor;
const { Button, ButtonGroup } = wp.components;
const { useState } = wp.element;
import getSortFunction from "../helper/sortfunction";

export default function Inspector({ setAttributes, attributes, sortImages }) {
	const { sort, images } = attributes;
	const [update, setUpdate] = useState(true);

	function isActiveSort(params) {
		return sort === params;
	}

	function setSortAlo(_sort) {
		setAttributes({ sort: _sort });
		sortImages(_sort);
	}

	function setImages(i) {
		if (update) {
			setUpdate(false);
			let pharsed = i.map(element => {
				let imgObject = {};
				imgObject.sizes = element.sizes;
				imgObject.fileName = element.url.split("/").slice(-1)[0];
				imgObject.alt = "";
				imgObject.id = element.id;

				return imgObject;
			});
			let sorted = pharsed.sort(getSortFunction(sort));
			setAttributes({ images: [...images, ...sorted] });
			setTimeout(() => {
				setUpdate(true);
			}, 200);
		}
	}

	return (
		<div>
			<InspectorControls>
				<br></br>
				<h3>Sort</h3>
				<ButtonGroup>
					<Button
						isSmall
						isPrimary={isActiveSort("<")}
						onClick={() => setSortAlo("<")}
					>
						{"<"}
					</Button>
					<Button
						isSmall
						isPrimary={isActiveSort(">")}
						onClick={() => setSortAlo(">")}
					>
						{">"}
					</Button>
				</ButtonGroup>
				<br></br>
				<MediaPlaceholder
					onSelect={el => {
						setImages(el);
					}}
					allowedTypes={["image"]}
					multiple={true}
					labels={{ title: "The Image" }}
					isAppender
				></MediaPlaceholder>
			</InspectorControls>

			{!(images.length > 0) && (
				<MediaPlaceholder
					onSelect={el => {
						setImages(el);
					}}
					allowedTypes={["image"]}
					multiple={true}
					labels={{ title: "The Image" }}
				></MediaPlaceholder>
			)}
		</div>
	);
}
