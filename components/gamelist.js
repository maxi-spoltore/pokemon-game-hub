import Link from 'next/link';
import Image from 'next/image';

export default function GameList({ gameData }) {
	const renderGameList = () =>
		gameData.map((game, i) => {
			const { name, description, imgUrl } = game || {};
			const key = `game-${name}-${i}`;
			return (
				<Link
					key={key}
					href={{
						pathname: '/games/[game]',
						query: {game: game.name}
					}}
				>
					<a className='flex justify-center bg-white rounded-lg hover:shadow-2xl'>
						<div>
							<div>
								<Image src={imgUrl} height={200} width={200} />
							</div>
							<h3 className='text-center'>{name}</h3>
							<p className='text-center'>{description}</p>
						</div>
					</a>
				</Link>
			)
		});
	
	return (
		<div className='w-3/12 mx-auto mt-10 p-4 grid grid-cols-2 gap-8'>
			{renderGameList()}
		</div>
	)
}