export default function init(elems) {
	elems.forEach(element => {
		element.addEventListener("click", toggleExpand);
	});

	function toggleExpand(elem) {
		const target = elem.target.parentElement.parentElement.querySelector(
			".read-more-target"
		);
		target.classList.toggle("collapsed");
		target.classList.toggle("expanded");
		elem.target.innerHTML = target.classList.contains("collapsed")
			? elem.target.dataset.more
			: elem.target.dataset.less;
	}
}
