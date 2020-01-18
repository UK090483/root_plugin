export default class slider {
	constructor(wrap) {
		this.innerElement = wrap.children[0];
		this.wrap = wrap;
	}
	open() {
		this.wrap.style.height =
			this.innerElement.getBoundingClientRect().height + "px";
		setTimeout(() => {
			this.wrap.style.height = "fit-content";
		}, 300);
	}
	close() {
		this.wrap.style.height =
			this.innerElement.getBoundingClientRect().height + "px";
		setTimeout(() => {
			this.wrap.style.height = "0px";
		}, 1);
	}
}
