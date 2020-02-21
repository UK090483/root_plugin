const { PanelBody, Button, FocalPointPicker } = wp.components;
const { MediaUpload } = wp.editor;
const { __ } = wp.i18n;

export default function PicMedia({ attributes, setAttributes }) {
	const { imageId, videoId, imageSrc, focalPoint, images } = attributes;

	function onSelectImage(media) {
		let NextImages = [...images];
		let nextSizes = [...imageSrc];
		// Object.keys(media.sizes).forEach(key => {
		// 	if (key !== "thumbnail") {
		// 		NextImages.push({ ...media.sizes[key] });
		// 	}
		// });

		media.forEach(pic => {
			let id = pic.id;
			if (!!!NextImages.find(_id => _id === id)) {
				NextImages.push(id);
				nextSizes.push(pic.sizes);
			}
		});

		setAttributes({
			images: NextImages,
			imageSrc: nextSizes
		});
	}

	return (
		<PanelBody title={"Image"} initialOpen={false}>
			{/* {images.length > 0 && (
				<FocalPointPicker
					url={images[0].url}
					dimensions={{ width: 300, height: 200 }}
					value={focalPoint}
					onChange={focalPoint => setAttributes({ focalPoint })}
				/>
			)} */}
			<MediaUpload
				title={__("Select Image")}
				onSelect={onSelectImage}
				allowedTypes={["image"]}
				value={imageId}
				multiple
				render={({ open }) => (
					<Button isDefault onClick={open}>
						{!imageId ? __("Select Image") : __("Replace image")}
					</Button>
				)}
			/>
		</PanelBody>
	);
}
