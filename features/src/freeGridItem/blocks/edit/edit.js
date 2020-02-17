import Inspector from "../inspector/inspector";
import makeId from "../../../shared/makeId";
const { InspectorControls } = wp.blockEditor;
const { InnerBlocks } = wp.blockEditor;
const { useSelect } = wp.data;
const { useEffect, Fragment, useRef, useState } = wp.element;
let layouts = ["desktop", "tablet", "mobile"];

export default function(props) {
	const { attributes, setAttributes, clientId, isSelected } = props;
	const {
		device,
		isActive,
		backgtroundImage,
		focalPoint,
		backgroundSize,
		overlay,
		overlayText
	} = attributes;
	const gridColumnStart = attributes[`gridColumnStart${device}`];
	const gridColumnEnd = attributes[`gridColumnEnd${device}`];
	const gridRowStart = attributes[`gridRowStart${device}`];
	const gridRowEnd = attributes[`gridRowEnd${device}`];
	const ownHight = attributes[`ownHeight${device}`];
	const ownRatio = attributes[`ratio${device}`];

	const [hovered, setHovered] = useState(false);

	function getFocalPoint() {
		let x = focalPoint.x * 100;
		let y = focalPoint.y * 100;
		return `${x}% ${y}%`;
	}

	const innerB = useSelect(select => {
		return select("core/block-editor").getBlock(clientId).innerBlocks;
	});

	const [height, setHeight] = useState(100);

	const ref = useRef();
	const { _device, parentAttr } = useSelect(select => {
		const { getBlockAttributes, getBlockRootClientId } = select(
			"core/block-editor"
		);
		let parentAttr = getBlockAttributes(getBlockRootClientId(clientId));
		const { device } = parentAttr;
		return { _device: device, parentAttr: parentAttr };
	});
	const gap = parentAttr[`gap${device}`];
	const ratio =
		parentAttr[`ratio2${device}`][0] / parentAttr[`ratio2${device}`][1];
	const columns = parentAttr[`columns${device}`];

	const rootId = useSelect(select => {
		const { getBlockRootClientId } = select("core/block-editor");
		return getBlockRootClientId(clientId);
	});
	const hasChildBlocks = useSelect(select => {
		const { getBlockOrder } = select("core/block-editor");
		return getBlockOrder(clientId).length > 0;
	});

	useEffect(() => {
		if (attributes.device !== _device) {
			setAttributes({ device: _device });
		}
	}, [_device]);

	useEffect(() => {
		if (attributes.clientId === "") {
			setAttributes({ clientId: makeId() });
		}
	}, []);

	useEffect(() => {
		if (ref.current) {
			setComputedHeight(ref.current);
		}
	}, [ref, gap, ratio, columns, gridColumnEnd, gridRowEnd, device, innerB]);

	function resetWrap() {
		wp.data
			.dispatch("core/block-editor")
			.updateBlockAttributes(rootId, { size: Math.random() });
	}

	const setComputedHeight = wrap => {
		if (attributes[`autoHeight${device}`]) {
			/// FREE HIGHT
		} else {
			let sizes = wrap.getBoundingClientRect();
			let width = sizes.width;
			let hightMesured = sizes.height;
			let gapHeight =
				(attributes[`gridRowEnd${device}`] - 1) * parentAttr[`gap${device}`];
			let gapWidth =
				(attributes[`gridColumnEnd${device}`] - 1) * parentAttr[`gap${device}`];
			let width1Box = (width - gapWidth) / attributes[`gridColumnEnd${device}`];
			let height1Box = width1Box * ratio;
			let height = height1Box * attributes[`gridRowEnd${device}`] + gapHeight;

			height = Math.max(height, hightMesured);
			if (ownHight !== height) {
				setAttributes({ [`ownHeight${device}`]: height });
			}

			let r =
				(ratio / attributes[`gridColumnEnd${device}`]) *
				attributes[`gridRowEnd${device}`] *
				100;

			let gabSum = gapHeight - gapWidth * (r / 100);

			let ratioString = `calc(${r}% + ${gabSum}px )`;

			if (ownRatio !== ratioString) {
				setAttributes({ [`ratio${device}`]: ratioString });
			}
		}
	};

	return (
		<div
			onMouseEnter={() => {
				setHovered(true);
			}}
			onMouseLeave={() => {
				setHovered(false);
			}}
			style={{
				minHeight: ownHight,
				margin: "-28px -15px -28px -15px",
				backgroundSize: backgroundSize,
				backgroundRepeat: "no-repeat",
				backgroundPosition: getFocalPoint(),
				backgroundImage: `url(${backgtroundImage})`,
				position: "relative"
			}}
			className={"ku-box"}
		>
			{hovered && (
				<div
					style={{
						position: "absolute",
						right: 0,
						top: 0,
						zIndex: 500,
						backgroundColor: "red"
					}}
					className={"hoverbox"}
				>
					{"select"}
				</div>
			)}
			{overlay && <div className={"overlay-box"}>{overlayText}</div>}
			<Fragment>
				<Inspector {...props} device={device} resetWrap={resetWrap}></Inspector>
				<div ref={ref}>
					<InnerBlocks
						renderAppender={
							!hasChildBlocks && isSelected
								? () => <InnerBlocks.ButtonBlockAppender />
								: () => <div style={{ height: 0, width: 0 }}></div>
						}
					/>
				</div>
			</Fragment>
		</div>
	);
}
