export default function recover(recoverObject, setAttributes, device) {
	setAttributes({
		[`rows${device}`]: recoverObject.rows
	});
	recoverObject.children.forEach(child => {
		wp.data
			.dispatch("core/editor")
			.updateBlockAttributes(child.clientId, child.attributes);
	});
}
