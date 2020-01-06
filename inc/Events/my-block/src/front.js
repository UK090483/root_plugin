// window.onload = function() {
// 	start();
// 	if ( wp.hooks ) {
// 		wp.hooks.addAction( 'bla', 'kuevents', () => {
// 			console.log( 'build' );
// 			this.setTimeout( () => {
// 				const wrap = document.querySelectorAll( '.ku_events_wrap' );
// 				new KuEvents( wrap[ 0 ] );
// 			}, 500 );
// 		} );
// 	}
// };

// function start() {
// 	const wrap = document.querySelectorAll( '.ku_events_wrap' );
// 	if ( wrap[ 0 ] ) {
// 		new KuEvents( wrap[ 0 ] );
// 	}
// }

// function KuEvents( wrap ) {
// 	let Events = [];
// 	const loadDoc = () => {
// 		// eslint-disable-next-line no-undef
// 		const xhttp = new XMLHttpRequest();
// 		xhttp.onreadystatechange = function() {
// 			if ( this.readyState == 4 && this.status == 200 ) {
// 				// document.getElementById("demo").innerHTML =
// 				// this.responseText;

// 				Events = JSON.parse( this.responseText );

// 				print();
// 				buildb();
// 			}
// 		};
// 		xhttp.open(
// 			'GET',
// 			'http://localhost:8888/wordpress_root/wp-json/wp/v2/events',
// 			true
// 		);
// 		xhttp.send();
// 	};

// 	function print() {
// 		kuCreateView();
// 	}

// 	function kuCreateElement( el, c, text ) {
// 		const e = document.createElement( el );
// 		if ( c ) {
// 			e.className = c;
// 		}
// 		if ( text ) {
// 			const textNode = document.createTextNode( text );
// 			e.appendChild( textNode );
// 		}
// 		return e;
// 	}

// 	function createEvent( event ) {
// 		const ewrap = kuCreateElement( 'div', 'ku_event_wrap' );
// 		if ( event.meta.kubase_event_mediaUrl ) {
// 			const img = kuCreateElement( 'img', '' );
// 			img.src = event.meta.kubase_event_mediaUrl;
// 			ewrap.appendChild( img );
// 		}
// 		const info = kuCreateInfo( event );
// 		ewrap.appendChild( info );

// 		return ewrap;
// 	}

// 	function kuCreateInfo( event ) {
// 		const info = kuCreateElement( 'div', 'ku_events_info' );

// 		const title = kuCreateElement(
// 			'div',
// 			'ku_events_info_title',
// 			event.title.rendered
// 		);

// 		const date = kuCreateElement(
// 			'div',
// 			'ku_events_info_date',
// 			parseDate(
// 				event.meta.kubase_event_start_date,
// 				event.meta.kubase_event_end_date
// 			)
// 		);

// 		info.appendChild( title );
// 		info.appendChild( date );

// 		return info;
// 	}
// 	function kuCreateView() {
// 		wrap.innerHTML = '';
// 		Events.forEach( element => {
// 			wrap.appendChild( createEvent( element ) );
// 		} );
// 	}

// 	function parseDate( startDate, endDate ) {
// 		if ( ! startDate ) {
// 			return 'TBA';
// 		}
// 		const _sD = new Date( startDate );

// 		const day = _sD.getDate();
// 		const month = _sD.getMonth() + 1;
// 		const year = _sD
// 			.getFullYear()
// 			.toString()
// 			.slice( 2, 4 );
// 		const time = _sD.getHours() + ':' + _sD.getMinutes();

// 		if ( ! endDate ) {
// 			return day + '.' + month + '.' + year + ' ' + time;
// 		}
// 	}
// 	loadDoc();

// 	function b( event ) {
// 		const bla = {
// 			info: {
// 				val: [ 'div', 'ku_events_info' ],

// 				date: { val: [ 'div', 'ku_events_info_title', event.title.rendered ] },
// 				title: {
// 					val: [
// 						'div',
// 						'ku_events_info_date',
// 						parseDate(
// 							event.meta.kubase_event_start_date,
// 							event.meta.kubase_event_end_date
// 						),
// 					],
// 				},
// 			},
// 		};

// 		blibla( bla );
// 	}

// 	function blibla( root ) {
// 		function ele( root ) {
// 			Object.keys( root ).forEach( el => {
// 				if ( el !== 'val' ) {
// 					const e = kuCreateElement( root[ el ].val[ 0 ], root[ el ].val[ 1 ] );
// 					if ( Object.keys( root[ el ].length > 1 ) ) {
// 						e.appendChild( ele( root[ el ] ) );
// 					}
// 				}
// 			} );
// 		}

// 		ele( root );
// 	}

// 	function buildb() {
// 		b( Events[ 0 ] );
// 	}
// }
