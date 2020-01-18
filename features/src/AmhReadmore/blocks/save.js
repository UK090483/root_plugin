import { arrow } from "./icons";
const { RichText } = wp.blockEditor;
export default function save(props) {
	const { attributes } = props;
	const { subBlocks, Id, mainBlock } = attributes;
	const encodedSubblocks = JSON.parse(subBlocks);
	console.log("new save");

	function getItems() {
		return encodedSubblocks.map((item, index) => {
			return (
				<div className="amh-readmore-item" data-id={Id + index}>
					<div className="amh-readmore-item-text">
						{item.logo ? (
							<div
								className="amh-readmore-item-image"
								style={{
									backgroundImage: `url(${item.logo})`
								}}
							></div>
						) : (
							<h5>{item.label}:</h5>
						)}
						<h5 style={{ color: item.color }}>{item.short}</h5>
					</div>
					<div className="amh-readmore-item-arrow">{arrow}</div>
				</div>
			);
		});
	}

	function getSubsContent() {
		return encodedSubblocks.map((item, index) => {
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
