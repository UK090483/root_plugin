const toCss = input => {
	let result = "";
	Object.keys(input).forEach(key => {
		result += key + "{";
		result += getProps(input[key]);
		result += "}";
	});

	function getProps(probsObject) {
		let result = "";
		Object.keys(probsObject).forEach(key => {
			result += key + ":";
			result += probsObject[key] + ";";
		});

		return result;
	}

	return result;
};
const toJs = input => {
	let result = {};
	let split = input.split("}");

	split.forEach(item => {
		if (item) {
			let key = getkey(item);

			result[key] = getProps(item, key);
		}
	});

	function getProps(item, key) {
		let props = {};
		if (item) {
			let a = item
				.replace(key, "")
				.replace("}", "")
				.replace("{", "")
				.split(";");

			a.forEach(prop => {
				if (prop) {
					let pair = prop.split(/:/);
					let name = pair.shift();

					props[name] = pair.join("");
				}
			});
		}

		return props;
	}
	function getkey(item) {
		return item.split("{")[0];
	}

	return result;
};

export { toCss, toJs };
