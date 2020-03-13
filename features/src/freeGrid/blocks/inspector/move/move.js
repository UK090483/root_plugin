const { dispatch } = wp.data;
import { getPositionArray } from "./helper/positionArray";
import search from "./helper/search";
import getFoodprint from "./helper/footprint";

export default function move(
	dir,
	id,
	children,
	device,
	columns,
	rows,
	clientId
) {
	let moveItemIndex = children.findIndex(child => id === child.clientId);
	let moveItem = children[moveItemIndex];

	let gridItems = children.map((child, index) => ({
		footprint: getFoodprint(child, columns, device, index),
		attributes: { ...child.attributes },
		index: index,
		clientId: child.clientId
	}));

	let globAttr = {
		moveItemIndex: moveItemIndex,
		moveItem: moveItem,
		children: gridItems,
		columns: columns,
		rows: rows,
		device: device,
		dir: dir,
		clientId: clientId
	};

	let colitions = getColitions(globAttr);
	if (colitions) {
		handleColitions(colitions, globAttr, gridItems);
	}

	let nextAttributes = getNextAttributes(
		moveItem.attributes,
		dir,
		device,
		columns
	);
	dispatch("core/block-editor").updateBlockAttributes(id, nextAttributes);
}

function handleColitions(colitions, globAttr, gridItems) {
	const {
		children,
		moveItemIndex,
		dir,
		device,
		columns,
		rows,
		clientId
	} = globAttr;
	const NextChildren = JSON.parse(JSON.stringify(children));
	NextChildren[moveItemIndex].attributes = getNextAttributes(
		NextChildren[moveItemIndex].attributes,
		dir,
		device,
		columns
	);
	let posArrayWitoutColitionElements = getPositionArray(
		{ ...globAttr, ...{ children: NextChildren } },
		colitions
	);

	let searchResult = search(
		posArrayWitoutColitionElements,
		colitions.map((i, index) => {
			return gridItems[i];
		}),
		columns,
		device
	);

	searchResult.colitions.forEach(item => {
		dispatch("core/block-editor").updateBlockAttributes(
			item.clientId,
			changeIndexToAttributes(item.changeIndex, columns, device)
		);
	});

	if (searchResult.nededRows > rows) {
		dispatch("core/block-editor").updateBlockAttributes(clientId, {
			[`rows${device}`]: searchResult.nededRows
		});
	}
}

function getColitions(globAttr) {
	console.log("---getClitions-----");
	const { moveItemIndex, moveItem, children, columns, device, dir } = globAttr;
	let posArray = getPositionArray(globAttr);
	console.log(posArray);
	let testAttributes = getNextAttributes(
		JSON.parse(JSON.stringify(moveItem.attributes)),
		dir,
		device,
		columns
	);
	console.log("---getClitions-----");
	let fp = getFoodprint({ attributes: testAttributes }, columns, device, "b");
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
	return res.length > 0 ? res : undeinded;
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
