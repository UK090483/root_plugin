import initHero from "./blocks/frontend/index";

document.addEventListener("DOMContentLoaded", function() {
	let hero = document.querySelectorAll(".karussell-wrap");
	if (hero.length > 0) {
		initHero(hero);
	}
});
