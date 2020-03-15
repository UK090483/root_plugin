import Inspector from "../inspector/inspector";
import makeId from "../../../shared/makeId";
import { getPositionArray } from "../inspector/move/helper/positionArray";
import RowsPreview from "./rowsPreview";
import EditOverlay from "./EditOverlay";
import useCom from "./useCom";
import useAttributes from "./useAttributes";
const {
	RangeControl,
	PanelBody,
	Button,
	ButtonGroup,
	CheckboxControl
} = wp.components;

const { InnerBlocks, BlockControls } = wp.blockEditor;
const { useState, useEffect, useRef, Fragment } = wp.element;
const { useSelect } = wp.data;
const ALLOWED_BLOCKS = ["kubase/free-grid-item-nogrid"];

export default function(props) {
	const { setAttributes, attributes, clientId } = props;
	const { device, childrenAttributes } = attributes;
	const {
		gap,
		columns,
		rows,
		ratio,
		breakingPoint,
		marginTop,
		marginBottom
	} = useAttributes(attributes, device);

	const Container = useRef();
	const InnerBlocksref = useRef();

	const [state, setState] = useState({
		containerWidth: null,
		gridTemplateRows: ""
	});

	const [activateAble, setActivateAble] = useState(false);
	const [childrenHeights, setchildrenHeights] = useState({});

	const { children } = useSelect(select => {
		const { getBlock } = select("core/block-editor");
		return {
			children: getBlock(clientId).innerBlocks
		};
	});

	const positionArray = getPositionArray(attributes);

	useCom(props, [children]);

	useEffect(() => {
		if (attributes.clientId === "") {
			setAttributes({ clientId: makeId() });
		}
	}, []);

	useEffect(() => {
		if (activateAble) {
			setActivateAble(false);
		}
	}, [children]);

	useEffect(() => {
		if (Container.current) {
			let cWidth = Container.current.getBoundingClientRect().width;
			setState({
				containerWidth: cWidth,
				gridTemplateRows: comutedGridTemplateRows(cWidth)
			});
		}
	}, [Container, device, gap, ratio, children, childrenHeights, columns]);

	useEffect(() => {
		setTimeout(() => {
			let res = {};
			children.forEach(child => {
				let item = Container.current.querySelector(
					`.ku-freegrid-item-wrap-${child.attributes.id}`
				);
				//
				res[child.attributes.id] = item.getBoundingClientRect().height;
			});

			setchildrenHeights(res);
		});
	}, [InnerBlocksref, children, columns]);

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
						(childrenHeights[child.attributes.id] -
							(childrenAttributes[element][`gridRowEnd${device}`] - 1) * gap) /
						childrenAttributes[element][`gridRowEnd${device}`];

					if (child.innerBlocks.length === 0) {
						rowheight =
							rowheight < placeholderHeight ? placeholderHeight : rowheight;
					}
					if (ownHeight > rowheight) {
						rowheight = ownHeight;
					}

					if (child.attributes[`autoHeight${device}`]) {
						rowheight < ownHeight && (rowheigt = ownHeight);
					}

					// rowheight = ownHeight > rowheight ? ownHeight : placeholderHeight;
				}
			}
		});
		console.log(placeholderHeight);
		console.log(result);
		return result.join("px ") + "px";
	}

	function getRatio(device, child) {
		let _gridRowEnd = child[`gridRowEnd${device}`];
		let _gridColumnEnd = child[`gridColumnEnd${device}`];
		const ratio =
			attributes[`ratio${device}`][0] / attributes[`ratio${device}`][1];
		let gapHeight = (_gridRowEnd - 1) * gap;
		let gapWidth = (_gridColumnEnd - 1) * gap;
		let r = (ratio / _gridColumnEnd) * _gridRowEnd * 100;
		let gabSum = gapHeight - gapWidth * (r / 100);

		return `padding-top: calc(${r}% + ${gabSum}px );`;
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
			}
				.ku-freegrid-item-wrap-${children[index].attributes.id}::before{
					content: "";
					width: 1px;
					margin-left: -1px;
					float: left;
					height: 0;
					 ${getRatio(device, attr)}
				} 
				.ku-freegrid-item-wrap-${children[index].attributes.id}::after{
					content: "";
			display: table;
			clear: both;
				} 
			`;
		});
		return s;
	}

	return (
		<div className={"grid-Gallerie-editor-wrap"}>
			<Inspector {...props}></Inspector>
			<BlockControls>
				<Button>b</Button>
			</BlockControls>
			<div
				ref={Container}
				style={{
					maxWidth: breakingPoint,
					width: "100%",
					margin: " 0 auto",
					position: "relative"
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
							ref={InnerBlocksref}
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
						</div>
						<EditOverlay
							{...props}
							positionArray={positionArray}
							state={state}
							children={children}
							setActivateAble={setActivateAble}
						></EditOverlay>
					</Fragment>
				)}
			</div>
		</div>
	);
}
