import Inspector from "../inspector/inspector";
import Placeholder from "./Placeholder";
import makeId from "../../../shared/makeId";

const { InnerBlocks, BlockControls } = wp.blockEditor;
const { useState, useEffect, useRef, Fragment } = wp.element;
const { useSelect } = wp.data;

const ALLOWED_BLOCKS = ["kubase/free-grid-item-nogrid"];

export default function(props) {
	const { setAttributes, attributes, clientId } = props;
	const { device } = attributes;
	const gap = attributes[`gap${device}`];
	const columns = attributes[`columns${device}`];
	const rows = attributes[`rows${device}`];
	const ratio =
		attributes[`ratio${device}`][0] / attributes[`ratio${device}`][1];
	const borderRadius = attributes[`borderRadius${device}`];
	const breakingPoint = attributes[`breakingPoint${device}`];
	const marginTop = attributes[`marginTop${device}`];
	const marginBottom = attributes[`marginBottom${device}`];
	const PrefContainerRef = useRef();
	const Container = useRef();
	const [state, setState] = useState({
		containerWidth: null,
		gridTemplateRows: ""
	});
	const children = useSelect(
		select => {
			return select("core/block-editor").getBlock(clientId).innerBlocks;
		},
		[ratio]
	);

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
			></Placeholder>
		);
		return [...activeChildren, ...foo];
	}

	function getChildren() {
		let result = [];
		children.forEach(child => {
			if (child.attributes.isActive) {
				result.push(
					<div
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
					child.attributes[`autoHeight${device}`]
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
								renderAppender={() => <div className="bla"></div>}
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
