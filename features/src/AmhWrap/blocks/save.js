import { arrow } from "./icons";
const { InnerBlocks } = wp.blockEditor;
const { RichText } = wp.blockEditor;
export default function save(props) {
	const { attributes } = props;
	const { subBlocks, Id, mainBlock, color, fontColor } = attributes;

	return (
		<div className="amh-wrap-wrap" style={{ borderColor: `${color}` }}>
			<div
				className="amh-wrap-head"
				style={{ backgroundColor: color, color: fontColor }}
			>
				<RichText.Content tagName="p" value={mainBlock} />
				<div
					className="amh-readmore-item-arrow"
					style={{ fill: fontColor, borderColor: `${fontColor}` }}
				>
					{arrow}
				</div>
			</div>
			<div className="amh-wrap-innerBlocks-container">
				<div className="amh-wrap-innerBlocks">
					<InnerBlocks.Content />
				</div>
			</div>
		</div>
	);
}
