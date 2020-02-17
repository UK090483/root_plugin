const { InnerBlocks } = wp.blockEditor;

export default function save({ attributes }) {
	const {
		images,
		imageSrc,
		focalPoint,
		videoUrl,
		showVideo,
		height,
		heightUnit,
		width,
		widthUnit,
		marginTop,
		marginBottom,
		marginLeft,
		marginRight,
		backgroundSize,
		backgroundColor,
		spaceAround
	} = attributes;

	const x = Math.round(focalPoint.x * 100) + "%";
	const y = Math.round(focalPoint.y * 100) + "%";

	function getStyle() {
		let style = `
		`;
	}

	return (
		<div
			className="ku-image-wrap"
			style={{
				height: height + heightUnit,
				width: width + widthUnit,
				marginTop: marginTop,
				marginBottom: marginBottom,
				marginLeft: marginLeft,
				marginRight: marginRight,
				backgroundSize: backgroundSize,
				backgroundColor: backgroundColor
			}}
		>
			{images.length > 0 && (
				<div
					className={"ku-image-image"}
					style={{
						backgroundSize: backgroundSize,
						backgroundPosition: `${x} ${y}`,
						backgroundImage: `url(${images[images.length - 1].url})`,
						border: `${backgroundColor} solid ${spaceAround}px`
					}}
				></div>
			)}
		</div>
	);
}
