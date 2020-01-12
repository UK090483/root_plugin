import initReadmore from "./blocks/frontend/frontend";

document.addEventListener("DOMContentLoaded", function() {
	let readmore = document.querySelectorAll(".read-more-trigger");
	if (readmore) {
		initReadmore(readmore);
	}
});
