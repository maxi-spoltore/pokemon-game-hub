import React, { useEffect } from 'react';
import { useGameState, gameStatusTypes } from './GameContext';
import NonStarted from './NonStarted';
import Started from './Started';
import Over from './Over';
import Starting from './Starting';
import Finishing from './Finishing';

const GameContent = ({ name, description, handleCountdown }) => {
	const { gameStatus } = useGameState();

	const renderView = type => {
		switch (type) {
			case gameStatusTypes.NON_STARTED:
				return <NonStarted name={name} description={description} />;
			case gameStatusTypes.STARTING:
				return <Starting />;
			case gameStatusTypes.IN_PROGRESS:
				return <Started />;
			case gameStatusTypes.FINISHING:
				return <Finishing />;
			case gameStatusTypes.OVER:
				return <Over />;
			default:
				return <NonStarted name={name} description={description} />;
		}
	}

	useEffect(() => {
		if (gameStatus === gameStatusTypes.IN_PROGRESS) handleCountdown(true);
		if (gameStatus === gameStatusTypes.FINISHING) handleCountdown(false);
	}, [gameStatus])

	return (
		<div className='w-full flex flex-col items-center'>
			{renderView(gameStatus)}
		</div>
	);
};

export default GameContent;
