function getPositionArray(Attr, skipElements = []) {
	const { children, columns, device } = Attr;
	let res = [];

	children.forEach((child, i) => {
		if (!skipElements.includes(i)) {
			let fp = getFoodprint(child, columns, device, i);
			let index =
				child.attributes[`gridRowStart${device}`] * columns -
				columns +
				(child.attributes[`gridColumnStart${device}`] - 1);
			res = implementArray(index, fp, res);
		}
	});
	// console.log(children);

	// printPos([...res], columns);
	// console.log([...res]);
	return [...res];
}

function implementArray(index, implementArray, targetArray) {
	let res = [...targetArray];
	implementArray.forEach((item, i) => {
		res[index + i] = res[index + i] === undefined ? item : res[index + i];
	});
	return res;
}

function getFoodprint(child, columns, device, index) {
	let width = child.attributes[`gridColumnEnd${device}`];
	let height = child.attributes[`gridRowEnd${device}`];
	let widthArray = new Array(width).fill(index);
	if (height > 1) {
		let res = new Array(height)
			.fill([
				...widthArray,
				...new Array(columns - widthArray.length).fill(undefined)
			])
			.flat();
		res = res.slice(0, res.lastIndexOf(index) + 1);
		return res;
	} else {
		return widthArray;
	}
}

function printPos(pos, columns) {
	let group = [];
	console.log("--------");
	pos.forEach((element, index) => {
		group.push(element === undefined ? "-" : element);
		if (group.length === columns || index === pos.length - 1) {
			console.log("| " + group.join(" ") + " | " + "\n");
			group = [];
		}
	});
	console.log("--------");
}

export { getPositionArray, getFoodprint };
