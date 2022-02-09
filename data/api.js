import axios from 'axios';

export async function getPokemon() {
	const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=151');
	const { data } = response;

	return data;
}

export async function getGameList() {
	const res = await axios.get('/api/gamedata');
	return res.data.data || [];
}

export const fetcher = async url => {
	try {
		const response = await axios.get(url);
		return response.data
	} catch (err) {
		console.warn(err);
	}
}