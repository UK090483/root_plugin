function toggleExpand(elem) {
	const target = elem.parentElement.querySelector(".read-more-target");
	target.classList.toggle("collapsed");
	target.classList.toggle("expanded");
	elem.innerHTML = target.classList.contains("collapsed")
		? "Show less"
		: "Show more";
}
