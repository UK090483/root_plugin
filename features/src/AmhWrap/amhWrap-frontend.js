import initamhReadmore from "./blocks/frontend/frontend";

document.addEventListener("DOMContentLoaded", function() {
	let amhReadmore = document.querySelectorAll(".amh-wrap-wrap");
	if (amhReadmore) {
		initamhReadmore(amhReadmore);
	}
});
