import Inspector from "./inspector/inspector";
// import Modal from "./inspector/Modal";
import EditPannel from "./inspector/EditPannel";

const {
	InnerBlocks,
	BlockControls,
	BlockVerticalAlignmentToolbar,
	InspectorControls,
	Inserter
} = wp.blockEditor;

const deviceWiths = {
	desktop: "unset",
	tablet: 500,
	mobile: 300
};
let layouts = ["desktop", "tablet", "mobile"];
const { useState, useEffect, useRef, Fragment } = wp.element;
const { useSelect } = wp.data;

const ALLOWED_BLOCKS = ["kubase/free-grid-item"];

export default function(props) {
	const { setAttributes, attributes, isSelected, clientId } = props;
	const { Id, device, size } = attributes;

	const gap = attributes[`gap${device}`];
	const columns = attributes[`columns${device}`];
	const rows = attributes[`rows${device}`];
	const ratio = attributes[`ratio${device}`];
	const borderRadius = attributes[`borderRadius${device}`];
	const breakingPoint = attributes[`breakingPoint${device}`];
	const marginTop = attributes[`marginTop${device}`];
	const marginBottom = attributes[`marginBottom${device}`];

	const [container, Setcontainer] = useState(null);
	const [containerSize, setContainerSize] = useState(null);
	const ref = useRef();
	const children = useSelect(select => {
		return select("core/block-editor").getBlock(clientId).innerBlocks;
	});

	useEffect(() => {
		Setcontainer(ref.current);
		if (!Id) {
			setAttributes({ Id: Date.now() });
		}
	}, []);

	useEffect(() => {
		setContainerSize(ref.current.getBoundingClientRect());
	}, []);
	useEffect(() => {
		if (attributes.clientId !== clientId) {
			setAttributes({ clientId });
		}
	}, []);

	function getContainerHeight() {
		if (!container) {
			return "100";
		} else {
			let widthNow = container.getBoundingClientRect().width;
			let containerW =
				device === "desktop" ? widthNow : attributes[`breakingPoint${device}`];
			let ItemWidth = (containerW - gap * (columns - 1)) / columns;
			let heightContainer = ItemWidth * rows + gap * (rows - 1);
			setContainerHeigths();

			return {
				h: heightContainer * (ratio / 100),
				w: containerW,
				iw: ItemWidth
			};
		}
	}

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
		foo.fill(
			<Item columns={columns} rows={rows} gap={gap} clientId={clientId}></Item>
		);
		return [...activeChildren, ...foo];
	}

	function getChildren() {
		let result = [];
		children.forEach(child => {
			console.log(child.attributes);
			if (child.attributes.isActive) {
				result.push(
					<div
						style={{
							// height: child.attributes[`minHeight${device}`] + "px",
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

	// needs overthinking of gaps....
	function setContainerHeigths() {
		let result = {};
		layouts.forEach(layout => {
			let c = attributes[`columns${layout}`];
			let r = attributes[`rows${layout}`];
			let g = attributes[`gap${layout}`] / 100;
			let _ratio = attributes[`ratio${layout}`];

			let wOne = (100 - g * (c - 1)) / c;
			let _containerHeigth = (wOne * r + g * (r - 1)) * (_ratio / 100);

			result[`containerHeight${layout}`] = _containerHeigth;
			setAttributes(result);
		});
	}

	function getStyles() {
		const containersizes = getContainerHeight();
		const h = containersizes.h;
		const w = containersizes.w;
		const iw = containersizes.iw;

		let s = `.grid-Gallerie-e-wrap-${clientId} > .editor-inner-blocks > .editor-block-list__layout {
		  display: grid;
		  grid-gap: ${gap}px;
		  grid-template-columns: repeat(${columns}, 1fr);
		  grid-template-rows: repeat(${rows}, 1fr);
		  max-width:${breakingPoint}px;
		  margin: ${marginTop}px auto ${marginBottom}px auto;
		  position:relative;
	  
	  `;
		if (attributes[`heightType${device}`] === "ratio") {
			s += `height: ${h}px`;
		}

		s += "}";
		return s;
	}

	return (
		<div ref={ref} className={"grid-Gallerie-editor-wrap"}>
			<BlockControls></BlockControls>
			<Inspector {...props}></Inspector>

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
					// renderAppender={() => <Fragment></Fragment>}
				/>

				<div
					className={"grid-Gallerie-editor-bla"}
					style={{
						pointerEvents: "none",
						position: "absolute",
						top: 0,
						display: "grid",
						height: "100%",
						gridTemplateColumns: `repeat( ${columns} , 1fr)`,
						gridTemplateRows: `repeat( ${rows} , 1fr)`,
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
	);
}

const Item = props => {
	const { columns, rows, clientId } = props;
	const [hoverd, setHoverd] = useState(false);
	const ref = useRef(null);

	function activate(e) {
		let thisSizes = ref.current.getBoundingClientRect();
		let parentSizes = ref.current.parentNode.getBoundingClientRect();

		let thisMiddleX = thisSizes.x - parentSizes.x + thisSizes.width / 2;
		let thisMiddleY = thisSizes.y - parentSizes.y + thisSizes.height / 2;

		let c = Math.floor(thisMiddleX / (parentSizes.width / columns)) + 1;
		let r = Math.floor(thisMiddleY / (parentSizes.height / rows)) + 1;

		insertBlock(c, r);
	}

	function insertBlock(c, r) {
		let insert = wp.blocks.createBlock("kubase/free-grid-item", {
			gridColumnStartdesktop: c,
			gridColumnStarttablet: c,
			gridColumnStartmobile: c,
			gridColumnEnddesktop: 1,
			gridColumnEndtablet: 1,
			gridColumnEndmobile: 1,
			gridRowStartdesktop: r,
			gridRowStarttablet: r,
			gridRowStartmobile: r,
			gridRowEnddesktop: 1,
			gridRowEndtablet: 1,
			gridRowEndmobile: 1,
			isActive: true
		});
		wp.data
			.dispatch("core/block-editor")
			.insertBlocks(insert, 0, clientId, false);
	}
	return (
		<div
			ref={ref}
			onMouseEnter={() => {
				setHoverd(true);
			}}
			onMouseLeave={() => {
				setHoverd(false);
			}}
			style={{
				pointerEvents: "auto",
				border: "#80808043 dotted 1px",
				gridColumnStart: "auto",
				gridColumnEnd: "span 1"
			}}
		>
			{hoverd && <h1 onClick={e => activate(e)}>activate</h1>}
		</div>
	);
};
