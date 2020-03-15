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

	const { device, childrenAttributes } = attributes;
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
						key={index}
						{...props}
						column={(index % columns) + 1}
						row={Math.ceil((index + 1) / columns)}
						clientId={clientId}
						setActivateAble={setActivateAble}
					></Placeholder>
				);
			}
		});

		return [...getChildren(), ...res];
	}
	function getChildren() {
		let result = [];
		childrenAttributes.forEach((child, index) => {
			result.push(
				<div
					className={"child"}
					key={child.id}
					style={{
						minHeight: child[`ownHeight${device}`],
						border: "#007cba dotted 1px",
						gridColumnStart: child[`gridColumnStart${device}`],
						gridColumnEnd: "span " + child[`gridColumnEnd${device}`],
						gridRowStart: child[`gridRowStart${device}`],
						gridRowEnd: "span " + child[`gridRowEnd${device}`]
					}}
				>
					{/* <p>{index}</p> */}
				</div>
			);
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
