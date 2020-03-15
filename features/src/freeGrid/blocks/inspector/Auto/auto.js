import search from "../move/helper/search";
import { getPositionArray } from "../move/helper/positionArray";

export default function setAuto(attributes, setAttributes) {
	const { childrenAttributes, device } = attributes;

	const columns = attributes[`columns${device}`];

	let items = childrenAttributes.map((a, i) => i);
	let positionSortedItems = positionSortItems(
		items,
		childrenAttributes,
		device
	);

	let posArray = getPositionArray(attributes, items);
	let searchResult = search(attributes, posArray, positionSortedItems, false);
	const nextChildrenAttributes = JSON.parse(JSON.stringify(childrenAttributes));

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

	setAttributes({ childrenAttributes: nextChildrenAttributes });
}

function positionSortItems(items, childrenAttributes, device) {
	return [...items].sort((a, b) => {
		let indexA =
			childrenAttributes[a][`gridRowStart${device}`] -
			1 +
			(childrenAttributes[a][`gridColumnStart${device}`] - 1);
		let indexB =
			childrenAttributes[b][`gridRowStart${device}`] -
			1 +
			(childrenAttributes[b][`gridColumnStart${device}`] - 1);

		if (indexA < indexB) {
			return -1;
		}
		if (indexA > indexB) {
			return 1;
		}
		return 0;
	});
}
function changeIndexToAttributes(changeIndex, columns, device) {
	return {
		[`gridColumnStart${device}`]: (changeIndex % columns) + 1,
		[`gridRowStart${device}`]: Math.ceil((changeIndex + 1) / columns)
	};
}
