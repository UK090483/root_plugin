import ItemWrap from "./ItemWrap";
import { toCss, toJs } from "../helper/converter";

export default function({ attributes }) {
	const {
		Id,
		borderRadius,
		containerHeight,
		marginTop,
		marginBottom,
		images,
		sizes
	} = attributes;

	function getStyles() {
		let style = {};
		style[`.grid-Gallerie-item-front${Id}`] = {
			["border-radius"]: `${borderRadius.value}${borderRadius.unit}`
		};

		attributes.images.forEach((element, index) => {
			let top = images[index].top;
			let left = images[index].left;
			let width = images[index].width;
			let height = images[index].height;

			style[`.grid-Gallerie-item-front${Id}-${index}`] = {
				["background-image"]: `url(${element.sizes.full.url})`,
				top: top + "%",
				left: left + "%",
				width: width + "%",
				height: height + "%"
			};
		});
		return toCss(style);
	}

	function getImages() {
		return attributes.images.map((i, index) => {
			return <ItemWrap i={i} index={index} id={Id}></ItemWrap>;
		});
	}

	return (
		<div>
			{attributes.images.length > 0 && (
				<div
					className={`grid-Gallerie-wrap-front `}
					style={{
						marginTop: marginTop,
						marginBottom,
						paddingTop: containerHeight * 100 + "%"
					}}
				>
					<style>{getStyles()}</style>
					{getImages()}
				</div>
			)}

			<script>
				{`document.addEventListener("DOMContentLoaded",function(){var e=[].slice.call(document.querySelectorAll("img.lazy${Id}"));if("IntersectionObserver"in window){var s=new IntersectionObserver(function(e,t){e.forEach(function(e){if(e.isIntersecting){let t=e.target;t.src=t.dataset.src,t.classList.remove("lazy${Id}"),t.classList.add("image"),s.unobserve(t)}})});e.forEach(function(e){s.observe(e)})}else e.forEach(function(e){e.src=e.dataset.src,e.classList.remove("lazy${Id}"),e.classList.add("image")})});`}
			</script>
		</div>
	);
}
