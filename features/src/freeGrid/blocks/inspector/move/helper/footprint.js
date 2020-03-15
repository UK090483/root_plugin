export default function getFoodprint(child, columns, device, index) {
	let width = child[`gridColumnEnd${device}`];
	let height = child[`gridRowEnd${device}`];
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
