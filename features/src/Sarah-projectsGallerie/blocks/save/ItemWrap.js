export default function ItemWrap({ link, index, length, children, fit }) {
	let cn = "gallerie-item";

	return link ? (
		<a href={link} className={cn} data-fit={fit}>
			{children}
		</a>
	) : (
		<div className={cn} data-fit={fit}>
			{children}
		</div>
	);
}
