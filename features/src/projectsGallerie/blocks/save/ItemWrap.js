export default function ItemWrap({ link, index, length, children }) {
	let cn = "gallerie-item";
	if (index === length - 1) {
		if (length % 3 > 1) {
			cn += " gallerie-item3-" + (length % 3) + "-übrig";
		}
		if (length % 4 > 1) {
			cn += " gallerie-item4-" + (length % 4) + "-übrig";
		}
	}
	return link ? (
		<a href={link} className={cn}>
			{children}
		</a>
	) : (
		<div className={cn}>{children}</div>
	);
}
