const { useState } = wp.element;
export default function useDevice( device ) {
	const [ v, setDevice ] = useState( device );
	return [ setDevice ];
}
