import initHero from "./blocks/frontend/index";

document.addEventListener("DOMContentLoaded", function() {
	let hero = document.querySelectorAll(".hero-paralax-wrap");
	if (hero.length > 0) {
		initHero(hero);
	}
});
