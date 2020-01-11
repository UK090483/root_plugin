export default function init() {
	let buttons = document.querySelectorAll(".amh-readmore-item-arrow");
	let items = document.querySelectorAll(".amh-readmore-subContent");
	buttons.forEach(b => {
		b.addEventListener("click", buttonClicked, false);
	});
	function buttonClicked(e) {
		handleclick(e.target);
	}

	function handleclick(target) {
		let id = target.dataset.id;
		if (target.classList.contains("amh-readmore-item-arrow-active")) {
			id = 0;
		}
		handlebuttons(id);
		handleContent(id);
	}
	function handleContent(id) {
		items.forEach(item => {
			if (item.dataset.id === id) {
				item.classList.add("amh-readmore-subContent-active");
			} else {
				item.classList.remove("amh-readmore-subContent-active");
			}
		});
	}
	function handlebuttons(id) {
		buttons.forEach(button => {
			if (button.dataset.id === id) {
				button.classList.add("amh-readmore-item-arrow-active");
			} else {
				button.classList.remove("amh-readmore-item-arrow-active");
			}
		});
	}
}
