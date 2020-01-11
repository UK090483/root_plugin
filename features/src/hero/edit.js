import InspectorC from "./inspectorControls/InspectorC";
const { MediaPlaceholder, InnerBlocks } = wp.blockEditor;
import metadata from "./meta";

export default function edit(props) {
	const { attributes } = props;
	const { videoUrl, showVideo, height, heightUnit, images } = attributes;
	console.log(metadata);
	return (
		<div>
			<InspectorC {...props}></InspectorC>

			<div className={"hero-wrap"} style={{ height: height + heightUnit }}>
				{images.length > 0 && (
					<div
						className={"hero-image"}
						style={{
							backgroundImage: `url(${images[0].url})`
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
