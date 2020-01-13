import { arrow } from "../../icons";
const { RichText } = wp.blockEditor;
export default function save(props) {
	const { attributes } = props;
	const { subBlocks, Id, mainBlock } = attributes;
	console.log(props);
	function getItems() {
		return subBlocks.map((item, index) => {
			return (
				<div className="amh-readmore-item">
					<div className="amh-readmore-item-text" data-id={Id + index}>
						<h5>{item.label}:</h5>
						<h5 style={{ color: item.color }}>{item.short}</h5>
					</div>
					<div className="amh-readmore-item-arrow" data-id={Id + index}>
						{arrow}
					</div>
				</div>
			);
		});
	}
	function getSubsContent() {
		return subBlocks.map((item, index) => {
			return (
				<div className="amh-readmore-subContent" data-id={Id + index}>
					<RichText.Content tagName="p" value={item.content} />
				</div>
			);
		});
	}

	return (
		<div className="amh-readmore-wrap">
			<div className="amh-readmore-item-head">
				<RichText.Content tagName="p" value={mainBlock} />
			</div>

			<div className="amh-readmore-items">{getItems()}</div>
			<div className="amh-readmore-items-subContent">{getSubsContent()}</div>
		</div>
	);
}
