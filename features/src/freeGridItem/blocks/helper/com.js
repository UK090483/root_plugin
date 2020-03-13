const { doAction } = wp.hooks;

export default function com(parentId, data) {
	doAction(`com-${parentId}`, data);
}
