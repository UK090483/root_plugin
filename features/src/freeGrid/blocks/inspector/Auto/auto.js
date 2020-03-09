const { dispatch } = wp.data;

export default function setAuto(children, device, setAttributes, attributes) {
	let columns = attributes[`columns${device}`];
	let rows = attributes[`rows${device}`];

	let pos = [];
	let emtyRow = [...new Array(columns - 1).fill(0), ...[2]];
	let searchAdd = new Array(16).fill(emtyRow).flat();
	let cache = { children: [...children], rows: rows };
	let childrenCopy = JSON.parse(JSON.stringify(children));
	let sortedGridElements = sortGridElements(childrenCopy, device);

	sortedGridElements.forEach(child => {
		let newAttributes = { ...child.attributes };

		let width = newAttributes[`gridColumnEnd${device}`];
		let height = newAttributes[`gridRowEnd${device}`];

		if (width > columns) {
			width = columns;
			newAttributes[`gridColumnEnd${device}`] = 1;
			newAttributes[`gridRowEnd${device}`] = 1;
		}

		let foodprint = getFoodprint(width, height, columns);

		let search = [...pos, ...searchAdd.slice(pos.length)]
			.join("")
			.match(foodprintToRegex(foodprint, width));

		let gcs = search
			? (search.index % columns) + 1
			: (pos.length % columns) + 1;
		let grs = search
			? Math.floor(search.index / columns) + 1
			: Math.floor(pos.length / columns) | 1;

		console.log(pos);
		console.log(foodprint);
		console.log(foodprintToRegex(foodprint, width));
		console.log([...pos, ...searchAdd.slice(pos.length)].join(""));
		console.log(search);

		console.log(gcs);
		console.log(grs);

		pos = implementArray(search.index, foodprint, pos, columns, emtyRow);

		// console.log("----------------------------------------------");

		newAttributes[`gridColumnStart${device}`] = gcs;
		newAttributes[`gridRowStart${device}`] = grs;

		dispatch("core/block-editor").updateBlockAttributes(
			child.clientId,
			newAttributes
		);
	});
	// console.log(pos);
	setAttributes({
		[`rows${device}`]: Math.ceil(pos.length / columns)
	});

	return cache;
}

function implementArray(index, implementArray, targetArray, columns, emtyRow) {
	let res = [...targetArray];
	implementArray.forEach((item, i) => {
		if ((index + i) % columns === columns - 1) {
			res[index + i] = item === 1 ? 3 : 2;
		} else {
			res[index + i] = item === 1 ? 1 : res[index + i] || 0;
		}
	});
	if (res.length % columns !== 0) {
		return [...res, ...emtyRow.slice(res.length % columns)];
	} else {
		return res;
	}
}

function foodprintToRegex(foodprint, width) {
	if (width > 1) {
		return RegExp(
			foodprint
				.slice(0, foodprint.lastIndexOf(1) + 1)
				.map((item, index) =>
					item === 1 ? (index > width - 2 ? "[^13]" : "[^123]") : "."
				)
				.join("")
		);
	} else {
		return RegExp(
			foodprint
				.slice(0, foodprint.lastIndexOf(1) + 1)
				.map(item => (item === 1 ? "[^(1|3)]" : "."))
				.join("")
		);
	}
}
function getFoodprint(width, height, columns) {
	let widthArray = new Array(width).fill(1);

	if (height > 1) {
		let res = new Array(height)
			.fill([...widthArray, ...new Array(columns - widthArray.length).fill(0)])
			.flat();

		return res;
	} else {
		return widthArray;
	}
}

function sortGridElements(gridElements, device) {
	return gridElements.sort((a, b) => {
		let indexA =
			a.attributes[`gridRowStart${device}`] -
			1 +
			(a.attributes[`gridColumnStart${device}`] - 1);
		let indexB =
			b.attributes[`gridRowStart${device}`] -
			1 +
			(b.attributes[`gridColumnStart${device}`] - 1);

		if (indexA < indexB) {
			return -1;
		}
		if (indexA > indexB) {
			return 1;
		}
		return 0;
	});
}
