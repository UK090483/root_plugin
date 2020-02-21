import animations from "../animations/animations";

let items = [].slice.call(
	document.querySelectorAll(".ku-free-grid-animation-listener")
);

if (items.length > 0) {
	console.log(items);
	IntersectionObserverAlternative(items);
}

function IntersectionObserverAlternative(items) {
	let ScrollPos = scrollY;
	let windowBottom = window.innerHeight;
	var loop =
		window.requestAnimationFrame ||
		window.webkitRequestAnimationFrame ||
		window.mozRequestAnimationFrame ||
		window.msRequestAnimationFrame ||
		window.oRequestAnimationFrame ||
		function(callback) {
			return setTimeout(callback, 1000 / 60);
		};

	let cashedItems = [];

	var update = function() {
		if (ScrollPos !== scrollY) {
			windowBottom = window.innerHeight;
			onSrollChange();
			loop(update);
			ScrollPos = scrollY;
		} else {
			window.addEventListener("scroll", update);
		}
	};

	function onSrollChange() {
		checkforItemsInViewPort();
	}

	function checkforItemsInViewPort() {
		cashedItems.forEach(item => {
			let clientRect = item.listener.getBoundingClientRect();
			if (clientRect.top < windowBottom && !(clientRect.bottom < 0)) {
				handleItemIn(item);
			} else if (clientRect.bottom < 0) {
				handleItemOutTop(item);
			} else {
				handleItemOut(item);
			}
		});
	}

	function casheItems() {
		items.forEach(item => {
			cashedItems.push({
				target: item.querySelector(".ku-free-grid-animation-target"),
				listener: item,
				top: item.getBoundingClientRect().top
			});
		});
		cashedItems.sort(function(a, b) {
			return a.top - b.top;
		});
	}

	function init() {
		casheItems();
		checkforItemsInViewPort();
		update();
	}

	function handleItemIn(item) {
		item.target.classList.remove("ku-free-grid-animation-active-over");
		item.target.classList.add("ku-free-grid-animation-active");
	}
	function handleItemOut(item) {
		item.target.classList.remove("ku-free-grid-animation-active-over");
		item.target.classList.remove("ku-free-grid-animation-active");
	}
	function handleItemOutTop(item) {
		item.target.classList.remove("ku-free-grid-animation-active");
		item.target.classList.add("ku-free-grid-animation-active-over");
	}

	init();
}
