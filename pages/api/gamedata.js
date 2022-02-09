const GAMES = [
	{
		name: 'Game 1',
		id: 'game-1',
		description: 'Game 1 Description',
		imgUrl: '/images/game-img.png',
		rootComponent: 'GameOne'
	},
	{
		name: 'Game 2',
		id: 'game-2',
		description: 'Game 2 Description',
		imgUrl: '/images/game-img.png',
		rootComponent: 'GameOne'
	},
	{
		name: 'Game 3',
		id: 'game-3',
		description: 'Game 3 Description',
		imgUrl: '/images/game-img.png',
		rootComponent: 'GameOne'
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