document.addEventListener("DOMContentLoaded", function() {
	let wraps = document.querySelectorAll(".gallerie-wrap");
	if (wraps.length > 0) {
		wraps.forEach(wrap => {
			new kuGallery(wrap);
		});
	}
});

function kuGallery(wrap) {
	this.wrap = wrap;
	this.images = this.wrap.querySelectorAll(".gallerie-item");
	this.width = wrap.getBoundingClientRect().width;
	this.gap = 20;
	this.columns = 3;
	this.ratio = 1.3;

	this.gap = parseInt(wrap.dataset.gap);
	this.columns = wrap.dataset.columns;
	this.ratio = wrap.dataset.ratio / 100;

	window.addEventListener("resize", () => resize(this));

	function resize(self) {
		self.width = wrap.getBoundingClientRect().width;
		if (self.width < 600) {
			self.columns = 1;
		} else {
			self.columns = 3;
		}
		setImages(self);
	}

	function setWrap(self, height) {
		let rows = Math.floor(self.images.length / self.columns) + 1;
		let wrapHeight = rows * height + rows * self.gap;
		self.wrap.style.height = wrapHeight + "px";
	}

	function setImages(self) {
		let gapSum = self.columns - 1;
		let width = (self.width - self.gap * gapSum) / self.columns;
		let height = width * self.ratio;
		setWrap(self, height);

		self.images.forEach((image, index) => {
			let posX = (index % self.columns) * (width + self.gap);
			let posY = Math.floor(index / self.columns) * (height + self.gap);

			image.style.width = width + "px";
			image.style.height = height + "px";
			image.style.left = posX + "px";
			image.style.top = posY + "px";
		});
	}
	setImages(this);
}
