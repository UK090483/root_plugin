import Slider from "./slideDown";

export default function init(wraps) {
	let activeElement = null;
	wraps.forEach(b => {
		b.querySelector(".amh-wrap-head").addEventListener(
			"click",
			wrapClicked,
			false
		);
	});
	function wrapClicked(e) {
		handleclick(e.target.parentElement);
	}

	function handleclick(target) {
		if (target.classList.contains("amh-wrap-wrap-active")) {
			resetElement(target);
		} else {
			resetElement(activeElement);
			setElementActive(target);
		}
	}

	function resetElement() {
		if (activeElement) {
			activeElement.element.classList.remove("amh-wrap-wrap-active");
			activeElement.slider.close();
			activeElement = null;
		}
	}
	function setElementActive(target) {
		target.classList.add("amh-wrap-wrap-active");
		scrollIntoView(target);
		activeElement = {
			slider: new Slider(
				target.querySelector(".amh-wrap-innerBlocks-container")
			),
			element: target
		};

		activeElement.slider.open();
	}

	function scrollIntoView(target) {
		setTimeout(params => {
			window.scrollTo({
				top: target.getBoundingClientRect().top + window.scrollY - 100,
				behavior: "smooth"
			});
		}, 300);
	}
}
