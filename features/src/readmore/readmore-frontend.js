export default function init(elems) {
	elems.forEach(element => {
		element.addEventListener("click", toggleExpand);
	});

	function toggleExpand(elem) {
		const target = elem.target.parentElement.querySelector(".read-more-target");
		target.classList.toggle("collapsed");
		target.classList.toggle("expanded");
		elem.innerHTML = target.classList.contains("collapsed")
			? "Show less"
			: "Show more";
	}
}
