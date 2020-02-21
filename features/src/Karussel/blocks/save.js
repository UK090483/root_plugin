const { InnerBlocks } = wp.blockEditor;

export default function save({ attributes }) {
	const {
		images,
		imageSrc,
		focalPoint,
		videoUrl,
		showVideo,
		height,
		heightUnit
	} = attributes;

	const x = Math.round(focalPoint.x * 100) + "%";
	const y = Math.round(focalPoint.y * 100) + "%";

	const getImages = () => {
		return imageSrc.map((sizes, index) => {
			function getClass() {
				return index === 0 ? "karussell-image active" : "karussell-image ";
			}
			return (
				<div
					className={getClass()}
					style={{
						backgroundImage: `url(${sizes.full.url})`
					}}
				></div>
			);
		});
	};

	return (
		<div className={"karussell-wrap"} style={{ height: height + heightUnit }}>
			{imageSrc.length > 0 && getImages()}
		</div>
	);
}
