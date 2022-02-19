import React, { useState } from 'react';
import GameContent from './GameContent';
import Countdown from 'react-countdown';
import { useGameDispatch, ActionTypes, gameStatusTypes } from './GameContext';

const GameWrapper = ({ name, description }) => {
	const [countdown, setCountdown] = useState(false);
	const dispatch = useGameDispatch();
	const countdownTime = 12000000;

	const handleGameOver = () => {
		setCountdown(false);
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

	return (
		<div className='flex justify-center'>
			<GameContent
				name={name}
				description={description}
				handleCountdown={setCountdown}
			/>
			{countdown && (
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
