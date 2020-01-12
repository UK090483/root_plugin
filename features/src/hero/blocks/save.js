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
	function makeMediaQuerrys() {}
	let s = `
	.hero-image{
		background-position: ${x} ${y};
		background-image: url(${images[images.length - 1].url});
	}
	`;

	return (
		<div className="hero-wrap" style={{ height: height + heightUnit }}>
			<style>{s}</style>
			<div className="hero-paralax-wrap">
				<div className={"hero-image"}></div>
				{videoUrl && showVideo && (
					<video
						autoPlay
						muted
						playsinline
						loop
						className={"hero-image hero-image-video"}
						src={videoUrl}
					></video>
				)}
			</div>
			<div class="hero_innerblock">
				<InnerBlocks.Content />
			</div>
		</div>
	);
}
