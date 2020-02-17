const { useState, useEffect, useRef, Fragment } = wp.element;

export default function(props) {
	const { columns, rows, clientId, ratio, gap, device } = props;
	const [hoverd, setHoverd] = useState(false);
	const [height, setHeight] = useState(0);
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

	useEffect(() => {
		if (ref.current) {
			setHeight(ref.current.getBoundingClientRect().width * ratio);
		}
	}, [ref, ratio, gap, columns, rows, device]);

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
				minHeight: height,
				pointerEvents: "auto",
				border: "#80808043 dotted 1px",
				gridColumnStart: "auto",
				gridColumnEnd: "span 1"
			}}
		>
			{hoverd && (
				<h5 onClick={e => activate(e)} style={{ margin: 0 }}>
					activate
				</h5>
			)}
		</div>
	);
}
