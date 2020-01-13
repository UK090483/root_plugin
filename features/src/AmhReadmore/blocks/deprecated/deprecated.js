import save from "./depritation1/save";

const textAlignments = ["left", "center", "right"];
const deprecated = [
	{
		attributes: {
			mainBlock: {
				type: "string",
				default: "Forderung"
			},
			Id: {
				type: "number",
				default: 0
			},

			subBlocks: {
				type: "array",
				default: [
					{
						label: "Grüne",
						short: "ja",
						color: "inherit",
						content: "Grüne"
					},
					{
						label: "SPD",
						short: "nein",
						color: "inherit",
						content: "SPD"
					},
					{
						label: "CDU",
						short: "unklar",
						color: "inherit",
						content: "CDU"
					},
					{
						label: "FDP",
						short: "ja",
						color: "inherit",
						content: "FDP"
					},
					{
						label: "Linke",
						short: "ja",
						color: "inherit",
						content: "Linke"
					}
				]
			},
			textAlignment: {
				type: "string",
				default: textAlignments[0]
			}
		},

		migrate: function(attributes) {
			console.log("------------------migrate--------------------------");
			return {
				mainBlock: attributes.mainBlock,
				Id: attributes.Id,
				subBlocks: JSON.stringify(attributes.subBlocks),
				content: attributes.text,
				textAlignment: attributes.textAlignment,
				test: "test"
			};
		},

		save
	}
];

export default deprecated;
