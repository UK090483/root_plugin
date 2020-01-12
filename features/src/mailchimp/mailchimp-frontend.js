import initMailchimp from "./blocks/frontend/frontend";

document.addEventListener("DOMContentLoaded", function() {
	let submit = document.querySelector(".wf-mc-submit");

	if (submit) {
		initMailchimp(submit);
	}
});
