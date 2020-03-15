import move from "../inspector/move/move";
const { useState, useEffect } = wp.element;
const { addAction, removeAction } = wp.hooks;
const { dispatch } = wp.data;

export default function useCom(props, dependency) {
	const { attributes, setAttributes, clientId } = props;
	const { device, childrenAttributes } = attributes;

	useEffect(() => {
		addAction(
			`com-${clientId}`,
			`ku-base-freeGrid`,
			action => {
				switch (action.type) {
					case "MOVE":
						move(action.data, attributes, setAttributes);
						break;
					case "ERASE":
						erase(action.data, attributes, setAttributes);
						break;
					case "OWNHEIGHT":
						// let index = childrenAttributes.findIndex(
						// 	child => child.id === action.data.id
						// );

						// if (
						// 	index !== -1 &&
						// 	childrenAttributes[index][`ownHeight${device}`] !==
						// 		action.data.ownHeight
						// ) {
						// 	// console.log("update height");
						// 	// console.log(action.data);
						// 	// let nextChildrenAttributes = [...childrenAttributes];
						// 	// nextChildrenAttributes[index][`ownHeight${device}`] =
						// 	// 	action.data.ownHeight;
						// 	// setAttributes(nextChildrenAttributes);
						// }
						break;
				}
			},
			1
		);
		return () => {
			removeAction(`com-${clientId}`, "ku-base-freeGrid");
		};
	}, [...dependency]);

	return [];
}

function erase(data, attributes, setAttributes) {
	console.log(data.id);
	let nextChildrenAttributes = [...attributes.childrenAttributes];
	nextChildrenAttributes = nextChildrenAttributes.filter(c => c.id !== data.id);
	setAttributes({ childrenAttributes: nextChildrenAttributes });
	dispatch("core/block-editor").removeBlock(data.clientId);
}
