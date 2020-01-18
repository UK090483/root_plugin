export default function init() {
	let items = document.querySelectorAll(".amh-readmore-item");
	let subItems = document.querySelectorAll(".amh-readmore-subContent");
	items.forEach(b => {
		b.addEventListener("click", buttonClicked, false);
	});
	function buttonClicked(e) {
		handleclick(e.target);
	}

	function handleclick(target) {
		let id = target.dataset.id;
		if (target.classList.contains("amh-readmore-item-active")) {
			id = 0;
		}
		handlebuttons(id);
		handleContent(id);
	}
	function handleContent(id) {
		subItems.forEach(item => {
			if (item.dataset.id === id) {
				item.classList.add("amh-readmore-subContent-active");
				window.scrollTo({
					top: item.getBoundingClientRect().top + window.scrollY - 300,
					behavior: "smooth"
				});
			} else {
				item.classList.remove("amh-readmore-subContent-active");
				item.classList.add("amh-readmore-subContent-inactive");
			}
		});
	}
	function handlebuttons(id) {
		items.forEach(button => {
			if (button.dataset.id === id) {
				button.classList.remove("amh-readmore-item-inactive");
				button.classList.add("amh-readmore-item-active");
			} else {
				button.classList.remove("amh-readmore-item-active");
				if (id === 0) {
					button.classList.remove("amh-readmore-item-inactive");
				} else {
					button.classList.add("amh-readmore-item-inactive");
				}
			}
		});
	}
}
