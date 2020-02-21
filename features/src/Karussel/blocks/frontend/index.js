export default function init(hero) {
	let heroVideo = document.querySelectorAll(".hero-image-video");
	heroVideo.forEach(element => {
		element.onloadeddata = function() {
			element.classList.add("video-loaded");
		};
	});

	const myParalax = function(wraps) {
		var ScrollPos;
		var cache = [];
		var loop =
			window.requestAnimationFrame ||
			window.webkitRequestAnimationFrame ||
			window.mozRequestAnimationFrame ||
			window.msRequestAnimationFrame ||
			window.oRequestAnimationFrame ||
			function(callback) {
				return setTimeout(callback, 1000 / 60);
			};

		var update = function() {
			if (ScrollPos !== scrollY) {
				animate();
				loop(update);
				ScrollPos = scrollY;
			} else {
				window.addEventListener("scroll", update);
			}
		};
		var animate = function() {
			cache.forEach(item => {
				let pos = item.wrap.getBoundingClientRect();
				if (pos.top * -1 < pos.height && pos.top < pos.height) {
					let top = pos.top * -0.5;
					item.element.style.transform = `translate3d(0px,${top}px,0px)`;
				}
			});
		};
		const init = function() {
			wraps.forEach(element => {
				cache.push({
					element: element,
					wrap: element.parentElement
				});
			});
		};

		if (window.innerWidth > 450) {
			init();
			update();
		}
	};

	const myKarussell = hero => {
		let items = hero[0].querySelectorAll(".karussell-image");

		let counter = 0;
		setInterval(() => {
			counter = counter === items.length - 1 ? 0 : counter + 1;
			setActive(counter);
		}, 5000);
		function setActive(index) {
			items.forEach(item => {
				item.classList.remove("active");
			});
			items[index].classList.add("active");
		}
	};
	myKarussell(hero);
	myParalax(hero);
}
