import React, { useCallback } from 'react';
import GameContent from './GameContent';
import WithCountdown from '../../hocs/WithCountdown';
import { useGameDispatch, ActionTypes, gameStatusTypes } from './GameContext';

const GameWrapper = ({ name, description }) => {
	const dispatch = useGameDispatch();

	const endTimeCallback = useCallback(() => {
		dispatch({ type: ActionTypes.UPDATE_GAME_STATUS, payload: gameStatusTypes.FINISHING })
	}, []);

	return (
		<div className='w-full flex justify-center overflow-hidden'>
			<WithCountdown countdownTime={120000000} closeToEndThreshold={20} onEnd={endTimeCallback}>
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
