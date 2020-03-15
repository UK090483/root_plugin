const { dispatch } = wp.data;
import { getPositionArray } from "./helper/positionArray";
import search from "./helper/search";
import getFoodprint from "./helper/footprint";

export default function move(data, attributes, setAttributes) {
	const { childrenAttributes, device } = attributes;
	const { direction, id } = data;
	const columns = attributes[`columns${device}`];
	const rows = attributes[`rows${device}`];
	const nextChildrenAttributes = JSON.parse(JSON.stringify(childrenAttributes));

	let moveItemIndex = childrenAttributes.findIndex(c => c.id === id);
	let nextAttributes = {};
	nextChildrenAttributes[moveItemIndex] = getNextAttributes(
		childrenAttributes[moveItemIndex],
		direction,
		device,
		columns
	);

	let colitions = getColitions(attributes, direction, moveItemIndex);

	if (colitions) {
		let searchResult = handleColitions(
			attributes,
			colitions,
			direction,
			moveItemIndex
		);

		searchResult.colitions.forEach(item => {
			let nextAttributes = changeIndexToAttributes(
				item.changeIndex,
				columns,
				device
			);
			nextChildrenAttributes[item.index] = {
				...nextChildrenAttributes[item.index],
				...nextAttributes
			};
		});
	}

	let RowsNeeded = checkIfRowsNeedChange(nextChildrenAttributes, rows, device);

	if (RowsNeeded) {
		setAttributes({
			childrenAttributes: nextChildrenAttributes,
			[`rows${device}`]: RowsNeeded
		});
	} else {
		setAttributes({ childrenAttributes: nextChildrenAttributes });
	}
}

function handleColitions(attributes, colitions, direction, moveItemIndex) {
	const { childrenAttributes } = attributes;
	const { device } = attributes;
	const columns = attributes[`columns${device}`];

	const NextChildren = JSON.parse(JSON.stringify(childrenAttributes));
	NextChildren[moveItemIndex] = getNextAttributes(
		NextChildren[moveItemIndex],
		direction,
		device,
		columns
	);

	let posArrayWitoutColitionElements = getPositionArray(
		{ ...attributes, ...{ childrenAttributes: NextChildren } },
		colitions
	);

	let searchResult = search(
		attributes,
		posArrayWitoutColitionElements,
		colitions
	);

	return searchResult;

	// if (searchResult.nededRows > rows) {
	// 	dispatch("core/block-editor").updateBlockAttributes(clientId, {
	// 		[`rows${device}`]: searchResult.nededRows
	// 	});
	// }
}

function getColitions(attributes, direction, moveItemIndex) {
	// console.log("---getClitions-----");
	const { device } = attributes;
	const columns = attributes[`columns${device}`];
	let posArray = getPositionArray(attributes);

	let moveItem = attributes.childrenAttributes[moveItemIndex];

	let testAttributes = getNextAttributes(
		JSON.parse(JSON.stringify(moveItem)),
		direction,
		device,
		columns
	);

	let fp = getFoodprint(testAttributes, columns, device, "b");

	let startIndex =
		testAttributes[`gridRowStart${device}`] * columns -
		columns +
		(testAttributes[`gridColumnStart${device}`] - 1);
	let res = [];
	fp.forEach((item, index) => {
		let testValue = posArray[index + startIndex];
		if (typeof testValue === "number" && testValue !== moveItemIndex && item) {
			!res.includes(testValue) && res.push(testValue);
		}
	});

	// console.log("---getClitions-----");
	return res.length > 0 ? res : undefined;
}

function getNextAttributes(attributes, dir, device, columns) {
	let nextAttributes = { ...attributes };

	if (dir === "up") {
		let newValue = nextAttributes[`gridRowStart${device}`] - 1;
		newValue < 1 && (newValue = 1);

		nextAttributes[`gridRowStart${device}`] = newValue;
	}
	if (dir === "down") {
		let newValue = nextAttributes[`gridRowStart${device}`] + 1;
		nextAttributes[`gridRowStart${device}`] = newValue;
	}
	if (dir === "left") {
		let newValue = nextAttributes[`gridColumnStart${device}`] - 1;
		newValue < 1 && (newValue = 1);
		nextAttributes[`gridColumnStart${device}`] = newValue;
	}
	if (dir === "right") {
		let newValue = nextAttributes[`gridColumnStart${device}`] + 1;
		if (newValue > columns) {
			newValue = columns;
		}
		nextAttributes[`gridColumnStart${device}`] = newValue;
	}
	if (dir === "weiter") {
		let newValue = nextAttributes[`gridColumnEnd${device}`] + 1;

		if (
			nextAttributes[`gridColumnStart${device}`] +
				nextAttributes[`gridColumnEnd${device}`] >
			columns
		) {
		} else {
			nextAttributes[`gridColumnEnd${device}`] = newValue;
		}
	}
	if (dir === "schmaler") {
		let newValue = nextAttributes[`gridColumnEnd${device}`] - 1;
		newValue < 1 && (newValue = 1);
		nextAttributes[`gridColumnEnd${device}`] = newValue;
	}
	if (dir === "höher") {
		let newValue = nextAttributes[`gridRowEnd${device}`] + 1;
		nextAttributes[`gridRowEnd${device}`] = newValue;
	}
	if (dir === "niedriger") {
		let newValue = nextAttributes[`gridRowEnd${device}`] - 1;
		newValue < 1 && (newValue = 1);
		nextAttributes[`gridRowEnd${device}`] = newValue;
	}

	return nextAttributes;
}

function changeIndexToAttributes(changeIndex, columns, device) {
	return {
		[`gridColumnStart${device}`]: (changeIndex % columns) + 1,
		[`gridRowStart${device}`]: Math.ceil((changeIndex + 1) / columns)
	};
}

function checkIfRowsNeedChange(nextChildrenAttributes, rows, device) {
	let neededRows =
		nextChildrenAttributes.reduce((reduceValue, child) => {
			let height =
				child[`gridRowStart${device}`] + child[`gridRowEnd${device}`];

			return height > reduceValue ? height : reduceValue;
		}, 0) - 1;
	console.log(neededRows);
	console.log(rows);
	return neededRows > rows ? neededRows : undefined;
}
