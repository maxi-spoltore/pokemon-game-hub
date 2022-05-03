const GAMES = [
	{
		name: 'Pokédex',
		id: 'game-1',
		description: 'Name as many Pokémon as you can until time runs out!. (1st generation only for now...)',
		imgUrl: '/images/pokedex.jpg',
		rootComponent: 'Pokedex'
	},
	{
		name: 'Who is this Pokémon?',
		id: 'game-2',
		description: "Guess the Pokémon that is displayed on the screen. Try the hard difficulty, in which you'll only see the silhouette!. (1st generation only for now...)",
		imgUrl: '/images/guess_pokemon_background.jpg',
		rootComponent: 'GuessPokemon'
	},
	{
		name: 'Soup Safari',
		id: 'game-3',
		description: 'Find all Pokémon hidden inside this awesome word search Safari. You can select all the pokemon types and generations you want!',
		imgUrl: '/images/safari_zone.png',
		rootComponent: 'SoupSafari'
	}
];

 export const getGameList = () => {
	return GAMES;
}

export const findGame = id => {
	return GAMES.find(game => game.id === id || game.name === id);
}
