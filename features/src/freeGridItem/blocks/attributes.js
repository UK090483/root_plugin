function addResponsivePropertys(property, attributes) {
	let layouts = ["desktop", "tablet", "mobile"];
	let result = { ...attributes };

	layouts.forEach((layout, index) => {
		result[property.name + layout] = {
			type: property.type,
			default:
				typeof property.default === "object" && property.type !== "array"
					? property.default[index]
					: property.default
		};
	});
	return result;
}

let attributes = {};
attributes = addResponsivePropertys(
	{ name: "gridColumnStart", type: "number", default: 1 },
	attributes
);
attributes = addResponsivePropertys(
	{ name: "gridColumnEnd", type: "number", default: 1 },
	attributes
);
attributes = addResponsivePropertys(
	{ name: "gridRowStart", type: "number", default: 1 },
	attributes
);
attributes = addResponsivePropertys(
	{ name: "gridRowEnd", type: "number", default: 1 },
	attributes
);
attributes = addResponsivePropertys(
	{ name: "breakingPoint", type: "string", default: ["unset", 992, 750] },
	attributes
);
attributes = addResponsivePropertys(
	{ name: "minHeight", type: "number", default: 0 },
	attributes
);
attributes = addResponsivePropertys(
	{ name: "ratio", type: "string", default: "calc(100% + 0px)" },
	attributes
);
attributes = addResponsivePropertys(
	{ name: "autoHeight", type: "boolean", default: false },
	attributes
);
attributes = addResponsivePropertys(
	{ name: "ownHeight", type: "number", default: 0 },
	attributes
);
attributes = addResponsivePropertys(
	{ name: "ownWidth", type: "number", default: 0 },
	attributes
);
attributes = addResponsivePropertys(
	{ name: "animations", type: "array", default: [] },
	attributes
);
attributes = addResponsivePropertys(
	{ name: "gapMargin", type: "string", default: `` },
	attributes
);

export default {
	...attributes,
	isActive: {
		type: "boolean",
		default: false
	},
	clientId: {
		type: "sting",
		default: ""
	},
	device: {
		type: "string",
		default: "desktop"
	},
	backgtroundImage: {
		type: "object",
		default: {}
	},
	focalPoint: {
		type: "object",
		default: { x: 0.5, y: 0.5 }
	},
	backgroundSize: {
		type: "string",
		default: "cover"
	},
	ownHeight: {
		type: "number",
		default: 0
	},
	overlay: {
		type: "boolean",
		default: false
	},
	overlayText: {
		type: "string",
		default: ""
	},
	link: {
		type: "object",
		default: {
			postType: "",
			link: ""
		}
	},
	noGrid: {
		type: "boolean",
		default: false
	}
};
