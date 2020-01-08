import ItemWrap from "./ItemWrap";

export default function({ attributes }) {
	const { id, borderRadius } = attributes;

	function getImages() {
		return attributes.images.map((i, index) => {
			let url = i.sizes.hasOwnProperty("medium")
				? i.sizes.medium.url
				: i.sizes.full.url;

			return (
				<div
					className={`grid-Gallerie-item grid-Gallery-${i.pos}`}
					style={{
						backgroundImage: `url(${url})`,
						borderRadius: borderRadius.value + borderRadius.unit
					}}
				></div>
			);
		});
	}

	return (
		<div>
			{attributes.images.length > 0 && (
				<div className={"grid-Gallerie-wrap"}>{getImages()}</div>
			)}

			<script>
				{`document.addEventListener("DOMContentLoaded",function(){var e=[].slice.call(document.querySelectorAll("img.lazy${id}"));if("IntersectionObserver"in window){var s=new IntersectionObserver(function(e,t){e.forEach(function(e){if(e.isIntersecting){let t=e.target;t.src=t.dataset.src,t.classList.remove("lazy${id}"),t.classList.add("image"),s.unobserve(t)}})});e.forEach(function(e){s.observe(e)})}else e.forEach(function(e){e.src=e.dataset.src,e.classList.remove("lazy${id}"),e.classList.add("image")})});`}
			</script>
		</div>
	);
}
