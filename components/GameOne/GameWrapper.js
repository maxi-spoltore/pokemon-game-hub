import React from 'react';
import GameContent from './GameContent';
import WithCountdown from '../../hocs/WithCountdown';
import { useGameDispatch, ActionTypes, gameStatusTypes } from '../GameOne/GameContext';

const GameWrapper = ({ name, description }) => {
	const dispatch = useGameDispatch();

	const endTimeCallback = () => {
		dispatch({ type: ActionTypes.UPDATE_GAME_STATUS, payload: gameStatusTypes.FINISHING })
	}

	return (
		<div className='w-full flex justify-center'>
			<WithCountdown countdownTime={10000} closeToEndThreshold={20} onEnd={endTimeCallback}>
				{({ setCountdown }) => (
					<GameContent
						name={name}
						description={description}
						handleCountdown={setCountdown}
					/>
				)}
			</WithCountdown>
		</div>
	);
};

export default GameWrapper;
