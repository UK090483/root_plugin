export default function ItemWrap( { i, index, id } ) {
	const cn = `grid-Gallerie-item-front${ id }-${ index } grid-Gallerie-item-front${ id } grid-Gallerie-item-front grid-Galleri-${ i.pos }`;

	const style = {
		backgroundSize: i.fit,
	};

	return i.link.url ? (
		<a style={ style } href={ i.link.url } className={ cn }>
			<div className={ 'grid-Gallerie-item-text' }>
				{ i.alt && <h5>{ i.alt }</h5> }
			</div>
		</a>
	) : (
		<div style={ style } className={ cn }>
			<div className={ 'grid-Gallerie-item-text' }>
				{ i.alt && <h5>{ i.alt }</h5> }
			</div>
		</div>
	);
}
