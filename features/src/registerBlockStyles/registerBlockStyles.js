import "./style.scss";

wp.blocks.registerBlockStyle("core/heading", [
	{
		name: "default",
		label: "Default",
		isDefault: true
	},
	{
		name: "ku-base-header-no-margin",
		label: "No Margin"
	},
	{
		name: "ku-base-header-no-margin-top",
		label: "No Margin Top"
	}
]);
wp.blocks.registerBlockStyle("core/paragraph", [
	{
		name: "default",
		label: "Default",
		isDefault: true
	},
	{
		name: "ku-base-paragraph-no-margin",
		label: "No Margin"
	},
	{
		name: "ku-base-paragraph-no-margin-top",
		label: "No Margin Top"
	}
]);
