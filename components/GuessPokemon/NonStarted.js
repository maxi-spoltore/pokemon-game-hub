import React from 'react'
import ActionButton from '../actionButton';
import GameHeader from '../GameHeader';
import { useGameDispatch, ActionTypes, gameStatusTypes } from './GameContext';
import DifficultySelector from './DifficultySelector';

const NonStarted = ({ name, description }) => {
	const dispatch = useGameDispatch();

	const start = () => {
		dispatch({ type: ActionTypes.UPDATE_GAME_STATUS, payload: gameStatusTypes.STARTING });
	}

	return (
		<div className='h-[70vh] flex flex-col items-center'>
			<GameHeader name={name} description={description} />
			<div className='mt-auto flex flex-col items-center'>
				<DifficultySelector />
				<ActionButton text='Start' size='large' onClick={start} />
			</div>
		</div>
	)
}

export default NonStarted