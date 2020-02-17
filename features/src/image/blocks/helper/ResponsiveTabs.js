const { Dashicon, TabPanel, Button, Dropdown } = wp.components;

const { useState, useEffect, useRef } = wp.element;

export default function ResponsiveTabs({ onSelect, value }) {
	function getStyle(name) {
		return {
			width: 40,
			height: 40,
			border: "#555d66 solid 1px",
			borderRadius: "50%",
			padding: 5,
			backgroundColor: value === name ? "#006fa777" : "transparent"
		};
	}

	return (
		<div style={{ display: "flex", justifyContent: "space-evenly" }}>
			<div style={{ position: "relative" }}>
				<Dashicon
					icon="desktop"
					style={getStyle("desktop")}
					onClick={() => onSelect("desktop")}
				/>
				<MyDropdown></MyDropdown>
			</div>
			<div style={{ position: "relative" }}>
				<Dashicon
					icon="tablet"
					style={getStyle("tablet")}
					onClick={() => onSelect("tablet")}
				/>
				<MyDropdown></MyDropdown>
			</div>
			<div style={{ position: "relative" }}>
				<Dashicon
					icon="smartphone"
					style={getStyle("mobile")}
					onClick={() => onSelect("mobile")}
				/>
				<MyDropdown devices={mobile}></MyDropdown>
			</div>
		</div>
	);
}

const MyDropdown = ({ devices }) => {
	function getList() {
		return devices.map(element => {
			return <div>{element.name}</div>;
		});
	}

	return (
		<div
			style={{
				position: "absolute",
				bottom: -5,
				right: -15
			}}
		>
			{devices && (
				<Dropdown
					position="bottom right"
					renderToggle={({ isOpen, onToggle }) => (
						<Dashicon icon="arrow-right" onClick={onToggle} />
					)}
					renderContent={() => <div>{getList()}</div>}
				/>
			)}
		</div>
	);
};

const mobile = [
	{ name: "breacking Point", width: 320 },
	{ name: "iphone 5/SE", width: 320 },
	{ name: "iphone 5/7/8", width: 375 },
	{ name: "iphone 5/7/8 Plus", width: 414 },
	{ name: "iphone X", width: 360 },
	{ name: "Galaxy S5", width: 360 }
];
const tablet = [
	{ name: "ipad", width: 768 },
	{ name: "ipad", width: 1024 }
];
