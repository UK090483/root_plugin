export default function checkApiKey(post_id, api_key, payload) {
	return fetch(ajaxurl, {
		method: "POST",
		headers: {
			"Content-Type": "application/x-www-form-urlencoded; charset=utf-8"
		},
		credentials: "same-origin",
		body: `action=wf_mailchimp_block_submit_form&post_id=${post_id}&api_key=${api_key}&payload=${payload}`
	}).then(response => response.json());
}
