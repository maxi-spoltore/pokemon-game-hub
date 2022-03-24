import axios from 'axios';
import _, { partition, uniqWith, isEmpty } from 'lodash';

const shuffleArr = arr => {
  let currentIndex = arr.length;
  let randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [arr[currentIndex], arr[randomIndex]] = [arr[randomIndex], arr[currentIndex]];
  }
  return arr;
}

const getData = async selectedOptions => {
	if (!selectedOptions || !selectedOptions.length) return;
	try {
		const fetcher = async item => {
			const { data } = await axios.get(item.url);
			return data;
		};

		let [typeOptions] = partition(selectedOptions, ['type', 'type']);
		let [generationOptions] = partition(selectedOptions, ['type', 'generation']);

		typeOptions = await Promise.all(typeOptions.map(fetcher));
		generationOptions = await Promise.all(generationOptions.map(fetcher));
		
		return [typeOptions, generationOptions];

	} catch (error) {
		console.log(error);
		return [];
	}
}

export const getPokemonList = async selectedOptions => {
	try {
		const [typeData, generationData] = await getData(selectedOptions);

		if (isEmpty(typeData) || isEmpty(generationData)) return null;

		const normalizedTypes = typeData.reduce((prev, curr) => {
			const currentData = { ...curr };
			const pokemonList = currentData.pokemon.map(pokemonData => {
				const { pokemon: { name, url } } = pokemonData;
				return { name, url }
			});
			return [...prev, ...pokemonList]
		}, []);

		const normalizedGenerations = generationData.reduce((prev, curr) => {
			const currentData = { ...curr };
			const pokemonList = currentData.pokemon_species.map(pokemonData => {
				const { name } = pokemonData;
				return name
			});
			return [...prev, ...pokemonList]
		}, []);
	
		const pokemonList = normalizedTypes.filter(pokemon => {
			return normalizedGenerations.includes(pokemon.name)
		});
	
		const uniquePokemonList = uniqWith(pokemonList, _.isEqual);
	
		return uniquePokemonList;
	} catch (err) {
		console.log(err);
		return null;
	}
};

export const oneOfTypeSelected = (options, types) => {
	let isValid = false;
	types.forEach(type => {
		isValid = options.some(option => option.type === type)
	});
	return isValid;
};

export const validateList = list => (!list || !list.length) || list.length >= 10;

export const sortAndSlice = (list = [], length) => {
	const sortedList = shuffleArr(list);
	return sortedList.length > length ? [...sortedList.slice(0, length)] : sortedList;
};