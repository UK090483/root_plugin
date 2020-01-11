const {
	Icon,
	Button,
	ButtonGroup,
	RangeControl,
	IconButton,
	Toolbar
} = wp.components;

export default function Bg(props) {
	const { items, activeItem, onChange } = props;

	function isActive(bValue) {
		return activeItem === bValue;
	}

	function getButtons() {
		return items.map(button => {
			return (
				<Button
					isSmall
					isPrimary={isActive(button.value)}
					onClick={() => onChange(button.value)}
				>
					{button.icon ? <Icon icon={button.icon}></Icon> : button.label}
				</Button>
			);
		});
	}

	return <ButtonGroup>{getButtons()}</ButtonGroup>;
}
