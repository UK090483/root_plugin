import Inspector from "../inspector/inspector";
import makeId from "../../../shared/makeId";
import style from "../../../freeGrid/blocks/helper/style";
const { InspectorControls } = wp.blockEditor;
const { InnerBlocks } = wp.blockEditor;
const { useSelect } = wp.data;
const { useEffect, Fragment, useRef, useState } = wp.element;
const { doAction } = wp.hooks;
let layouts = ["desktop", "tablet", "mobile"];

export default function(props) {
	const { attributes, setAttributes, clientId, isSelected } = props;
	const {
		backgtroundImage,
		focalPoint,
		backgroundSize,
		overlay,
		overlayText,
		id
	} = attributes;
	const {
		device,
		parentAttr,
		parentClientId,
		isEditorSidebarOpened
	} = useSelect(select => {
		const { getBlockAttributes, getBlockRootClientId } = select(
			"core/block-editor"
		);
		const { isEditorSidebarOpened } = select("core/edit-post");
		let blockRootClientId = getBlockRootClientId(clientId);
		let parentAttr = getBlockAttributes(blockRootClientId);

		const { device } = parentAttr;
		return {
			parentClientId: blockRootClientId,
			device: device,
			parentAttr: parentAttr,
			isEditorSidebarOpened: isEditorSidebarOpened()
		};
	});

	const myAttributes = parentAttr.childrenAttributes.find(c => c.id === id);
	const gridColumnStart = myAttributes[`gridColumnStart${device}`];
	const gridColumnEnd = myAttributes[`gridColumnEnd${device}`];
	const gridRowStart = myAttributes[`gridRowStart${device}`];
	const gridRowEnd = myAttributes[`gridRowEnd${device}`];
	// const ownHeight = attributes[`ownHeight${device}`];
	const ownRatio = attributes[`ratio${device}`];
	const [ownHeight, setOwnHeight] = useState(0);

	const gap = parentAttr[`gap${device}`];
	const ratio =
		parentAttr[`ratio${device}`][0] / parentAttr[`ratio${device}`][1];

	const columns = parentAttr[`columns${device}`];
	const rows = parentAttr[`rows${device}`];

	const [hovered, setHovered] = useState(false);

	function getFocalPoint() {
		let x = focalPoint.x * 100;
		let y = focalPoint.y * 100;
		return `${x}% ${y}%`;
	}

	const innerB = useSelect(select => {
		return select("core/block-editor").getBlock(clientId).innerBlocks;
	});

	const ref = useRef();

	const hasChildBlocks = useSelect(select => {
		const { getBlockOrder } = select("core/block-editor");
		return getBlockOrder(clientId).length > 0;
	});

	useEffect(() => {
		if (attributes.clientId === "") {
			setAttributes({ clientId: makeId() });
		}
	}, []);

	// useEffect(() => {
	// 	if (ref.current) {
	// 		let oH = setComputedHeight(ref.current);
	// 	}
	// }, [
	// 	ref,
	// 	gap,
	// 	ratio,
	// 	columns,
	// 	device,
	// 	innerB,
	// 	isEditorSidebarOpened,
	// 	parentAttr.childrenAttributes
	// ]);

	const setComputedHeight = wrap => {
		let res = 0;
		if (attributes[`autoHeight${device}`]) {
			/// FREE HIGHT
			let sizes = wrap.getBoundingClientRect();

			var styles = window.getComputedStyle(wrap.parentElement.parentElement);
			var margin =
				parseFloat(styles["marginTop"]) + parseFloat(styles["marginBottom"]);
			res = sizes.height;
			// setOwnHeight(hightMesured);
		} else {
			let sizes = wrap.getBoundingClientRect();
			let width = sizes.width;
			let hightMesured = sizes.height;
			let gapHeight = (gridRowEnd - 1) * parentAttr[`gap${device}`];
			let gapWidth = (gridColumnEnd - 1) * parentAttr[`gap${device}`];
			let width1Box = (width - gapWidth) / gridColumnEnd;
			let height1Box = width1Box * ratio;
			let height = height1Box * gridRowEnd + gapHeight;

			res = Math.max(height, hightMesured);
		}
		if (res !== ownHeight) {
			setOwnHeight(res);
			// setAttributes({
			// 	[`ownHeight${device}`]: res
			// });
		}
	};

	return (
		<Fragment>
			<div
				onMouseEnter={() => {
					setHovered(true);
				}}
				onMouseLeave={() => {
					setHovered(false);
				}}
				style={{
					zIndex: isSelected ? 100 : 0,
					// minHeight: ownHeight,
					margin: "-28px -15px -28px -15px",
					backgroundSize: backgroundSize,
					backgroundRepeat: "no-repeat",
					backgroundPosition: getFocalPoint(),
					backgroundImage:
						Object.keys(backgtroundImage).length !== 0 &&
						`url(${backgtroundImage.full.url})`,
					position: "relative"
				}}
				className={`ku-freegrid-item-wrap-${id}`}
			>
				{hovered && (
					<Fragment>
						<div
							style={{
								display: "flex",
								alignItems: "center",
								justifyContent: "center",
								borderRadius: "50%",
								width: 50,
								height: 50,
								position: "absolute",
								right: -15,
								top: -15,
								zIndex: 500,
								backgroundColor: "red",
								opacity: 1,
								transition: "all 1s"
							}}
							className={"hoverbox"}
						>
							{"select"}
						</div>
					</Fragment>
				)}
				{overlay && <div className={"overlay-box"}>{overlayText}</div>}
				<Fragment>
					<Inspector
						{...props}
						device={device}
						clientId={clientId}
						parentId={parentClientId}
					></Inspector>
					<div ref={ref}>
						<InnerBlocks
							templateLock={false}
							renderAppender={
								!hasChildBlocks && isSelected
									? () => <InnerBlocks.ButtonBlockAppender />
									: false
							}
						/>
					</div>
				</Fragment>
			</div>
		</Fragment>
	);
}
