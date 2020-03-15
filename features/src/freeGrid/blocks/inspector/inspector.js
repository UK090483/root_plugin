import AutoComponent from "./Auto/AutoComponent";

const { InspectorControls } = wp.blockEditor;

const {
	RangeControl,
	PanelBody,
	Button,
	ButtonGroup,
	CheckboxControl
} = wp.components;
import ResponsiveTabs from "../helper/ResponsiveTabs";
import style from "../helper/style";

const { useSelect } = wp.data;
const devices = ["desktop", "tablet", "mobile"];

export default function Inspector(props) {
	const { attributes, setAttributes, clientId } = props;
	const { device, childrenAttributes } = attributes;

	const children = useSelect(select => {
		return select("core/block-editor").getBlock(clientId).innerBlocks;
	});

	function copyAttributes(from) {
		let nextChildrenAttributes = JSON.parse(JSON.stringify(childrenAttributes));
		nextChildrenAttributes.forEach(child => {
			child[`gridColumnStart${device}`] = child[`gridColumnStart${from}`];
			child[`gridColumnEnd${device}`] = child[`gridColumnEnd${from}`];
			child[`gridRowStart${device}`] = child[`gridRowStart${from}`];
			child[`gridRowEnd${device}`] = child[`gridRowEnd${from}`];
		});
		let nextAttributes = {
			[`gap${device}`]: attributes[`gap${from}`],
			[`ratio${device}`]: attributes[`ratio${from}`],
			[`columns${device}`]: attributes[`columns${from}`],
			[`rows${device}`]: attributes[`rows${from}`],
			[`marginTop${device}`]: attributes[`marginTop${from}`],
			[`marginBottom${device}`]: attributes[`marginBottom${from}`],
			childrenAttributes: nextChildrenAttributes
		};
		setAttributes(nextAttributes);
	}

	function getCopyFromButtons() {
		let result = [];
		devices.forEach(_device => {
			_device !== device &&
				result.push(
					<Button
						isSmall
						isPrimary
						onClick={() => {
							copyAttributes(_device);
						}}
					>
						{"copy from " + _device}
					</Button>
				);
		});
		return result;
	}

	return (
		<div>
			<InspectorControls>
				<br></br>

				<ResponsiveTabs
					onSelect={device => {
						setAttributes({ device });
					}}
					value={device}
				></ResponsiveTabs>

				<div className={style.row}>
					<RangeControl
						label={"gap"}
						value={attributes[`gap${device}`]}
						onChange={gap => setAttributes({ [`gap${device}`]: gap })}
						min={0}
						max={100}
					></RangeControl>
				</div>
				<div className={style.row}>
					{attributes[`heightType${device}`] === "ratio" && (
						<RangeControl
							label="ratio zähler"
							value={attributes[`ratio${device}`][1]}
							onChange={value => {
								let res = [...attributes[`ratio${device}`]];
								res[1] = value;
								setAttributes({ [`ratio${device}`]: res });
							}}
							min={1}
							max={1000}
						/>
					)}
					{attributes[`heightType${device}`] === "ratio" && (
						<RangeControl
							label="ratio nenner"
							value={attributes[`ratio${device}`][0]}
							onChange={value => {
								let res = [...attributes[`ratio${device}`]];
								res[0] = value;
								setAttributes({ [`ratio${device}`]: res });
							}}
							min={1}
							max={1000}
						/>
					)}
				</div>

				<div className={style.row}>
					<ButtonGroup>
						<Button
							isPrimary={attributes[`heightType${device}`] === "ratio"}
							isSmall
							onClick={() =>
								setAttributes({ [`heightType${device}`]: "ratio" })
							}
						>
							ratio
						</Button>
						<Button
							isPrimary={attributes[`heightType${device}`] === "auto"}
							isSmall
							onClick={() => setAttributes({ [`heightType${device}`]: "auto" })}
						>
							auto
						</Button>
						<Button
							isPrimary={attributes[`heightType${device}`] === "px"}
							isSmall
							onClick={() => setAttributes({ [`heightType${device}`]: "px" })}
						>
							px
						</Button>
					</ButtonGroup>
				</div>

				<br></br>
				<br></br>
				<AutoComponent
					children={children}
					device={device}
					setAttributes={setAttributes}
					attributes={attributes}
				></AutoComponent>

				<div className={style.row}>
					<RangeControl
						label={"columns"}
						value={attributes[`columns${device}`]}
						onChange={value => setAttributes({ [`columns${device}`]: value })}
						min={1}
						max={12}
					></RangeControl>
				</div>
				<div className={style.row}>
					<RangeControl
						label={"rows"}
						value={attributes[`rows${device}`]}
						onChange={value => setAttributes({ [`rows${device}`]: value })}
						min={1}
						max={12}
					></RangeControl>
				</div>

				{getCopyFromButtons()}
				<br></br>

				<PanelBody title="Margin" initialOpen={false}>
					<RangeControl
						label={"Margin Top"}
						value={attributes[`marginTop${device}`]}
						onChange={value => setAttributes({ [`marginTop${device}`]: value })}
						min={0}
						max={100}
					></RangeControl>
					<RangeControl
						label={"Margin Bottom"}
						value={attributes[`marginBottom${device}`]}
						onChange={value =>
							setAttributes({ [`marginBottom${device}`]: value })
						}
						min={0}
						max={100}
					></RangeControl>
				</PanelBody>
			</InspectorControls>
		</div>
	);
}
