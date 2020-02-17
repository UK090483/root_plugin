function addResponsivePropertys(property, attributes) {
	let layouts = ["desktop", "tablet", "mobile"];
	let result = { ...attributes };

	layouts.forEach((layout, index) => {
		result[property.name + layout] = {
			type: property.type,
			default:
				(typeof property.default === "object") & (property.type !== "array")
					? property.default[index]
					: property.default
		};
	});
	return result;
}

let attributes = {};
attributes = addResponsivePropertys(
	{ name: "borderRadius", type: "number", default: 0 },
	attributes
);
attributes = addResponsivePropertys(
	{ name: "gap", type: "number", default: 0 },
	attributes
);
attributes = addResponsivePropertys(
	{ name: "columns", type: "number", default: 4 },
	attributes
);
attributes = addResponsivePropertys(
	{ name: "rows", type: "number", default: 4 },
	attributes
);
attributes = addResponsivePropertys(
	{ name: "ratio", type: "number", default: 100 },
	attributes
);
attributes = addResponsivePropertys(
	{ name: "heightType", type: "string", default: "ratio" },
	attributes
);

export default {
	...attributes,
	images: {
		type: "array",
		default: []
	},
	imageSrcSet: {
		type: "string",
		default: null
	},
	imageSrc: {
		type: "string",
		default: null
	},
	focalPoint: {
		type: "object",
		default: {
			x: 0.5,
			y: 0.5
		}
	},
	videoUrl: {
		type: "string",
		default: null
	},
	showVideo: {
		type: "boolean",
		default: false
	},
	display: {
		type: "string",
		default: "paralax"
	},
	backgroundSize: {
		type: "string",
		default: "cover"
	},
	height: {
		type: "number",
		default: 100
	},
	heightUnit: {
		type: "string",
		default: "%"
	},
	width: {
		type: "number",
		default: 100
	},
	widthUnit: {
		type: "string",
		default: "%"
	},
	marginTop: {
		type: "number",
		default: 0
	},
	marginBottom: {
		type: "number",
		default: 0
	},
	marginLeft: {
		type: "number",
		default: 0
	},
	marginRight: {
		type: "number",
		default: 0
	},
	backgroundColor: {
		type: "string",
		default: "transparent"
	},
	spaceAround: {
		type: "number",
		default: 0
	},
	ratio: {
		type: "array",
		default: [1, 1]
	}
};
