const { Button, ButtonGroup, RangeControl } = wp.components;

export default function range(props) {
	return (
		<div>
			<RangeControl
				label={"Corners"}
				value={value.value}
				onChange={value => setState({ value })}
				min={0}
				max={100}
			></RangeControl>
		</div>
	);
}
