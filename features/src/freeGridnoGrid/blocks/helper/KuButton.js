export default function KuButton({ onClick, children, disabled }) {
	return (
		<div
			style={{
				backgroundColor: disabled ? "grey" : "#007cba9c",
				pointerEvents: disabled ? "none" : "unset",
				color: "white",
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				minWidth: 20,
				height: 20,
				padding: 3,
				marginLeft: 1
			}}
			onClick={onClick}
		>
			{children}
		</div>
	);
}
