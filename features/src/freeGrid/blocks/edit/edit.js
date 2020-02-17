import Inspector from "../inspector/inspector";
import Placeholder from "./Placeholder";

const { InnerBlocks, BlockControls } = wp.blockEditor;
const { useState, useEffect, useRef, Fragment } = wp.element;
const { useSelect, select } = wp.data;

const ALLOWED_BLOCKS = ["kubase/free-grid-item"];

export default function(props) {
	const { setAttributes, attributes, clientId } = props;
	const { device } = attributes;

	const gap = attributes[`gap${device}`];
	const columns = attributes[`columns${device}`];
	const rows = attributes[`rows${device}`];
	const ratio =
		attributes[`ratio2${device}`][0] / attributes[`ratio2${device}`][1];
	const borderRadius = attributes[`borderRadius${device}`];
	const breakingPoint = attributes[`breakingPoint${device}`];
	const marginTop = attributes[`marginTop${device}`];
	const marginBottom = attributes[`marginBottom${device}`];
	const PrefContainerRef = useRef();
	const Container = useRef();
	const [state, setState] = useState({
		prefContaineHeight: 0,
		prefContaineWidth: 0,
		gridTemplateRows: ""
	});
	const [containerWidth, setContainerWidth] = useState(null);

	const children = useSelect(select => {
		return select("core/block-editor").getBlock(clientId).innerBlocks;
	}, []);

	useEffect(() => {
		if (attributes.clientId === "") {
			setAttributes({ clientId });
		}
	}, []);

	useEffect(() => {
		if (Container.current) {
			setContainerWidth(PrefContainerRef.current.getBoundingClientRect().width);
		}
	}, []);

	useEffect(() => {
		if (PrefContainerRef.current) {
			let compStyles = window.getComputedStyle(PrefContainerRef.current);
			setTimeout(() => {
				// console.log(compStyles.getPropertyValue("height").replace("px", ""));
				setState({
					gridTemplateRows: getGridTemplateRows("fit-content"),
					prefContaineHeight: compStyles
						.getPropertyValue("height")
						.replace("px", ""),
					prefContaineWidth: compStyles
						.getPropertyValue("width")
						.replace("px", "")
				});
			}, 200);
		}
	}, [PrefContainerRef, rows, gap, device]);

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
			((state.prefContaineWidth - gap * (columns - 1)) / columns) * ratio;

		foo.fill(
			<Placeholder
				columns={columns}
				rows={rows}
				gap={gap}
				clientId={clientId}
				ratio={ratio}
				device={device}
				height={placeholderHeight}
			></Placeholder>
		);
		return [...activeChildren, ...foo];
	}

	function getGridTemplateRows(a) {
		let result = new Array(rows);
		let placeholderHeight =
			((state.prefContaineWidth - gap * (columns - 1)) / columns) * ratio;
		console.log(placeholderHeight);
		result.fill(a);
		children.forEach(child => {
			if (!(child.attributes[`gridRowEnd${device}`] > 1)) {
				let ownHeight =
					child.attributes[`ownHeight${device}`] /
					child.attributes[`gridRowEnd${device}`];
				let index = child.attributes[`gridRowStart${device}`] - 1;

				if (result[index] < ownHeight) {
					result[index] = ownHeight + "px";
				}
			}
		});

		return result.join(" ");
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

	function comutedHeight(width) {
		let _r = new Array(rows);
		_r.fill(0);
		// console.log(width);
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

		if (attributes[`heightType${device}`] === "ratio") {
			s += `min-height: ${state.prefContaineHeight}px; `;
		}

		s += "}";
		return s;
	}

	return (
		<div className={"grid-Gallerie-editor-wrap"}>
			<BlockControls></BlockControls>
			<Inspector {...props}></Inspector>

			<div
				ref={Container}
				style={{
					maxWidth: breakingPoint,
					margin: " 0 auto"
				}}
			>
				<style>{getStyles()}</style>

				<div
					className={`grid-Gallerie-e-wrap-${clientId}`}
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
							// position: "absolute",
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
			</div>
		</div>
	);
}
