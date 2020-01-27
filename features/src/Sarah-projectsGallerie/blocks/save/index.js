import ItemWrap from "./ItemWrap";

export default function({ attributes }) {
	const { columns, Id, gap, ratio } = attributes;

	function getImages() {
		return attributes.images.map((i, index) => {
			let url = i.sizes.hasOwnProperty("medium")
				? i.sizes.medium.url
				: i.sizes.full.url;

			return (
				<ItemWrap link={i.link.url} fit={i.fit}>
					<noscript>
						<img className={"image"} src={url}></img>
					</noscript>
					<img className={`lazy${Id}`} data-src={url}></img>
					<div className={"gallerie-item-text"}>{i.alt}</div>
				</ItemWrap>
			);
		});
	}

	return (
		<div>
			{attributes.images.length > 0 && (
				<div
					className={"gallerie-wrap"}
					data-gap={gap}
					data-columns={columns}
					data-ratio={ratio}
				>
					{getImages()}
				</div>
			)}

			<script>
				{`document.addEventListener("DOMContentLoaded",function(){var e=[].slice.call(document.querySelectorAll("img.lazy${Id}"));if("IntersectionObserver"in window){var s=new IntersectionObserver(function(e,t){e.forEach(function(e){if(e.isIntersecting){let t=e.target;t.src=t.dataset.src,t.classList.remove("lazy${Id}"),t.classList.add("image"),s.unobserve(t)}})});e.forEach(function(e){s.observe(e)})}else e.forEach(function(e){e.src=e.dataset.src,e.classList.remove("lazy${Id}"),e.classList.add("image")})});`}
			</script>
		</div>
	);
}
