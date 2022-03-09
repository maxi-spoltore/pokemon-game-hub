import React from 'react'
import { useGameState, useGameDispatch, ActionTypes } from './GameContext'
import ActionButton from '../actionButton'

const Over = () => {
	const dispatch = useGameDispatch();
	const handleRestart = () => {
		dispatch({ type: ActionTypes.RESTART_GAME });
	}

	return (
		<div className='w-9/12 fill-screen-vertical mx-auto'>
			<div className='flex flex-col items-center mt-12'>
				<div className='mt-8 text-xl font-bold text-red-700'>{matches.length} pokémon caught!</div>
				<div className='mt-28'>
					<ActionButton size='large' text='Play again' onClick={handleRestart}/>
				</div>
			</div>
		</div>
	)
}

export default Over