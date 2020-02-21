import ButtonGroup from "../../../shared/ButtonGroup";
const { PanelBody, Button, FocalPointPicker } = wp.components;
const { MediaUpload } = wp.blockEditor;
const { __ } = wp.i18n;

export default function PicMedia(props) {
	const { setAttributes, attributes, device, resetWrap } = props;
	const { backgtroundImage, focalPoint, backgroundSize } = attributes;

	function onSelectVideo(media) {
		setAttributes({
			videoUrl: media.url
		});
	}

	function onSelectImage(media) {
		console.log(media.sizes);
		setAttributes({ backgtroundImage: media.sizes });
	}

	return (
		<PanelBody title={"Image"} initialOpen={false}>
			{backgtroundImage && (
				<FocalPointPicker
					url={backgtroundImage}
					dimensions={{ width: 300, height: 200 }}
					value={focalPoint}
					onChange={focalPoint => {
						setAttributes({ focalPoint });
					}}
				/>
			)}
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

			<ButtonGroup
				items={[
					{ value: "cover", label: "Cover" },
					{ value: "contain", label: "Contain" }
				]}
				activeItem={backgroundSize}
				onChange={backgroundSize => setAttributes({ backgroundSize })}
			></ButtonGroup>
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
