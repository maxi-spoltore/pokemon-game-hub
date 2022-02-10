import React from 'react';
import Countdown from 'react-countdown';
import { useGameState, useGameDispatch, gameStatusTypes, ActionTypes } from './GameContext';
import NonStarted from './NonStarted';
import Started from './Started';
import Over from './Over';

const GameWrapper = ({ name, description }) => {
	const { gameStatus, countdownTime } = useGameState();
	const dispatch = useGameDispatch();

	const gameInProgress = gameStatus === gameStatusTypes.IN_PROGRESS;

	const handleGameOver = () => {
		dispatch({ type: ActionTypes.UPDATE_GAME_STATUS, payload: gameStatusTypes.OVER })
	}

	const renderTimer = ({ minutes, seconds, completed }) => {
		if (completed) {
			handleGameOver();
			return <></>
		} else {
			const formatTime = time => +time < 10 ? `0${time}` : time;
			const formattedSeconds = formatTime(seconds);
			return (
			<span className='font-pixel text-3xl text-lime-400 flex items-center translate-y-1.5'>
				{`${minutes}:`}{formattedSeconds}
			</span>)
		}
	}

	const renderView = type => {
		switch (type) {
			case gameStatusTypes.NON_STARTED:
				return <NonStarted name={name} description={description} />;
			case gameStatusTypes.IN_PROGRESS:
				return <Started />;
			case gameStatusTypes.OVER:
				return <Over />;
			default:
				return <NonStarted name={name} description={description} />;
		}
	}
	
	return (
		<div className='w-9/12 mx-auto flex flex-col items-center'>
			{renderView(gameStatus)}
			{gameInProgress && (
				<div className='w-36 fixed bottom-5 flex justify-center items-center bg-gray-900 p-2 rounded-md'>
					<Countdown
						date={Date.now() + countdownTime}
						renderer={renderTimer}
					/>
				</div>
			)}
		</div>
	);
};

export default GameWrapper;
