function addResponsivePropertys(property, attributes) {
	let layouts = ["desktop", "tablet", "mobile"];
	let result = { ...attributes };

	layouts.forEach((layout, index) => {
		result[property.name + layout] = {
			type: property.type,
			default:
				typeof property.default === "object"
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

export default {
	...attributes,
	isActive: {
		type: "boolean",
		default: false
	},
	clientId: {
		type: "sting",
		default: 0
	},
	device: {
		type: "string",
		default: "desktop"
	},
	backgtroundImage: {
		type: "string",
		default: ""
	},
	ownHeight: {
		type: "number",
		default: 0
	}
};
