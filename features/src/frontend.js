import initHero from "./hero/frontend";
import initMailchimp from "./mailchimp/mailchimp-frontend";

document.addEventListener("DOMContentLoaded", function() {
	let hero = document.querySelectorAll(".hero-paralax-wrap");
	if (hero.length > 0) {
		initHero(hero);
	}

	let submit = document.querySelector(".wf-mc-submit");

	if (submit) {
		console.log("blaaaa");
		initMailchimp(submit);
	}
});
