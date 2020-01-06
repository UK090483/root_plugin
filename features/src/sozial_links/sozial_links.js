const { registerBlockType } = wp.blocks;
const {
	SVG,
	TextControl,
	Icon,
	PanelBody,
	RangeControl,
	DropZoneProvider,
	DropZone,
	icon
} = wp.components;
const { RichText, AlignmentToolbar, InspectorControls } = wp.editor;
import sanitizeSVG from "@mattkrick/sanitize-svg";

import "./style.scss";
import "./editor.scss";
import facebook from "./icons/facebook.js";
import twitter from "./icons/twitter.js";

import fb from "./icons/facebook.svg";

const possibleIcons = {
	facebook: facebook,
	twitter: twitter
};

registerBlockType("cgb/sozial-links", {
	title: "Sozial Links",
	icon: "smiley",
	category: "kubase-blocks",

	attributes: {
		icons: {
			type: "object",
			default: {}
		},

		size: {
			type: "number",
			default: 24.0
		},
		uploads: {
			type: "object",
			default: {}
		}
	},

	edit({ setAttributes, attributes, className }) {
		const { size, icons } = attributes;

		function isValidURL(str) {
			let a = document.createElement("a");
			a.href = str;
			return a.host && a.host != window.location.host;
		}

		function getIcons() {
			return Object.keys(possibleIcons).map(key => {
				let url = icons.hasOwnProperty(key) ? icons[key] : "";
				let style = isValidURL(url)
					? {}
					: { backgroundColor: "rgba(255, 43, 43, 0.192)" };
				return (
					<div>
						<a style={{ width: size + "px", height: size + "px" }}>
							{possibleIcons[key]()}
						</a>
						<div style={style}>
							<TextControl
								label={key}
								value={url}
								onChange={value => handleChange(key, value)}
							></TextControl>
						</div>
					</div>
				);
			});
		}

		function handleChange(key, value) {
			let atr = { ...icons };
			atr[key] = value;
			setAttributes({
				icons: { ...atr }
			});
		}

		function getRenderedIcons() {
			return Object.keys(possibleIcons).map(key => {
				if (icons.hasOwnProperty(key) && icons[key] !== "") {
					return (
						<a style={{ width: size + "px", height: size + "px" }}>
							{possibleIcons[key]()}
						</a>
					);
				}
			});
		}
		function getuploadedIcons() {
			return Object.keys(attributes.uploads).map(key => {
				return (
					<a style={{ width: size + "px", height: size + "px" }}>
						<div
							className="Container"
							dangerouslySetInnerHTML={{ __html: attributes.uploads[key] }}
						></div>
					</a>
				);
			});
		}

		function dropped(a) {
			if (a[0].type !== "image/svg+xml") {
				return;
			}

			const cleanImage = sanitizeSVG(a[0]);
			cleanImage.then(cI => {
				cI.text().then(res => {
					let nextUploads = { ...attributes.uploads };
					nextUploads[a[0].name] = res;
					setAttributes({ uploads: nextUploads });
				});
			});
		}

		return (
			<div className={className}>
				<InspectorControls>
					<DropZoneProvider>
						<div>
							{"Drop something here"}
							<DropZone
								onFilesDrop={dropped}
								onHTMLDrop={dropped}
								onDrop={dropped}
							/>
						</div>
					</DropZoneProvider>
					<RangeControl
						label="Size"
						value={size}
						onChange={size => setAttributes({ size })}
						min={20}
						max={200}
					/>
					<PanelBody title={"Icons"} initialOpen={false}>
						{getIcons()}
					</PanelBody>
				</InspectorControls>
				<div className={"svgicon"}>
					<Icon icon={fb} size={100} />
					{/* {getRenderedIcons()} */}
					{/* { getuploadedIcons()} */}
				</div>
			</div>
		);
	},

	save({ className, attributes }) {
		const { size, icons } = attributes;

		function getRenderedIcons() {
			return Object.keys(possibleIcons).map(key => {
				if (icons.hasOwnProperty(key) && icons[key] !== "") {
					return (
						<a
							rel="noopener noreferrer"
							target="_blank"
							href={icons[key]}
							style={{ width: size + "px", height: size + "px" }}
						>
							<Icon icon={fb} />
						</a>
					);
				}
			});
		}

		return <div className={className}>{getRenderedIcons()}</div>;
	}
});

import { withState } from "@wordpress/compose";

const MyDropZone = withState({
	hasDropped: false
})(({ hasDropped, setState, attributes, setAttributes }) => {
	function dropped(a) {
		a[0].text().then(res => {
			let nextUploads = attributes.uploads;
			nextUploads["newThing"] = res;
			console.log(res);
		});

		setState({ hasDropped: true });
	}

	console.log(attributes);

	return (
		<DropZoneProvider>
			<div>
				{hasDropped ? "Dropped!" : "Drop something here"}
				<DropZone onFilesDrop={dropped} onHTMLDrop={dropped} onDrop={dropped} />
			</div>
		</DropZoneProvider>
	);
});
