export default function useAttributes( props ) {
	const { attributes } = props;
	const { device } = attributes;

	return {
		gap: attributes[ `gap${ device }` ],
		columns: attributes[ `columns${ device }` ],
		rows: attributes[ `rows${ device }` ],
		ratio: attributes[ `ratio${ device }` ][ 0 ] / attributes[ `ratio${ device }` ][ 1 ],
		breakingPoint: attributes[ `breakingPoint${ device }` ],
		marginTop: attributes[ `marginTop${ device }` ],
		marginBottom: attributes[ `marginBottom${ device }` ],
	};
}
