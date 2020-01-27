export default function ItemWrap({
	children,
	i,
	positions,
	index,
	borderRadius
}) {
	let cn = "grid-Gallerie-item-front";
	const positionsObject = JSON.parse(positions);
	let p = positionsObject[index] || {
		left: 0,
		top: 0,
		width: 100,
		height: 100
	};
	let url = i.sizes.full.url;

	let style = {
		backgroundImage: `url(${url})`,
		borderRadius: borderRadius.value + borderRadius.unit,
		backgroundSize: i.fit
	};

	return i.link.url ? (
		<a
			style={style}
			href={i.link.url}
			className={cn}
			data-width={p.width}
			data-height={p.height}
			data-top={p.top}
			data-left={p.left}
		>
			{children}
		</a>
	) : (
		<div
			style={style}
			className={cn}
			data-width={p.width}
			data-height={p.height}
			data-top={p.top}
			data-left={p.left}
		>
			{children}
		</div>
	);
}
