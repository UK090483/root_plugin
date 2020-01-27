document.addEventListener("DOMContentLoaded", function() {
	let wraps = document.querySelectorAll(".grid-Gallerie-wrap-front");
	if (wraps.length > 0) {
		wraps.forEach(wrap => {
			new kuGallery(wrap);
		});
	}
});

function kuGallery(wrap) {
	this.wrap = wrap;
	this.images = this.wrap.querySelectorAll(".grid-Gallerie-item-front");
	this.width = wrap.getBoundingClientRect().width;

	window.addEventListener("resize", () => resize(this));

	function resize(self) {
		self.width = wrap.getBoundingClientRect().width;
		if (self.width < 600) {
			setImagesMolile(self);
		} else {
			setImages(self);
		}
	}

	function setImages(self) {
		self.wrap.style.height = self.width * self.wrap.dataset.height + "px";
		self.images.forEach(image => {
			let width = image.dataset.width * self.width;
			let height = image.dataset.height * self.width;
			let left = image.dataset.left * self.width;
			let top = image.dataset.top * self.width;

			image.style.position = "absolute";
			image.style.width = width + "px";
			image.style.height = height + "px";
			image.style.left = left + "px";
			image.style.top = top + "px";
		});
	}
	function setImagesMolile(self) {
		self.wrap.style.height = "unset";
		self.images.forEach(image => {
			image.style.position = "unset";
			image.style.width = "100%";
			image.style.height = self.width * self.wrap.dataset.ratio + "px";
			image.style.marginBottom = self.wrap.dataset.gap + "px";
		});
	}
	setImages(this);
}
