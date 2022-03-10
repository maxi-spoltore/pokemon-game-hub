export const generationNormalizer = data => {
	const { results = [] } = data || {};
	return results;
};