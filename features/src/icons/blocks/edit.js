import Inspector from "./inspector";
import apiCall from "./apiCalll";
const { useEffect, useState } = wp.element;
const { G, Path, SVG } = wp.components;

export default function edit(props) {
	const { attributes, setAttributes } = props;
	const { icons, size, margin, align } = attributes;

	const iconStyle = {
		height: size,
		width: size,
		marginRight: align === "flex-start" ? margin : "bla",
		marginLeft: align === "flex-end" ? margin : "bla",
		margin: align === "center" ? margin : "bla"
	};

	function getIcons() {
		return icons.map(i => {
			const paths = i.path.map(path => {
				return <Path fill={"grey"} d={path} />;
			});
			return (
				<SVG
					style={iconStyle}
					viewBox="0 0 24 24"
					xmlns="http://www.w3.org/2000/svg"
				>
					<G>{paths}</G>
				</SVG>
			);
		});
	}

	return (
		<div className={"ku_base_icons_wrap"} style={{ justifyContent: align }}>
			<Inspector
				setAttributes={setAttributes}
				attributes={attributes}
			></Inspector>

			{icons.length > 0 ? getIcons() : <h1>add icons</h1>}
		</div>
	);
}
