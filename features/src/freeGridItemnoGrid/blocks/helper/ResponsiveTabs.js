const { Dashicon, TabPanel } = wp.components;

const { useState, useEffect, useRef } = wp.element;

export default function ResponsiveTabs({ onSelect, children }) {
	return (
		<TabPanel
			className="uagb-size-type-field-tabs uagb-without-size-type"
			activeClass="active-tab"
			onSelect={params => {
				onSelect(params);
			}}
			tabs={[
				{
					name: "desktop",
					title: <Dashicon icon="desktop" />,
					className: "uagb-desktop-tab uagb-responsive-tabs"
				},
				{
					name: "tablet",
					title: <Dashicon icon="tablet" />,
					className: "uagb-tablet-tab uagb-responsive-tabs"
				},
				{
					name: "mobile",
					title: <Dashicon icon="smartphone" />,
					className: "uagb-mobile-tab uagb-responsive-tabs"
				}
			]}
		>
			{tab => {
				return children;
			}}
		</TabPanel>
	);
}
