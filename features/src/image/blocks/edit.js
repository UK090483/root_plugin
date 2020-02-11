import InspectorC from "./inspectorControls/InspectorC";
const { MediaPlaceholder, InnerBlocks } = wp.blockEditor;
import metadata from "./meta";
const { useSelect } = wp.data;
const { useEffect, Fragment, useRef, useState } = wp.element;

export default function edit(props) {
	const { attributes, clientId } = props;
	const {
		videoUrl,
		showVideo,
		height,
		heightUnit,
		images,
		focalPoint,
		width,
		widthUnit,
		marginTop,
		marginBottom,
		marginLeft,
		marginRight,
		backgroundSize
	} = attributes;

	const [heightfromC, setheightfromC] = useState(100);
	const ref = useRef();
	const { rootId } = useSelect(select => {
		const { getBlockAttributes, getBlockRootClientId } = select(
			"core/block-editor"
		);

		return { rootId: getBlockRootClientId(clientId) };
	});

	useEffect(() => {
		let rootelement = document.querySelector(`#block-${rootId}`);
		console.log(rootelement);

		if (rootelement) {
			setTimeout(() => {
				let compStyles = window.getComputedStyle(rootelement);

				setheightfromC(compStyles.getPropertyValue("height").replace("px", ""));
			}, 500);
		}
	}, [ref]);

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

			<div
				ref={ref}
				className={"ku-image-wrap"}
				style={{
					height:
						rootId && heightUnit === "%"
							? heightfromC * (height / 100)
							: height + heightUnit,
					width: rootId ? "100%" : width + widthUnit,
					marginTop: rootId ? marginTop - 28 : marginTop,
					marginBottom: rootId ? marginBottom - 28 : marginBottom,
					marginLeft: marginLeft,
					marginRight: marginRight
				}}
			>
				{images.length > 0 && (
					<div
						className={"ku-image-image"}
						style={{
							backgroundPosition: getBackgroundPosition(),
							backgroundImage: `url(${images[images.length - 1].url})`,
							backgroundSize: backgroundSize
						}}
					></div>
				)}
			</div>
		</div>
	);
}
