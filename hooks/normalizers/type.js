const discardedPokemonTypes = ['unknown', 'shadow'];

export const typeNormalizer = data => {
	const { results = [] } = data || {};
	const parsedResults = results.filter(result => !discardedPokemonTypes.includes(result.name));

	return parsedResults;
};