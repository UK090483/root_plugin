export default function search(posArray, items, columns, device) {
	let searchString = posToString(posArray, columns);
	let res = [];
	items.forEach(item => {
		let footprint = foodprintToRegex(item, device);
		let changeIndex = searchString.match(footprint).index;
		let gridIndex =
			(item.attributes[`gridRowStart${device}`] - 1) * columns +
			(item.attributes[`gridColumnStart${device}`] - 1);

		let allPossiblePositions = Array.from(
			searchString.matchAll(footprint),
			m => m.index
		);
		let i = 0;
		let distence = 1000;
		let closestIndex = 0;
		while (i !== allPossiblePositions.length - 1) {
			let _distence = Math.abs(allPossiblePositions[i] - gridIndex);
			console.log("i= " + i);
			console.log("allPossiblePositions[i]= " + allPossiblePositions[i]);
			console.log("_distance= " + _distence);
			if (_distence < distence) {
				distence = _distence;
				closestIndex = allPossiblePositions[i];
			} else {
				break;
			}
			i += 1;
		}

		console.log(gridIndex);
		console.log(closestIndex);
		console.log(allPossiblePositions);
		console.log(searchString);
		console.log(item.footprint);

		res.push({
			changeIndex: closestIndex,
			clientId: item.clientId
		});
		searchString = implementChange(item, changeIndex, searchString);
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
				.join(""),
			"g"
		);
	} else {
		return RegExp(
			gridItem.footprint
				.map(item => (item !== undefined ? "[^(1|3)]" : "."))
				.join(""),
			"g"
		);
	}
}
