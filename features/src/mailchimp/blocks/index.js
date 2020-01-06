/**
 * Block dependencies
 */

import Inspector from "./inspector";

import "./style.scss";
import "./editor.scss";

const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const { useEffect, useState } = wp.element;

function buildMailChimpForm(attributes) {
	return (
		<div
			class="wp-block-webfactory-mailchimp-wrap"
			data-success={attributes.success_message}
			data-error={attributes.error_message}
			data-submit={attributes.submit_message}
			data-duplicate={attributes.duplicate_message}
			data-post_id={attributes.post_id}
		>
			<input
				type="text"
				class="wf-mc-name"
				name="wf-mc-name"
				value=""
				placeholder={attributes.name_field_label}
			/>
			<input
				type="text"
				class="wf-mc-email"
				name="wf-mc-email"
				value=""
				placeholder={attributes.email_field_label}
			/>
			<input
				type="submit"
				class="wf-mc-submit"
				name="wf-mc-submit"
				value={attributes.submit_field_label}
			/>
		</div>
	);
} // buildMapIframe

/**
 * Register static block example block
 */
export default registerBlockType("webfactory/mailchimp", {
	title: "mailchimp",
	description: wf_mailchimp_block._description,
	category: "kubase-blocks",
	icon: "email-alt",
	keywords: ["mailchimp", "newsletter", "subscribe"],
	attributes: {
		form_css: {
			type: "string",
			default: ""
		},
		api_key: {
			type: "string",
			default: null
		},
		mc_list: {
			type: "string",
			default: ""
		},
		email_field_label: {
			type: "string",
			default: "Your best email address"
		},
		name_field_label: {
			type: "string",
			default: "Your name"
		},
		submit_field_label: {
			type: "string",
			default: "Subscribe"
		},
		success_message: {
			type: "string",
			default: "Thank you for subscribing"
		},
		error_message: {
			type: "string",
			default: "Sorry, something is not right. Reload the page and try again."
		},
		submit_message: {
			type: "string",
			default: "Please fill out all fields with proper values"
		},
		duplicate_message: {
			type: "string",
			default: "You have already subscribed to our list"
		},
		post_id: {
			type: "number",
			default: null
		},
		Id: {
			type: "number"
		}
	},
	edit: props => {
		const { attributes, setAttributes } = props;
		const { post_id } = attributes;

		useEffect(() => {
			const pId = wp.data.select("core/editor").getCurrentPostId();
			if (pId !== attributes.post_id) {
				setAttributes({ post_id: pId, Id: Date.now() });
			}
		}, []);

		return (
			<div>
				<Inspector {...props} />
				{buildMailChimpForm(attributes)}
			</div>
		);
	},
	save: props => {
		const { attributes } = props;
		console.log(attributes);
		let maphtml = buildMailChimpForm(attributes);
		return <div>{maphtml}</div>;
	}
});
