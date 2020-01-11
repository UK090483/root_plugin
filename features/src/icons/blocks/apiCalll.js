export default function checkApiKey(post_id, api_key, payload) {
	return fetch(ajaxurl, {
		method: "POST",
		headers: {
			"Content-Type": "application/x-www-form-urlencoded; charset=utf-8"
		},
		credentials: "same-origin",
		body: `action=ku_base_icons`
	}).then(response => response.json());
}
