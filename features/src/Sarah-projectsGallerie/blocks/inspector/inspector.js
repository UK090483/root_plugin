const { InspectorControls, MediaUpload, MediaUploadCheck } = wp.blockEditor;
const { Button, ButtonGroup, RangeControl } = wp.components;
import getSortFunction from "../helper/sortfunction";
import style from "../helper/style";

export default function Inspector({ setAttributes, attributes, sortImages }) {
	const { sort, images, columns, ratio, gap } = attributes;

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
			imgObject.fit = "cover";
			imgObject.id = element.id;
			imgObject.size = [1, 1];
			imgObject.link = { id: null, url: null };
			all.push(imgObject);
		});

		setAttributes({ images: all });
	}

	return (
		<div>
			<InspectorControls>
				<br></br>

				<RangeControl
					label="Columns"
					value={columns}
					onChange={columns => setAttributes({ columns })}
					min={2}
					max={10}
				/>
				<br></br>
				<RangeControl
					label="ratio"
					value={ratio}
					onChange={ratio => setAttributes({ ratio })}
					min={100}
					max={300}
				/>
				<br></br>
				<RangeControl
					label="ratio"
					value={gap}
					onChange={gap => setAttributes({ gap })}
					min={0}
					max={100}
				/>
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
