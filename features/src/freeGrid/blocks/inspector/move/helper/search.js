export default function search(posArray, item, columns, device) {
	let searchString = posToString(posArray, columns);
	let res = [];
	item.forEach(i => {
		let footprint = foodprintToRegex(i, device);
		let changeIndex = searchString.match(footprint).index;

		res.push({
			changeIndex: changeIndex,
			clientId: i.clientId
		});
		searchString = implementChange(i, changeIndex, searchString);
	});

	return {
		colitions: res,
		nededRows: Math.ceil(
			searchString.slice(0, searchString.lastIndexOf(1) + 1).length / columns
		)
	};
}

function posToString(pos, columns) {
	let emtyRow = [...new Array(columns - 1).fill(0), ...[2]];
	let searchAdd = new Array(16)
		.fill(emtyRow)
		.flat()
		.join("")
		.slice(pos.length % columns);

	return (
		pos
			.map((item, index) => {
				if (index % columns === columns - 1) {
					return item !== undefined ? 3 : 2;
				} else {
					return item !== undefined ? 1 : 0;
				}
			})
			.join("") + searchAdd
	);
}

function implementChange(gridItem, changeIndex, searchString) {
	let searchArray = searchString.split("");
	gridItem.footprint.forEach((item, index) => {
		if (item !== undefined) {
			searchArray[index + changeIndex] =
				parseInt(searchArray[index + changeIndex]) + 1;
		}
	});
	return searchArray.join("");
}

function foodprintToRegex(gridItem, device) {
	let width = gridItem.attributes[`gridColumnEnd${device}`];
	if (width > 1) {
		return RegExp(
			gridItem.footprint
				.map((item, index) =>
					item !== undefined ? (index > width - 2 ? "[^13]" : "[^123]") : "."
				)
				.join("")
		);
	} else {
		return RegExp(
			gridItem.footprint
				.map(item => (item !== undefined ? "[^(1|3)]" : "."))
				.join("")
		);
	}
}
