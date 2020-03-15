import getFoodprint from "./footprint";

export default function search(attributes, posArray, items, nearest = true) {
	const { childrenAttributes, device } = attributes;

	const columns = attributes[`columns${device}`];

	let searchString = posToString(posArray, columns);

	let res = [];
	items.forEach(item => {
		let footprint = getFoodprint(childrenAttributes[item], columns, device, 1);

		let searchRegex = getRegex(childrenAttributes[item], columns, device);
		let gridIndex =
			(childrenAttributes[item][`gridRowStart${device}`] - 1) * columns +
			(childrenAttributes[item][`gridColumnStart${device}`] - 1);

		let allPossiblePositions = Array.from(
			searchString.matchAll(searchRegex),
			m => m.index
		);

		let closestIndex = allPossiblePositions[0];

		if (nearest) {
			let i = 0;
			let distence = 1000;

			while (i !== allPossiblePositions.length - 1) {
				let _distence = Math.abs(allPossiblePositions[i] - gridIndex);
				// console.log("i= " + i);
				// console.log("allPossiblePositions[i]= " + allPossiblePositions[i]);
				// console.log("_distance= " + _distence);
				if (_distence < distence) {
					distence = _distence;
					closestIndex = allPossiblePositions[i];
				} else {
					break;
				}
				i += 1;
			}
		}

		// console.log("gridIndex " + gridIndex);
		// console.log(closestIndex);
		// console.log(allPossiblePositions);
		// console.log(searchString);
		// console.log(footprint);

		res.push({
			changeIndex: closestIndex,
			index: item
		});
		searchString = implementChange(footprint, closestIndex, searchString);
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

function implementChange(footprint, changeIndex, searchString) {
	let searchArray = searchString.split("");
	footprint.forEach((item, index) => {
		if (item !== undefined) {
			searchArray[index + changeIndex] =
				parseInt(searchArray[index + changeIndex]) + 1;
		}
	});
	return searchArray.join("");
}

function foodprintToRegex(gridItem, device) {
	let width = gridItem[`gridColumnEnd${device}`];
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
function getRegex(item, columns, device) {
	let fp = getFoodprint(item, columns, device, "2");
	let width = item[`gridColumnEnd${device}`];
	if (width > 1) {
		return RegExp(
			fp
				.map((item, index) =>
					item !== undefined ? (index > width - 2 ? "[^13]" : "[^123]") : "."
				)
				.join(""),
			"g"
		);
	} else {
		return RegExp(
			fp.map(item => (item !== undefined ? "[^(1|3)]" : ".")).join(""),
			"g"
		);
	}
}
