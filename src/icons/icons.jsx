const icons = {};

icons.container = (
	<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
		<rect x="4" y="12" width="56" height="40" rx="4" ry="4" fill="none" stroke="#000" stroke-width="3"/>
	</svg>
);

icons.row = (
	<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
		<rect x="4" y="8" width="56" height="48" rx="4" ry="4" fill="none" stroke="#000" stroke-width="3"/>
		<line x1="4" y1="24" x2="60" y2="24" stroke="#000" stroke-width="3"/>
		<line x1="4" y1="40" x2="60" y2="40" stroke="#000" stroke-width="3"/>
	</svg>
);

icons.column = (
	<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
		<rect x="4" y="8" width="56" height="48" rx="4" ry="4" fill="none" stroke="#000" stroke-width="3"/>
		<line x1="20" y1="8" x2="20" y2="56" stroke="#000" stroke-width="3"/>
		<line x1="44" y1="8" x2="44" y2="56" stroke="#000" stroke-width="3"/>
	</svg>
);

export default icons;
