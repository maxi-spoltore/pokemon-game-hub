import dynamic from 'next/dynamic'
import GameLayout from "../../components/gameLayout";
import { findGame, getGameList, getSourceData } from '../api/gamedata';

export async function getStaticProps(context) {
	const gameId = context.params.game;
	const gameData = findGame(gameId);
	let sourceData = null;
	if (gameData.dataSource) {
		sourceData = await getSourceData(gameData);
	}
	console.log({ sourceData });
	return {
		props: {
			gameData
		}
	}
}

export async function getStaticPaths() {
	const games = getGameList();
	const paths = games.map(game => ({ params: { game: game.name }}));

	return {
		paths,
		fallback: 'blocking'
	}
}

export default function Game({ gameData }) {
	const { name, description, rootComponent, sourceData } = gameData;
	const GameComponent = dynamic(() => import(`../../components/${rootComponent}`))

	console.log({ sourceData });

	return (
		<GameLayout>
			<GameComponent name={name} description={description} {...gameData} />
		</GameLayout>
	)
}