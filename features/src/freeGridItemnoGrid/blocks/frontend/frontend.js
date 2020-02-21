import animations from "../animations/animations";

let items = [].slice.call(
	document.querySelectorAll(".ku-free-grid-animation-listener")
);

let I = items.map(item => ({
	listener: item,
	target: item.querySelector(".ku-free-grid-animation-target")
}));

if ("IntersectionObserver" in window) {
	let lazyImageObserver = new IntersectionObserver(function(items, observer) {
		items.forEach(function(entry, index) {
			let item = entry.target;
			let target = item.querySelector(".ku-free-grid-animation-target");
			if (entry.isIntersecting) {
				target.classList.remove("ku-free-grid-animation-active-over");
				target.classList.add("ku-free-grid-animation-active");
			} else {
				if (entry.boundingClientRect.y < 0) {
					target.classList.remove("ku-free-grid-animation-active");
					target.classList.add("ku-free-grid-animation-active-over");
				}
				target.classList.remove("ku-free-grid-animation-active");
			}
		});
	});
	I.forEach(function(item) {
		lazyImageObserver.observe(item.listener);
	});
} else {
	// Possibly fall back to a more compatible method here
}
