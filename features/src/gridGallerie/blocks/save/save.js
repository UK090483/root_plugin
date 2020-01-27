import ItemWrap from "./ItemWrap";

export default function({ attributes }) {
	const {
		id,
		borderRadius,
		collumns,
		gridHeight,
		gap,
		ratio,
		positions,
		containerHeight,
		marginTop,
		marginBottom
	} = attributes;

	function getImages() {
		return attributes.images.map((i, index) => {
			return (
				<ItemWrap
					i={i}
					positions={positions}
					index={index}
					borderRadius={borderRadius}
				>
					<div className={"grid-Gallerie-item-text"}>
						{i.alt && <h5>{i.alt}</h5>}
					</div>
				</ItemWrap>
			);
		});
	}

	return (
		<div>
			{attributes.images.length > 0 && (
				<div
					className={"grid-Gallerie-wrap-front"}
					data-height={containerHeight}
					data-ratio={ratio / 100}
					data-gap={gap}
					style={{ marginTop: marginTop, marginBottom }}
				>
					{getImages()}
				</div>
			)}

			<script>
				{`document.addEventListener("DOMContentLoaded",function(){var e=[].slice.call(document.querySelectorAll("img.lazy${id}"));if("IntersectionObserver"in window){var s=new IntersectionObserver(function(e,t){e.forEach(function(e){if(e.isIntersecting){let t=e.target;t.src=t.dataset.src,t.classList.remove("lazy${id}"),t.classList.add("image"),s.unobserve(t)}})});e.forEach(function(e){s.observe(e)})}else e.forEach(function(e){e.src=e.dataset.src,e.classList.remove("lazy${id}"),e.classList.add("image")})});`}
			</script>
		</div>
	);
}
