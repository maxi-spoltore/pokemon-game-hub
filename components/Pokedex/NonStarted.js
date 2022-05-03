import React from 'react'
import ActionButton from '../ActionButton';
import GameHeader from '../GameHeader';
import { useGameDispatch, ActionTypes, gameStatusTypes } from './GameContext';

const NonStarted = ({ name, description }) => {
	const dispatch = useGameDispatch();

	const start = () => {
		dispatch({ type: ActionTypes.UPDATE_GAME_STATUS, payload: gameStatusTypes.STARTING });
	}

	return (
		<div className='h-screen-vertical sm:h-[70vh] flex flex-col items-center'>
			<GameHeader name={name} description={description} />
			<div className='mt-auto mb-4 sm:mb-0'>
				<ActionButton text='Start' size='large' onClick={start} />
			</div>
		</div>
	)
}

export default NonStarted