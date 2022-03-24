import React from 'react';
import Countdown from 'react-countdown';
import Sound from 'react-sound';
import { useGameDispatch, ActionTypes, gameStatusTypes } from './GameContext';

const Starting = () => {
	const dispatch = useGameDispatch();

	const renderTimer = ({ seconds, completed }) => {
		if (completed) {
			dispatch({ type: ActionTypes.UPDATE_GAME_STATUS, payload: gameStatusTypes.IN_PROGRESS });
			return <></>
		} else {
			return (
				<div className='m-auto font-pokemon-solid text-9xl flex justify-center items-center'>
					{seconds > 1 ? (
						<>
							<span className='animate-fade'>{seconds - 1}</span>
							<Sound url='/sounds/tick.wav' playStatus={Sound.status.PLAYING} playFromPosition={10} />
						</>
					) : (
						<>
							<span className='tracking-[.15em]'>Go!</span>
							<Sound url='/sounds/start_game.mp3' playStatus={Sound.status.PLAYING} playFromPosition={38} />
						</>
					)}
				</div>
			);
		}
	}

	return (
		<div className='w-full fill-screen-vertical flex justify-center'>
			<Countdown
				date={Date.now() + 4000}
				renderer={renderTimer}
			/>
		</div>
	)
}

export default Starting