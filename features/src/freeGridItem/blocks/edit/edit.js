import Inspector from "../inspector/inspector";
import makeId from "../../../shared/makeId";
const { InspectorControls } = wp.blockEditor;
const { InnerBlocks } = wp.blockEditor;
const { useSelect } = wp.data;
const { useEffect, Fragment, useRef, useState } = wp.element;
let layouts = ["desktop", "tablet", "mobile"];
import Positionator from "../inspector/Positionator";

export default function(props) {
	const { attributes, setAttributes, clientId, isSelected } = props;
	const {
		backgtroundImage,
		focalPoint,
		backgroundSize,
		overlay,
		overlayText
	} = attributes;
	const { device, parentAttr, isEditorSidebarOpened } = useSelect(select => {
		const { getBlockAttributes, getBlockRootClientId } = select(
			"core/block-editor"
		);
		const { isEditorSidebarOpened } = select("core/edit-post");
		let blockRootClientId = getBlockRootClientId(clientId);
		let parentAttr = getBlockAttributes(blockRootClientId);

		const { device } = parentAttr;
		return {
			device: device,
			parentAttr: parentAttr,
			isEditorSidebarOpened: isEditorSidebarOpened()
		};
	});

	const parentId = parentAttr.clientId;
	const gridIndex = attributes[`gridIndex${device}`];
	const gridColumnStart = attributes[`gridColumnStart${device}`];
	const gridColumnEnd = attributes[`gridColumnEnd${device}`];
	const gridRowStart = attributes[`gridRowStart${device}`];
	const gridRowEnd = attributes[`gridRowEnd${device}`];
	const ownHight = attributes[`ownHeight${device}`];
	const ownRatio = attributes[`ratio${device}`];

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

	useEffect(() => {
		if (ref.current) {
			setComputedHeight(ref.current);
		}
	}, [
		ref,
		gap,
		ratio,
		columns,
		gridColumnEnd,
		gridRowEnd,
		device,
		innerB,
		isEditorSidebarOpened
	]);

	useEffect(() => {
		let gapMargin = getGapMargin();
		if (attributes[`gapMargin${device}`] !== gapMargin) {
			setAttributes({ [`gapMargin${device}`]: gapMargin });
		}
	}, [
		gap,
		columns,
		rows,
		gridColumnStart,
		gridColumnEnd,
		gridRowStart,
		gridRowEnd
	]);

	function getGapMargin() {
		let mbox = (gap * (columns - 1 || 1)) / columns;
		let mb = gridRowStart + (gridRowEnd - 1) < rows ? gap : 0;
		let ml = mbox * ((gridColumnStart - 1) / (columns - 1 || 1));
		let mr =
			mbox *
			((columns - (gridColumnStart + gridColumnEnd - 1)) / (columns - 1 || 1));
		return `0 ${mr}px ${mb}px ${ml}px`;
	}

	const setComputedHeight = wrap => {
		if (attributes[`autoHeight${device}`]) {
			/// FREE HIGHT
			let sizes = wrap.getBoundingClientRect();

			var styles = window.getComputedStyle(wrap.parentElement.parentElement);
			var margin =
				parseFloat(styles["marginTop"]) + parseFloat(styles["marginBottom"]);
			let hightMesured = sizes.height;
			setAttributes({
				[`ownHeight${device}`]: hightMesured,
				[`minHeight${device}`]: 0,
				[`ratio${device}`]: "0%"
			});
		} else {
			let sizes = wrap.getBoundingClientRect();
			let width = sizes.width;
			let hightMesured = sizes.height;
			let gapHeight = (gridRowEnd - 1) * parentAttr[`gap${device}`];
			let gapWidth = (gridColumnEnd - 1) * parentAttr[`gap${device}`];
			let width1Box = (width - gapWidth) / gridColumnEnd;
			let height1Box = width1Box * ratio;
			let height = height1Box * gridRowEnd + gapHeight;

			height = Math.max(height, hightMesured);
			if (ownHight !== height) {
				setAttributes({
					[`ownHeight${device}`]: height
				});
			}

			let r = (ratio / gridColumnEnd) * gridRowEnd * 100;

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
				zIndex: isSelected ? 100 : 0,
				minHeight: ownHight,
				margin: "-28px -15px -28px -15px",
				backgroundSize: backgroundSize,
				backgroundRepeat: "no-repeat",
				backgroundPosition: getFocalPoint(),
				backgroundImage:
					Object.keys(backgtroundImage).length !== 0 &&
					`url(${backgtroundImage.full.url})`,
				position: "relative"
			}}
			className={"ku-box"}
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
					parentId={parentId}
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
	);
}
