const { InspectorControls, MediaUpload, MediaUploadCheck } = wp.blockEditor;
const { Button, RangeControl, PanelBody } = wp.components;
import style from "../helper/style";

export default function Inspector({ setAttributes, attributes }) {
	const {
		images,
		borderRadius,
		collumns,
		gap,
		ratio,
		marginTop,
		marginBottom
	} = attributes;

	const UploadCheckFallback = (
		<h3>You don't have permission to Upload Images...</h3>
	);

	function setImages(i) {
		let all = [...images];
		i.forEach(element => {
			let imgObject = {};
			imgObject.sizes = element.sizes;
			imgObject.alt = "no label jet";
			imgObject.pos = "small";
			imgObject.id = element.id;
			imgObject.fit = "cover";
			imgObject.link = { id: null, url: null, postType: null };
			all.push(imgObject);
		});
		setAttributes({ images: all });
	}

	function setValues(type, value) {
		let nextValues = { ...attributes[type] };
		nextValues.value = value;
		setAttributes({ [type]: nextValues });
	}

	return (
		<div>
			<InspectorControls>
				<br></br>

				<div className={style.row}>
					<RangeControl
						label={"Corners"}
						value={borderRadius.value}
						onChange={value => setValues("borderRadius", value)}
						min={0}
						max={100}
					></RangeControl>
				</div>
				<div className={style.row}>
					<RangeControl
						label={"gap"}
						value={gap}
						onChange={gap => setAttributes({ gap })}
						min={0}
						max={100}
					></RangeControl>
				</div>
				<div className={style.row}>
					<RangeControl
						label="ratio"
						value={ratio}
						onChange={ratio => {
							ratio && setAttributes({ ratio });
						}}
						min={50}
						max={300}
					/>
				</div>
				<div className={style.row}>
					<RangeControl
						label={"collumns"}
						value={collumns.value}
						onChange={value => setValues("collumns", value)}
						min={0}
						max={10}
					></RangeControl>
				</div>
				<br></br>

				<MediaUploadCheck fallback={UploadCheckFallback}>
					<MediaUpload
						multiple={true}
						onSelect={media => setImages(media)}
						allowedTypes={["image"]}
						value={""}
						render={({ open }) => (
							<div className={style.row}>
								<Button isPrimary onClick={open}>
									Add Images
								</Button>
							</div>
						)}
					/>
				</MediaUploadCheck>

				<PanelBody title="Margin" initialOpen={false}>
					<RangeControl
						label={"Margin Top"}
						value={marginTop}
						onChange={marginTop => setAttributes({ marginTop })}
						min={0}
						max={100}
					></RangeControl>
					<RangeControl
						label={"Margin Bottom"}
						value={marginBottom}
						onChange={marginBottom => setAttributes({ marginBottom })}
						min={0}
						max={100}
					></RangeControl>
				</PanelBody>
			</InspectorControls>

			{!(images.length > 0) && (
				<div style={style.row}>
					<MediaUploadCheck fallback={UploadCheckFallback}>
						<MediaUpload
							multiple={true}
							onSelect={media => setImages(media)}
							allowedTypes={["image"]}
							render={({ open }) => (
								<Button isPrimary onClick={open}>
									Add Images
								</Button>
							)}
						/>
					</MediaUploadCheck>
				</div>
			)}
		</div>
	);
}
