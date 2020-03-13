import makeId from "../../../shared/makeId";

const { useState } = wp.element;

export default function(props) {
	const {
		column,
		row,
		clientId,
		setActivateAble,
		gridrowIndex,
		setAttributes,
		attributes
	} = props;
	const [hoverd, setHoverd] = useState(false);

	function insertBlock() {
		let Id = makeId();
		let insert = wp.blocks.createBlock("kubase/free-grid-item", {
			Id: Id,
			gridColumnStartdesktop: column,
			gridColumnStarttablet: column,
			gridColumnStartmobile: column,
			gridColumnEnddesktop: 1,
			gridColumnEndtablet: 1,
			gridColumnEndmobile: 1,
			gridRowStartdesktop: row,
			gridRowStarttablet: row,
			gridRowStartmobile: row,
			gridRowEnddesktop: 1,
			gridRowEndtablet: 1,
			gridRowEndmobile: 1,
			isActive: true
		});
		let nextChildrenAtributes = {
			Id: Id,
			gridColumnStartdesktop: column,
			gridColumnStarttablet: column,
			gridColumnStartmobile: column,
			gridColumnEnddesktop: 1,
			gridColumnEndtablet: 1,
			gridColumnEndmobile: 1,
			gridRowStartdesktop: row,
			gridRowStarttablet: row,
			gridRowStartmobile: row,
			gridRowEnddesktop: 1,
			gridRowEndtablet: 1,
			gridRowEndmobile: 1
		};
		setAttributes({
			childrenAttributes: [
				nextChildrenAtributes,
				...attributes.childrenAttributes
			]
		});
		wp.data
			.dispatch("core/block-editor")
			.insertBlock(insert, 0, clientId, true);
	}

	return (
		<div
			onMouseEnter={() => {
				setHoverd(true);
				setActivateAble(true);
			}}
			onMouseLeave={() => {
				setHoverd(false);
				setActivateAble(false);
			}}
			style={{
				// minHeight: height,
				pointerEvents: "auto",
				border: "#80808043 dotted 1px",
				gridColumnStart: column,
				gridColumnEnd: "span 1",
				gridRowStart: row,
				gridRowEnd: "span 1"
			}}
		>
			{hoverd && (
				<h5 onClick={() => insertBlock()} style={{ margin: 0 }}>
					activate
				</h5>
			)}
		</div>
	);
}
