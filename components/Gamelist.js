import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import classNames from 'classnames';

const Corners = () => {
	const baseClasses = classNames([
		'absolute',
		'bg-red-600',
		'w-[20px]',
		'h-[20px]'
	]);

	return (
		<>
			<div className={`${baseClasses} translate-x-[-5px] translate-y-[-5px]`}></div>
			<div className={`${baseClasses} right-0 translate-x-[5px] translate-y-[-5px]`}></div>
			<div className={`${baseClasses} bottom-0 right-0 translate-x-[5px] translate-y-[5px]`}></div>
			<div className={`${baseClasses} bottom-0 left-0 translate-x-[-5px] translate-y-[5px]`}></div>
		</>
	)
};

const GameCard = ({ game = {}}) => {
	const [active, setActive] = useState(false);

	const { imgUrl, name } = game;
	const nameClasses = classNames([
		'absolute top-[50%]',
		'left-[50%]',
		'translate-x-[-50%]',
		'translate-y-[-50%]',
		'flex',
		'items-center',
		'justify-center',
		'text-center',
		'p-4',
		'bg-red-200',
		'border',
		'border-[4px]',
		'border-red-900',
		'bg-[rgba(255,200,200,.9)]'
	]);

	return (
		<Link
			href={{
				pathname: '/games/[game]',
				query: {game: game.name}
			}}
		>
			<a
				className='relative w-[226px] h-[226px] z-50 border border-2 animate-card-slide-in'
				onMouseEnter={() => setActive(true)}
				onMouseLeave={() => setActive(false)}
			>
				{active && <Corners />}
					<div>
						<Image
							src={imgUrl}
							layout="fill"
							objectFit="cover"
							alt={game.name}
						/>
					</div>
				<h3 className={nameClasses}>{name}</h3>
			</a>
		</Link>
	);
};

export default function GameList({ gameData }) {
	const renderGameList = () =>
		gameData.map((game, i) => {
			const key = `game-${game.name}-${i}`;
			return <GameCard key={key} game={game} />
		});
	
	return (
		<div className='w-full md:w-8/12 mx-auto mt-0 md:mt-10 lg:mt-14 2xl:mt-24 p-4 flex justify-center items-center flex-wrap flex-col md:flex-row gap-8'>
			{renderGameList()}
		</div>
	)
}