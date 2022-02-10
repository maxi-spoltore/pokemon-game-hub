import React, { useState, useEffect, useRef } from 'react';
import GameWrapper from './GameWrapper';
import { GameContextProvider } from './GameContext';

const GameOne = ({ name, description }) => {

	return (
		<GameContextProvider>
			<GameWrapper name={name} description={description} />
		</GameContextProvider>
	);
};

export default GameOne;
