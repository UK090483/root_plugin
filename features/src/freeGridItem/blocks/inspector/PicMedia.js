const { PanelBody, Button, FocalPointPicker } = wp.components;
const { MediaUpload } = wp.editor;
const { __ } = wp.i18n;

export default function PicMedia(props) {
	const { setAttributes, attributes, device, resetWrap } = props;
	const { backgtroundImage } = attributes;

	function onSelectVideo(media) {
		setAttributes({
			videoUrl: media.url
		});
	}

	function onSelectImage(media) {
		setAttributes({ backgtroundImage: media.url });
		// let NextImages = [];
		// Object.keys(media.sizes).forEach(key => {
		// 	if (key !== "thumbnail") {
		// 		NextImages.push({ ...media.sizes[key] });
		// 	}
		// });
		// console.log("select----------------");
		// console.log(media.sizes);
		// console.log(NextImages);
		// console.log("select----------------");
		// setAttributes({
		// 	images: NextImages
		// });
	}

	return (
		<PanelBody title={"Image"} initialOpen={false}>
			{/* {backgtroundImage && (
				<FocalPointPicker
					url={backgtroundImage}
					dimensions={{ width: 300, height: 200 }}
					value={focalPoint}
					// onChange={focalPoint => setAttributes({ focalPoint })}
				/>
			)} */}
			<MediaUpload
				title={__("Select Image")}
				onSelect={onSelectImage}
				allowedTypes={["image"]}
				render={({ open }) => (
					<Button isDefault onClick={open}>
						select Image
					</Button>
				)}
			/>
			{/* <MediaUpload
				title={__("Select Video")}
				onSelect={onSelectVideo}
				allowedTypes={["video"]}
				// value={videoId}
				render={({ open }) => (
					<Button isDefault onClick={open}>
						{!imageId ? __("Select Video") : __("Replace Video")}
					</Button>
				)}
			/> */}
		</PanelBody>
	);
}
