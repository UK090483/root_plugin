const { PanelBody, Button, FocalPointPicker } = wp.components;
const { MediaUpload } = wp.editor;
const { __ } = wp.i18n;

export default function PicMedia({ attributes, setAttributes }) {
	const { imageId, videoId, imageSrc, focalPoint, images } = attributes;

	function onSelectVideo(media) {
		setAttributes({
			videoUrl: media.url
		});
	}

	function onSelectImage(media) {
		let NextImages = [];
		Object.keys(media.sizes).forEach(key => {
			if (key !== "thumbnail") {
				NextImages.push({ ...media.sizes[key] });
			}
		});
		console.log("select----------------");
		console.log(media.sizes);
		// NextImages.sort((a, b) => {
		// 	return a.width < b.width ? -1 : a.width > b.width ? 1 : 0;
		// });
		console.log(NextImages);
		console.log("select----------------");
		setAttributes({
			images: NextImages
		});
	}

	return (
		<PanelBody title={"Image"} initialOpen={false}>
			{images.length > 0 && (
				<FocalPointPicker
					url={images[0].url}
					dimensions={{ width: 300, height: 200 }}
					value={focalPoint}
					onChange={focalPoint => setAttributes({ focalPoint })}
				/>
			)}
			<MediaUpload
				title={__("Select Image")}
				onSelect={onSelectImage}
				allowedTypes={["image"]}
				value={imageId}
				render={({ open }) => (
					<Button isDefault onClick={open}>
						{!imageId ? __("Select Image") : __("Replace image")}
					</Button>
				)}
			/>
			<MediaUpload
				title={__("Select Video")}
				onSelect={onSelectVideo}
				allowedTypes={["video"]}
				value={videoId}
				render={({ open }) => (
					<Button isDefault onClick={open}>
						{!imageId ? __("Select Video") : __("Replace Video")}
					</Button>
				)}
			/>
		</PanelBody>
	);
}
