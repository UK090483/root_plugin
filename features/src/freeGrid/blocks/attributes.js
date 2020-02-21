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
	{ name: "gap", type: "number", default: 40 },
	attributes
);
attributes = addResponsivePropertys(
	{ name: "columns", type: "number", default: 3 },
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
attributes = addResponsivePropertys(
	{ name: "ratio2", type: "array", default: [289, 426] },
	attributes
);
attributes = addResponsivePropertys(
	{ name: "marginTop", type: "number", default: 0 },
	attributes
);
attributes = addResponsivePropertys(
	{ name: "marginBottom", type: "number", default: 0 },
	attributes
);
attributes = addResponsivePropertys(
	{ name: "breakingPoint", type: "string", default: ["unset", 992, 750] },
	attributes
);
attributes = addResponsivePropertys(
	{ name: "containerHeight", type: "number", default: 100 },
	attributes
);
attributes = addResponsivePropertys(
	{ name: "area", type: "number", default: 16 },
	attributes
);

export default {
	...attributes,
	size: {
		type: "number",
		default: 5
	},
	device: {
		type: "string",
		default: "desktop"
	},
	clientId: {
		type: "string",
		default: ""
	},
	borderRadius: {
		type: "object",
		default: { value: 0, unit: "%" }
	},
	gridHeight: {
		type: "number",
		default: 100
	},
	noGrid: {
		type: "bolean",
		default: false
	}
};
