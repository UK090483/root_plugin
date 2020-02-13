import Inspector from "../inspector/inspector";
const { InspectorControls } = wp.blockEditor;
const { InnerBlocks } = wp.blockEditor;
const { useSelect } = wp.data;
const { useEffect, Fragment, useRef, useState } = wp.element;
let layouts = ["desktop", "tablet", "mobile"];

export default function(props) {
	const { attributes, setAttributes, clientId, isSelected } = props;
	const { device, isActive, backgtroundImage } = attributes;
	const minHight = attributes[`minHeight${device}`];
	const [height, setHeight] = useState(100);
	const ref = useRef();
	const { _device, parentAttr } = useSelect(select => {
		const { getBlockAttributes, getBlockRootClientId } = select(
			"core/block-editor"
		);
		let parentAttr = getBlockAttributes(getBlockRootClientId(clientId));
		const { device } = parentAttr;
		return { _device: device, parentAttr: parentAttr };
	});
	const rootId = useSelect(select => {
		const { getBlockRootClientId } = select("core/block-editor");
		return getBlockRootClientId(clientId);
	});
	const hasChildBlocks = useSelect(select => {
		const { getBlockOrder } = select("core/block-editor");
		return getBlockOrder(clientId).length > 0;
	});

	useEffect(() => {
		if (attributes.device !== _device) {
			setAttributes({ device: _device });
		}
	}, [_device]);

	useEffect(() => {
		layouts.forEach(layout => {
			if (parentAttr[`ratio${layout}`] !== attributes[`ratio${layout}`]) {
				setAttributes({ [`ratio${layout}`]: parentAttr[`ratio${layout}`] });
			}
		});
	}, [parentAttr]);

	useEffect(() => {
		if (attributes.clientId !== clientId) {
			setAttributes({ clientId });
		}
	}, []);

	useEffect(() => {
		let interval = undefined;
		if (ref.current) {
			setComputedHeight(ref.current);
			interval =
				!interval &&
				setInterval(() => {
					let ownHeight = ref.current.getBoundingClientRect().height;
					setAttributes({ ownHeight: ownHeight });
				}, 100);
		}
		return () => {
			clearInterval(interval);
		};
	}, [ref, parentAttr, attributes]);

	function resetWrap() {
		wp.data
			.dispatch("core/block-editor")
			.updateBlockAttributes(rootId, { size: Math.random() });
	}

	const setComputedHeight = wrap => {
		if (attributes[`autoHeight${device}`]) {
			setHeight(0);
		} else {
			let width = wrap.getBoundingClientRect().width;

			let _width = width / attributes[`gridColumnEnd${device}`];
			let height =
				_width *
					((parentAttr[`ratio${device}`] / 100) *
						attributes[`gridRowEnd${device}`]) +
				attributes[`gridRowEnd${device}`] * parentAttr[`gap${device}`];
			setHeight(height);
			let r = (height / width) * 100;
			setAttributes({ [`ratio${device}`]: r });
		}
	};

	return (
		<div
			ref={ref}
			style={{
				minHeight: height,
				margin: "-28px -15px -28px -15px",
				border: "red solid 1px",
				backgroundSize: "cover",
				backgroundRepeat: "no-repeat",
				backgroundPosition: "center",
				backgroundImage: `url(${backgtroundImage})`
			}}
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
