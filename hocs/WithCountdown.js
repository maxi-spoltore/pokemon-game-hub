import React, { useState } from 'react';
import Countdown from 'react-countdown';
import { useGameDispatch, ActionTypes, gameStatusTypes } from '../components/GameOne/GameContext';

const WithCountdown = ({ children, ...props }) => {
	const [countdown, setCountdown] = useState(false);
	const dispatch = useGameDispatch();

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
			const formatMinutes = formatTime(minutes);
			const formattedSeconds = formatTime(seconds);
			return (
				<span className='countdown-timer font-pixel text-3xl text-lime-400 flex justify-center items-center translate-y-1.5'>
					{`${formatMinutes}:`}{formattedSeconds}
				</span>
			);
		}
	}

	return (
		<div className='flex justify-center w-full'>
			{children({ setCountdown })}
			{countdown && (
				<div className='countdown-wrapper w-36 flex justify-center items-center p-2 rounded-md'>
					<Countdown
						date={Date.now() + props.countdownTime}
						renderer={renderTimer}
					/>
				</div>
			)}
		</div>
	);
};

export default WithCountdown;
