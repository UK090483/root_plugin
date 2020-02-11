import Inspector from "../inspector/inspector";
const { InspectorControls } = wp.blockEditor;
const { InnerBlocks } = wp.blockEditor;
const { useSelect } = wp.data;
const { useEffect, Fragment, useRef } = wp.element;

export default function(props) {
	const { attributes, setAttributes, clientId, isSelected } = props;
	const { device, isActive } = attributes;
	const minHight = attributes[`minHeight${device}`];
	const ref = useRef();
	const rootId = useSelect(select => {
		const { getBlockRootClientId } = select("core/block-editor");
		return getBlockRootClientId(clientId);
	});

	const hasChildBlocks = useSelect(select => {
		const { getBlockOrder } = select("core/block-editor");
		return getBlockOrder(clientId).length > 0;
	});

	const { _device, parentAttr } = useSelect(select => {
		const { getBlockAttributes, getBlockRootClientId } = select(
			"core/block-editor"
		);

		let parentAttr = getBlockAttributes(getBlockRootClientId(clientId));

		const { device } = parentAttr;
		return { _device: device, parentAttr: parentAttr };
	});

	useEffect(() => {
		if (attributes.device !== _device) {
			setAttributes({ device: _device });
		}
	}, [_device]);

	useEffect(() => {
		if (attributes.clientId !== clientId) {
			setAttributes({ clientId });
		}
	}, []);

	useEffect(() => {
		if (ref.current) {
			let ownHeight = ref.current.getBoundingClientRect().height;
			setAttributes({ ownHeight: ownHeight });
		}
	}, [ref]);

	// useEffect(() => {
	// 	resetWrap();
	// }, [attributes]);

	function resetWrap() {
		wp.data
			.dispatch("core/block-editor")
			.updateBlockAttributes(rootId, { size: Math.random() });
	}

	return (
		<div
			ref={ref}
			style={
				{
					// height: minHight
					// margin: "-15px 0px 0 -16px"
				}
			}
		>
			<Fragment>
				<Fragment>
					<Inspector
						{...props}
						device={device}
						resetWrap={resetWrap}
					></Inspector>

					<InnerBlocks
						renderAppender={
							!hasChildBlocks && isSelected
								? () => <InnerBlocks.ButtonBlockAppender />
								: () => <div style={{ height: 0, width: 0 }}></div>
						}
					/>
				</Fragment>
			</Fragment>
		</div>
	);
}
