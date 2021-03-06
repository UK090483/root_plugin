const { InspectorControls, MediaUpload, MediaUploadCheck } = wp.blockEditor;
const { Button, ButtonGroup, RangeControl } = wp.components;
import style from "../helper/style";

export default function Inspector({ setAttributes, attributes, sortImages }) {
	const { sort, images, borderRadius, gridHeight, collumns } = attributes;

	const UploadCheckFallback = (
		<h3>You don't have permission to Upload Images...</h3>
	);

	function setImages(i) {
		let all = [...images];
		i.forEach(element => {
			let imgObject = {};
			imgObject.sizes = element.sizes;
			imgObject.fileName = checkIfallreadyExist(element, all);
			imgObject.alt = "";
			imgObject.pos = "small";
			imgObject.id = element.id;
			imgObject.link = { id: null, url: null };
			all.push(imgObject);
		});

		setAttributes({ images: all });
	}

	function setRange(value) {
		let nextBorderRadius = { ...borderRadius };
		nextBorderRadius.value = value;
		setAttributes({ borderRadius: nextBorderRadius });
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
				<h3>Sort</h3>
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
						label={"height"}
						value={gridHeight.value}
						onChange={value => setValues("gridHeight", value)}
						min={0}
						max={1000}
					></RangeControl>
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
							<Button isPrimary onClick={open}>
								Add Images
							</Button>
						)}
					/>
				</MediaUploadCheck>
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

function checkIfallreadyExist(totest, images) {
	let testName = totest.title.replace(/ /g, "");
	let res = testName;
	let exists = checkExistence(testName, images);
	if (exists) {
		res = getDifferentName(exists, testName);
	}
	return res;
}

function checkExistence(testName, images) {
	let res = images.filter(el => el.fileName.includes(testName));
	return res.length > 0 ? res : false;
}

function getDifferentName(listofNames, name) {
	let res = 0;
	listofNames.forEach(item => {
		let overhead = Number(item.fileName.replace(name, ""));
		if (typeof overhead === "number") {
			if (res < overhead) {
				res = overhead;
			}
		}
	});

	return name + (res + 1);
}
