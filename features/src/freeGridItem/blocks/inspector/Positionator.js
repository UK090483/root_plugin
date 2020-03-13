const { doAction } = wp.hooks;

export default function Positionator({ clientId, parentId }) {
	function onClick(dir) {
		console.log("move-from-edit-item");
		doAction(`move-${parentId}`, dir, clientId);
		// let data = {
		// 	type: "move"
		// };
		// doAction(`com-${parentId}`, data);
	}

	return (
		<div className={"ku-base-freeGrid-positionator"}>
			<svg className={"bigCircle"}>
				<circle
					cx="50%"
					cy="50%"
					r="55%"
					stroke="white"
					stroke-width="30%"
					fill="transparent"
				/>
			</svg>
			<svg className={"smallCircle"}>
				<circle cx="50%" cy="50%" r="20%" fill="white" />
			</svg>

			<div
				onClick={() => {
					onClick("up");
				}}
				className={"up"}
			></div>
			<div
				onClick={() => {
					onClick("left");
				}}
				className={"left"}
			></div>
			<div
				onClick={() => {
					onClick("right");
				}}
				className={"right"}
			></div>
			<div
				onClick={() => {
					onClick("down");
				}}
				className={"down"}
			></div>
		</div>
	);
}
