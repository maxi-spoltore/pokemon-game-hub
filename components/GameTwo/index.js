import React from 'react';
import { GameContextProvider } from './GameContext';
import GameWrapper from './GameWrapper';

const GameOne = ({ name, description }) => {
	return (
		<GameContextProvider>
			<GameWrapper name={name} description={description} />
		</GameContextProvider>
	);
};

export default GameOne;
