export const generateRandomId = (nonValidIds, size = 151) => {
	if (nonValidIds.size === size) return false;

	const id = Math.floor(Math.random() * size) + 1;

	if (nonValidIds.has(id)) return generateRandomId(nonValidIds);
	
	return id;
};

export const unslugify = str => {
	if (!str || typeof str !== 'string') return;
	return str.replace('-', ' ');
};