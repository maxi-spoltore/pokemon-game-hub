export const generateRandomId = (nonValidIds) => {
	if (nonValidIds.size === 151) return false;

	const id = Math.floor(Math.random() * 151) + 1;

	if (nonValidIds.has(id)) return generateRandomId(nonValidIds);
	
	return id;
};

export const unslugify = str => {
	if (!str || typeof str !== 'string') return;
	return str.replace('-', ' ');
};