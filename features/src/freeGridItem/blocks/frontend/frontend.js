import animations from "../animations/animations";

if (window.NodeList && !NodeList.prototype.forEach) {
	NodeList.prototype.forEach = Array.prototype.forEach;
}

let items = [].slice.call(
	document.querySelectorAll(".ku-free-grid-animation-listener")
);

if (items.length > 0) {
	IntersectionObserverAlternative(items);
}

function IntersectionObserverAlternative(items) {
	let ScrollPos = window.pageYOffset;
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
		if (ScrollPos !== window.pageYOffset) {
			windowBottom = window.innerHeight;
			onSrollChange();
			loop(update);
			ScrollPos = window.pageYOffset;
		} else {
			window.addEventListener("scroll", update);
		}
	};

	function onSrollChange() {
		checkforItemsInViewPort();
	}

	function checkforItemsInViewPort() {
		let itemInCounter = 0;
		cashedItems.forEach(item => {
			let clientRect = item.listener.getBoundingClientRect();
			if (clientRect.top < windowBottom && !(clientRect.bottom < 0)) {
				setTimeout(() => {
					handleItemIn(item);
				}, 200 * itemInCounter);
				itemInCounter++;
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
		item.listener.classList.remove("ku-free-grid-animation-active-over");
		item.listener.classList.add("ku-free-grid-animation-active");
	}
	function handleItemOut(item) {
		item.listener.classList.remove("ku-free-grid-animation-active-over");
		item.listener.classList.remove("ku-free-grid-animation-active");
	}
	function handleItemOutTop(item) {
		item.listener.classList.remove("ku-free-grid-animation-active");
		item.listener.classList.add("ku-free-grid-animation-active-over");
	}

	init();
}
