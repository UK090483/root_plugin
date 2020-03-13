const { useState, useEffect, useRef, Fragment } = wp.element;

export default function useMove(children, device, columns, rows, clientId) {
	function looog() {
		console.log("blaaaaaaa");
	}

	useEffect(() => {
		console.log("children chaged");
	}, [children]);
	return { looog };
}
