const GAMES = [
	{
		name: 'Pokédex',
		id: 'game-1',
		description: 'Name as many pokémon as you can until time runs out!. (1st generation only for now...)',
		imgUrl: '/images/game-img.png',
		rootComponent: 'Pokedex'
	},
	{
		name: 'Who is this pokémon?',
		id: 'game-2',
		description: "Guess the pokémon that is displayed on the screen. Try the hard difficulty, in which you'll only see the silhouette!. (1st generation only for now...)",
		imgUrl: '/images/game-img.png',
		rootComponent: 'GuessPokemon'
	},
	{
		name: 'Soup Safari',
		id: 'game-3',
		description: 'Find all pokémon hidden inside this awesome letter soup Safari. You can select all the pokemon types and generations you want!',
		imgUrl: '/images/game-img.png',
		rootComponent: 'SoupSafari'
	},
	{
		name: 'Game 4',
		id: 'game-4',
		description: 'Game 4 Description',
		imgUrl: '/images/game-img.png',
		rootComponent: 'GameOne'
	}
];

 export const getGameList = () => {
	return GAMES;
}

export const findGame = id => {
	return GAMES.find(game => game.id === id || game.name === id);
}

const handler = (req, res) => {
	const gameId = req?.query?.id;
	const response = gameId ? findGame(gameId) : getGameList();

	if (!response || !response.length) {
		return res.status(404).json({ message: 'games not found' });
	}
	return res.status(200).json({
		message: 'Game data fetched successfully!',
		data: response
	})
};

export default handler;