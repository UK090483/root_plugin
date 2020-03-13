import Placeholder from "./Placeholder";

export default function EditOverlay(props) {
	const {
		attributes,
		clientId,
		state,
		children,
		setActivateAble,
		positionArray
	} = props;
	const { device } = attributes;
	const gap = attributes[`gap${device}`];
	const columns = attributes[`columns${device}`];
	const rows = attributes[`rows${device}`];
	const breakingPoint = attributes[`breakingPoint${device}`];

	function getPrefItems() {
		let res = [];

		positionArray.forEach((item, index) => {
			if (item === undefined) {
				res.push(
					<Placeholder
						{...props}
						column={(index % columns) + 1}
						row={Math.ceil((index + 1) / columns)}
						clientId={clientId}
						setActivateAble={setActivateAble}
					></Placeholder>
				);
			}
		});

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
		return [...activeChildren, ...res];
	}
	function getChildren() {
		let result = [];
		children.forEach((child, index) => {
			if (child.attributes.isActive) {
				result.push(
					<div
						className={"child"}
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
					>
						{/* <p>{index}</p> */}
					</div>
				);
			}
		});
		return result;
	}
	return (
		<div
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
	);
}
