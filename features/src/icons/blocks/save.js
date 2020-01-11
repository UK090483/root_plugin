const { G, Path, SVG } = wp.components;

export default function save({ attributes }) {
	const { icons } = attributes;
	function getIcons() {
		return icons.map(i => {
			const paths = i.path.map(path => {
				return <Path fill={"grey"} d={path} />;
			});
			return (
				<SVG
					style={{ height: 30, width: 30 }}
					viewBox="0 0 24 24"
					xmlns="http://www.w3.org/2000/svg"
				>
					<G>{paths}</G>
				</SVG>
			);
		});
	}
	return <div>{icons.length > 0 ? getIcons() : <h1>add icons</h1>}</div>;
}
