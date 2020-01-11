const { InnerBlocks } = wp.blockEditor;

export default function save({ attributes }) {
	const {
		images,
		imageSrc,
		videoUrl,
		showVideo,
		height,
		heightUnit
	} = attributes;

	function makeMediaQuerrys() {}
	let s = `<style>
	.hero-image{
		backgroundImage: url(${imageSrc})
	}
	</style>`;

	return (
		<div className="hero-wrap" style={{ height: height + heightUnit }}>
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
