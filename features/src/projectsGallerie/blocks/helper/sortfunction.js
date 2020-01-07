export default function getSortfn(sort) {
	return function(a, b) {
		var nameA = a.alt ? a.alt.toUpperCase() : a.fileName.toUpperCase();
		var nameB = b.alt ? b.alt.toUpperCase() : b.fileName.toUpperCase();
		if (sort === "<" ? nameA > nameB : nameA < nameB) {
			return -1;
		}
		if (sort === "<" ? nameA < nameB : nameA > nameB) {
			return 1;
		}
		return 0;
	};
}
