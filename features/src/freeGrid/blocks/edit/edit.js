import Inspector from "../inspector/inspector";
import makeId from "../../../shared/makeId";
import move from "../inspector/move/move";
import { getPositionArray } from "../inspector/move/helper/positionArray";
import RowsPreview from "./rowsPreview";
import EditOverlay from "./EditOverlay";

const { InnerBlocks } = wp.blockEditor;
const { useState, useEffect, useRef, Fragment } = wp.element;
const { useSelect } = wp.data;
const { addAction, removeAction } = wp.hooks;
const { dispatch } = wp.data;
const ALLOWED_BLOCKS = ["kubase/free-grid-item-nogrid"];

export default function(props) {
	const { setAttributes, attributes, clientId } = props;
	const { device, childrenAttributes } = attributes;
	const gap = attributes[`gap${device}`];
	const columns = attributes[`columns${device}`];
	const rows = attributes[`rows${device}`];
	const ratio =
		attributes[`ratio${device}`][0] / attributes[`ratio${device}`][1];
	const breakingPoint = attributes[`breakingPoint${device}`];
	const marginTop = attributes[`marginTop${device}`];
	const marginBottom = attributes[`marginBottom${device}`];
	const Container = useRef();
	const [state, setState] = useState({
		containerWidth: null,
		gridTemplateRows: ""
	});
	const [activateAble, setActivateAble] = useState(false);
	const { children } = useSelect(select => {
		const { getBlock } = select("core/block-editor");
		return {
			children: getBlock(clientId).innerBlocks
		};
	});

	const positionArray = getPositionArray({
		columns: columns,
		children: children,
		device: device,
		rows: rows
	});

	useEffect(() => {
		addAction(
			`move-${attributes.clientId}`,
			`ku-base-freeGrid`,
			(direction, ItemID) => {
				move(direction, ItemID, children, device, columns, rows, clientId);
			},
			1
		);
		return () => {
			removeAction(`move-${attributes.clientId}`, "ku-base-freeGrid");
			removeAction(`com-${attributes.clientId}`, "ku-base-freeGrid");
		};
	}, [children]);

	useEffect(() => {
		setActivateAble(false);
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
		if (Container.current) {
			let cWidth = Container.current.getBoundingClientRect().width;
			setState({
				containerWidth: cWidth,
				gridTemplateRows: comutedGridTemplateRows(cWidth)
			});
		}
	}, [Container, device, gap, ratio, children, rows]);

	function comutedGridTemplateRows(width) {
		let result = new Array(rows);
		let placeholderHeight = ((width - gap * (columns - 1)) / columns) * ratio;
		result.fill(0);
		let hasItems = false;
		let rowheight = 0;

		positionArray.forEach((element, index) => {
			let _row = Math.floor(index / columns);
			let child = children[element];

			if (index % columns !== columns - 1) {
				setValues();
			} else {
				setValues();
				setRow();
				resetValues();
			}
			function setRow() {
				if (hasItems) {
					result[_row] = rowheight;
				} else {
					result[_row] = placeholderHeight;
				}
			}
			function resetValues() {
				hasItems = false;
				rowheight = 0;
			}
			function setValues() {
				if (element !== undefined) {
					hasItems = true;
					let ownHeight =
						(child.attributes[`ownHeight${device}`] -
							(child.attributes[`gridRowEnd${device}`] - 1) * gap) /
						child.attributes[`gridRowEnd${device}`];

					ownHeight > rowheight && (rowheight = ownHeight);
				}
			}
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
		childrenAttributes.forEach((attr, index) => {
			s += `#block-${children[index].clientId} {
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
						<RowsPreview
							rows={rows}
							columns={columns}
							gap={gap}
							breakingPoint={breakingPoint}
							state={state}
						></RowsPreview>

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

							<EditOverlay
								{...props}
								positionArray={positionArray}
								state={state}
								children={children}
								setActivateAble={setActivateAble}
							></EditOverlay>
						</div>
					</Fragment>
				)}
			</div>
		</div>
	);
}
