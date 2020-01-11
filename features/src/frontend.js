import initHero from "./hero/frontend";
import initMailchimp from "./mailchimp/mailchimp-frontend";
import initamhReadmore from "./AmhReadmore/readmore-frontend";
import initReadmore from "./readmore/readmore-frontend";

document.addEventListener("DOMContentLoaded", function() {
	let hero = document.querySelectorAll(".hero-paralax-wrap");
	if (hero.length > 0) {
		initHero(hero);
	}

	let submit = document.querySelector(".wf-mc-submit");

	if (submit) {
		initMailchimp(submit);
	}

	let amhReadmore = document.querySelectorAll(".amh-readmore-wrap");

	if (amhReadmore) {
		initamhReadmore(amhReadmore);
	}
	let readmore = document.querySelectorAll(".read-more-trigger");
	if (readmore) {
		initReadmore(readmore);
	}
});

// function toggleExpand(elem) {
// 	console.log(elem);
// 	const target = elem.parentElement.querySelector(".read-more-target");
// 	target.classList.toggle("collapsed");
// 	target.classList.toggle("expanded");
// 	elem.innerHTML = target.classList.contains("collapsed")
// 		? "Show less"
// 		: "Show more";
// }

// document.toggleExpand = toggleExpand;
