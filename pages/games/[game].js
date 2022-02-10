import dynamic from 'next/dynamic'
import GameLayout from "../../components/gameLayout";
import { findGame, getGameList } from '../api/gamedata';

export async function getStaticProps(context) {
	const gameId = context.params.game;
	const gameData = findGame(gameId);
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
	const { name, description, rootComponent } = gameData;
	const GameComponent = dynamic(() => import(`../../components/${rootComponent}`))

	return (
		<GameLayout>
			<GameComponent name={name} description={description} />
		</GameLayout>
	)
}