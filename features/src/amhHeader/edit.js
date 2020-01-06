const { useState, useEffect } = wp.element;
const { RichText } = wp.blockEditor;

import Inspector from "./Inspector/Inspector";

export default function(props) {
	const { setAttributes, attributes } = props;
	const [screen, setScreen] = useState("desktop");
	const {
		content,
		fontSize,
		textAlign,
		marginTop,
		marginBottom,
		fontWeight,
		lineHeight,
		color,
		Id
	} = attributes;
	useEffect(() => {
		if (!Id) {
			setAttributes({ Id: Date.now() });
		}
	}, []);

	function getWrapStyle() {
		let s;

		if (screen === "mobile") {
			s = {
				width: "375px",
				maxWidth: "100%",
				borderLeft: "#007cba solid 4px",
				borderRight: "#007cba solid 4px",
				margin: "0 auto",
				fontSize: fontSize.mobile + "em",
				textAlign: textAlign.mobile,
				marginTop: marginTop.mobile + "em",
				marginBottom: marginBottom.mobile + "em",
				lineHeight: lineHeight.mobile + "em",
				fontWeight: fontWeight.mobile
			};
		}

		if (screen === "tablet") {
			s = {
				width: "768px",
				maxWidth: "100%",
				borderLeft: "#007cba solid 4px",
				borderRight: "#007cba solid 4px",
				margin: "0 auto",
				fontSize: fontSize.tablet + "em",
				textAlign: textAlign.tablet,
				marginTop: marginTop.tablet + "em",
				marginBottom: marginBottom.tablet + "em",
				lineHeight: lineHeight.tablet + "em",
				fontWeight: fontWeight.tablet
			};
		}

		if (screen === "desktop") {
			s = {
				fontSize: fontSize.desktop + "em",
				textAlign: textAlign.desktop,
				marginTop: marginTop.desktop + "em",
				marginBottom: marginBottom.desktop + "em",
				lineHeight: lineHeight.desktop + "em",
				fontWeight: fontWeight.desktop
			};
		}

		if (color) {
			s.color = color;
		}

		return s;
	}

	return (
		<div>
			<Inspector
				screen={screen}
				setScreen={setScreen}
				attributes={attributes}
				setAttributes={setAttributes}
			></Inspector>
			<div className={"amh-wrap "} style={getWrapStyle()}>
				<RichText
					allowedFormats={["core/bold", "core/italic", "core/underline"]}
					tagName="div"
					className={color ? "content " : "content is-style-jmh-text-color"}
					placeholder={"...write a header"}
					value={content}
					onChange={content => {
						setAttributes({ content });
					}}
				></RichText>
			</div>
		</div>
	);
}
