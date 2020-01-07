import ApiCall from "./apiCalll";

const { Component } = wp.element;
const { useEffect } = wp.element;
const { InspectorControls } = wp.blockEditor;
const {
	Button,
	ButtonGroup,
	CheckboxControl,
	PanelBody,
	PanelRow,
	PanelColor,
	RadioControl,
	RangeControl,
	TextControl,
	TextareaControl,
	ToggleControl,
	Toolbar,
	SelectControl
} = wp.components;
const { useState } = wp.element;

/**
 * Create an Inspector Controls wrapper Component
 */
export default function Inspector(props) {
	const { attributes, setAttributes } = props;
	const {
		post_id,
		api_key,
		email_field_label,
		name_field_label,
		submit_field_label,
		success_message,
		error_message,
		submit_message,
		duplicate_message
	} = attributes;
	const [userName, setUserName] = useState(null);

	useEffect(() => {
		checkApiKey();
	}, []);

	function checkApiKey() {
		ApiCall(post_id, api_key, "checkKey").then(res =>
			setUserName(res.data.username)
		);
	}

	return (
		<InspectorControls>
			<PanelBody>
				<TextControl
					label={"Mailchimp"}
					help={
						!userName && (
							<p>
								{"Open your"}{" "}
								<a
									href="https://us2.admin.mailchimp.com/account/api/"
									target="_blank"
								>
									{"MailChimp account"}
								</a>
								. {"to get an API Key."}
							</p>
						)
					}
					value={api_key}
					onChange={api_key => {
						if (!api_key) {
							api_key = "";
						}
						setAttributes({ api_key });
					}}
				/>
				{userName && <h5>{userName}</h5>}
				<Button onClick={checkApiKey}>Check</Button>
			</PanelBody>

			{/* <PanelBody>
				<SelectControl
					class="wf-mailchimp-lists"
					label={"List"}
					value={undefined}
					options={undefined}
					onChange={mc_list => {
						if (!mc_list) {
							mc_list = "";
						}
						setAttributes({ mc_list });
						this.updateListThrottled(mc_list);
					}}
				/>
			</PanelBody> */}

			{/* <PanelBody>
				<SelectControl
					class="wf-mailchimp-form-style"
					label={'Form Style'}
					value={0}
					options={[
						{ value: 0, label: "Theme default" },
						{ value: -1, label: "Minimal - coming soon" },
						{ value: -1, label: "Material Design - coming soon" },
						{ value: -1, label: "Round - coming soon" },
						{ value: -1, label: "Square - coming soon" }
					]}
					onChange={form_css => {}}
				/>
			</PanelBody> */}

			<PanelBody>
				<TextControl
					label={"email"}
					value={email_field_label}
					onChange={email_field_label => setAttributes({ email_field_label })}
				/>
			</PanelBody>

			<PanelBody>
				<TextControl
					label={"name"}
					value={name_field_label}
					onChange={name_field_label => setAttributes({ name_field_label })}
				/>
			</PanelBody>

			<PanelBody>
				<TextControl
					label={"submit"}
					value={submit_field_label}
					onChange={submit_field_label => setAttributes({ submit_field_label })}
				/>
			</PanelBody>

			<PanelBody>
				<TextControl
					label={"Success Message"}
					value={success_message}
					onChange={success_message => setAttributes({ success_message })}
				/>
			</PanelBody>

			<PanelBody>
				<TextControl
					label={"Error Message"}
					value={error_message}
					onChange={error_message => setAttributes({ error_message })}
				/>
			</PanelBody>

			<PanelBody>
				<TextControl
					label={"Submit Error Message"}
					value={submit_message}
					onChange={submit_message => setAttributes({ submit_message })}
				/>
			</PanelBody>

			<PanelBody>
				<TextControl
					label={"Duplicate Message"}
					value={duplicate_message}
					onChange={duplicate_message => setAttributes({ duplicate_message })}
				/>
			</PanelBody>
		</InspectorControls>
	);
}
