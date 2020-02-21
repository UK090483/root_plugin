import InspectorC from "./inspectorControls/InspectorC";
const { MediaPlaceholder, InnerBlocks } = wp.blockEditor;
const { useState, useEffect } = wp.element;
import metadata from "./meta";

export default function edit(props) {
	const { attributes } = props;
	const {
		videoUrl,
		showVideo,
		height,
		heightUnit,
		images,
		focalPoint,
		imageSrc
	} = attributes;
	const [activePic, setActivePic] = useState(0);
	useEffect(() => {
		setTimeout(() => {
			setActivePic(activePic + 1 > imageSrc.length - 1 ? 0 : activePic + 1);
		}, 5000);
	}, [activePic]);

	const getImages = () => {
		return imageSrc.map((sizes, index) => {
			return (
				<div
					className={"karussell-image"}
					style={{
						opacity: index === activePic ? 1 : 0,
						transition: "opacity 1.5s",
						backgroundImage: `url(${sizes.full.url})`
					}}
				></div>
			);
		});
	};
	return (
		<div>
			<InspectorC {...props}></InspectorC>

			<div className={"karussell-wrap"} style={{ height: height + heightUnit }}>
				{imageSrc.length > 0 && getImages()}
			</div>
		</div>
	);
}
