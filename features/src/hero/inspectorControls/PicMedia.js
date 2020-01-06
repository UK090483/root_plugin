const { PanelBody, Button } = wp.components;
const { MediaUpload } = wp.editor;
const { __ } = wp.i18n;

export default function PicMedia({ attributes, setAttributes }) {
	const { imageId, videoId } = attributes;

	function onSelectImage(media) {
		let source = makeSource(media.sizes);

		setAttributes({
			imageSrc: source.small,
			imageSrcSet: source.srcSet
		});
	}
	function onSelectVideo(media) {
		setAttributes({
			videoUrl: media.url
		});
	}

	function makeSource(sizes) {
		let srcSet = "";
		let small = "";
		let smallest = 10000;
		Object.keys(sizes).forEach(key => {
			if (key !== "thumbnail") {
				if (sizes[key].width < smallest) {
					small = sizes[key].url;
					smallest = sizes[key].width;
				}
				srcSet += sizes[key].url + " " + (sizes[key].width + 100) + "w, ";
			}
		});
		return { srcSet: srcSet, small: small };
	}

	return (
		<PanelBody title={"Image"} initialOpen={false}>
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
