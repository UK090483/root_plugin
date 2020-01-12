import InspectorC from "./inspectorControls/InspectorC";
const { MediaPlaceholder, InnerBlocks } = wp.blockEditor;
import metadata from "./meta";

export default function edit(props) {
	const { attributes } = props;
	const {
		videoUrl,
		showVideo,
		height,
		heightUnit,
		images,
		focalPoint
	} = attributes;
	console.log(images);

	function getBackgroundPosition() {
		return (
			Math.round(focalPoint.x * 100) +
			"%" +
			" " +
			Math.round(focalPoint.y * 100) +
			"%"
		);
	}

	return (
		<div>
			<InspectorC {...props}></InspectorC>

			<div className={"hero-wrap"} style={{ height: height + heightUnit }}>
				{images.length > 0 && (
					<div
						className={"hero-image"}
						style={{
							backgroundPosition: getBackgroundPosition(),
							backgroundImage: `url(${images[images.length - 1].url})`
						}}
					></div>
				)}
				{videoUrl && showVideo && (
					<video
						autoPlay
						muted
						playsinline
						loop
						className={"hero-image"}
						src={videoUrl}
					></video>
				)}
				<div className={"hero_innerblock"}>
					<InnerBlocks />
				</div>
			</div>
		</div>
	);
}
