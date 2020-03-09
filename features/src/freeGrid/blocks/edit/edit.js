import Inspector from "../inspector/inspector";
import Placeholder from "./Placeholder";
import makeId from "../../../shared/makeId";
import move from "../inspector/move/move";

const { InnerBlocks, BlockControls } = wp.blockEditor;
const { useState, useEffect, useRef, Fragment } = wp.element;
const { useSelect } = wp.data;
const { addAction, removeAction } = wp.hooks;
const { dispatch } = wp.data;

const ALLOWED_BLOCKS = ["kubase/free-grid-item-nogrid"];

export default function(props) {
	const { setAttributes, attributes, clientId } = props;
	const { device } = attributes;
	const gap = attributes[`gap${device}`];
	const columns = attributes[`columns${device}`];
	const rows = attributes[`rows${device}`];
	const ratio =
		attributes[`ratio${device}`][0] / attributes[`ratio${device}`][1];
	const breakingPoint = attributes[`breakingPoint${device}`];
	const marginTop = attributes[`marginTop${device}`];
	const marginBottom = attributes[`marginBottom${device}`];
	const PrefContainerRef = useRef();
	const Container = useRef();
	const [state, setState] = useState({
		containerWidth: null,
		gridTemplateRows: ""
	});
	const [activateAble, setActivateAble] = useState(false);
	const { children, isEditorSidebarOpened } = useSelect(select => {
		const { getBlock } = select("core/block-editor");
		const { isEditorSidebarOpened } = select("core/edit-post");

		return {
			children: getBlock(clientId).innerBlocks,
			isEditorSidebarOpened: isEditorSidebarOpened()
		};
	});

	useEffect(() => {
		addAction(
			"move",
			"ku-base-freeGrid",
			(direction, ItemID) => {
				move(direction, ItemID, children, device, columns, rows, clientId);
			},
			1
		);
		return () => {
			removeAction("move", "ku-base-freeGrid");
		};
	}, [children]);
	useEffect(() => {
		addAction(
			"erase",
			"ku-base-freeGrid",
			ItemID => {
				dispatch("core/block-editor").removeBlock(ItemID, false);
			},
			1
		);
		return () => {
			removeAction("move", "ku-base-freeGrid");
		};
	}, [children]);

	useEffect(() => {
		if (attributes.clientId === "") {
			setAttributes({ clientId: makeId() });
		}
	}, []);
	useEffect(() => {
		setActivateAble(false);
	}, [children]);

	useEffect(() => {
		if (Container.current) {
			let cWidth = Container.current.getBoundingClientRect().width;
			setState({
				containerWidth: cWidth,
				gridTemplateRows: comutedGridTemplateRows(cWidth)
			});
		}
	}, [Container, device, gap, ratio, children, rows, isEditorSidebarOpened]);

	function getPrefItems() {
		let activeChildren = getChildren();
		let sum = 0;
		let all = columns * rows;
		children.forEach(child => {
			if (child.attributes.isActive) {
				let c = child.attributes[`gridColumnEnd${device}`];
				let r = child.attributes[`gridRowEnd${device}`];
				sum += c * r;
			}
		});
		if (all - sum < 1) {
			return activeChildren;
		}
		var foo = new Array(all - sum);
		let placeholderHeight =
			((state.containerWidth - gap * (columns - 1)) / columns) * ratio;

		foo.fill(
			<Placeholder
				columns={columns}
				rows={rows}
				gap={gap}
				clientId={clientId}
				ratio={ratio}
				device={device}
				height={placeholderHeight}
				children={children}
				setActivateAble={setActivateAble}
			></Placeholder>
		);
		return [...activeChildren, ...foo];
	}

	function getChildren() {
		let result = [];
		children.forEach((child, index) => {
			if (child.attributes.isActive) {
				result.push(
					<div
						key={child.clientId}
						style={{
							minHeight: child.attributes[`ownHeight${device}`],
							border: "#007cba dotted 1px",
							gridColumnStart: child.attributes[`gridColumnStart${device}`],
							gridColumnEnd:
								"span " + child.attributes[`gridColumnEnd${device}`],
							gridRowStart: child.attributes[`gridRowStart${device}`],
							gridRowEnd: "span " + child.attributes[`gridRowEnd${device}`]
						}}
					></div>
				);
			}
		});
		return result;
	}

	function comutedGridTemplateRows(width) {
		let result = new Array(rows);
		let placeholderHeight = ((width - gap * (columns - 1)) / columns) * ratio;
		result.fill(placeholderHeight);
		children.forEach(child => {
			let itemRows = new Array(child.attributes[`gridRowEnd${device}`]).fill(1);

			let ownHeight =
				child.attributes[`ownHeight${device}`] /
					child.attributes[`gridRowEnd${device}`] -
				(child.attributes[`gridRowEnd${device}`] - 1) * gap;

			let index = child.attributes[`gridRowStart${device}`] - 1;

			itemRows.forEach((r, i) => {
				if (
					result[index + i] < ownHeight ||
					(child.attributes[`autoHeight${device}`] &&
						result[index + i] === placeholderHeight)
				) {
					result[index + i] = ownHeight;
				}
			});
		});
		return result.join("px ") + "px";
	}

	function getStyles() {
		let _gridTemplateRows = state.gridTemplateRows;
		let s = `.grid-Gallerie-e-wrap-${clientId} > .editor-inner-blocks > .editor-block-list__layout {
		  display: grid;
		  grid-gap: ${gap}px;
		  grid-template-columns: repeat(${columns}, 1fr);
		  grid-template-rows: ${_gridTemplateRows};
		  max-width:${breakingPoint}px;
		  margin: ${marginTop}px auto ${marginBottom}px auto;
		  position:relative;
	  `;
		s += "}";
		children.forEach(block => {
			let attr = block.attributes;
			s += `#block-${block.clientId} {
				width:100%;
				grid-area: 
				${attr[`gridRowStart${device}`]} / 
				${attr[`gridColumnStart${device}`]} / 
				span ${attr[`gridRowEnd${device}`]} /
				span ${attr[`gridColumnEnd${device}`]};
			}`;
		});

		return s;
	}

	return (
		<div className={"grid-Gallerie-editor-wrap"}>
			<Inspector {...props}></Inspector>

			<div
				ref={Container}
				style={{
					maxWidth: breakingPoint,
					width: "100%",
					margin: " 0 auto"
				}}
			>
				{state.containerWidth && (
					<Fragment>
						<style>{getStyles()}</style>
						<div
							className={`grid-Gallerie-e-wrap-${clientId} `}
							style={{
								position: "relative",
								maxWidth: breakingPoint,
								margin: " 0 auto"
							}}
						>
							<InnerBlocks
								allowedBlocks={ALLOWED_BLOCKS}
								templateLock={activateAble ? "" : "all"}
							/>

							<div
								ref={PrefContainerRef}
								className={"grid-Gallerie-editor-pref"}
								style={{
									pointerEvents: "none",
									position: "absolute",
									top: 0,
									display: "grid",
									gridTemplateColumns: `repeat( ${columns} , 1fr)`,
									gridTemplateRows: state.gridTemplateRows,
									gridGap: gap + "px",
									width: "100%",
									left: 0,
									maxWidth: breakingPoint
								}}
							>
								{getPrefItems()}
							</div>
						</div>
					</Fragment>
				)}
			</div>
		</div>
	);
}
