// document.addEventListener("DOMContentLoaded", function() {
// 	console.log("done loading ");
// 	initKuWidgets();
// });

// function initKuWidgets() {
// 	var wrap = document.querySelectorAll(".ku_icon_prev");
// 	var elements = [];
// 	console.log(wrap);
// 	wrap.forEach(e => {
// 		elements.push(new widget(e));
// 	});

// 	function widget(element) {
// 		let svgs = element.querySelectorAll(".ku_icon_icon");
// 		svgs.forEach(e => {
// 			e.addEventListener("click", svgClicked, false);
// 		});
// 		let input = element.querySelectorAll(".ku_icon_input");
// 		let show = element.querySelector(".ku_icon_show_icon");
// 		console.log(input);
// 		function svgClicked(item) {
// 			console.log(item.target);
// 			var name = item.target.dataset.name;
// 			var svg = item.target.querySelector("svg");
// 			input.value += svg;

// 			show.append(svg.cloneNode(true));
// 		}
// 	}
// }
