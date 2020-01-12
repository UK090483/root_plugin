export default function init(submit) {
	submit.addEventListener("click", makeRequest);

	function makeRequest() {
		const name = document.querySelector(".wf-mc-name").value;
		const email = document.querySelector(".wf-mc-email").value;
		const post_id = document.querySelector(
			".wp-block-webfactory-mailchimp-wrap"
		).dataset.post_id;

		const data = `action=wf_mailchimp_block_submit_form&name=${name}&email=${email}&post_id=${post_id}&payload=submit`;

		fetch(ku_block.ajaxurl, {
			method: "POST", // or 'PUT'
			headers: new Headers({
				"Content-Type": "application/x-www-form-urlencoded"
			}),
			credentials: "same-origin",
			body: data
		})
			.then(response => response.json())
			.then(data => {
				console.log("Success:", data);
			})
			.catch(error => {
				console.error("Error:", error);
			});
	}
}
