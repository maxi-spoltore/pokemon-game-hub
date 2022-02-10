import React from 'react'
import { useGameDispatch, ActionTypes, gameStatusTypes } from './GameContext'
import ActionButton from '../actionButton'

const Over = () => {
	const dispatch = useGameDispatch();
	const handleRestart = () => {
		dispatch({ type: ActionTypes.RESTART_GAME });
	}
	return (
		<div>
			<h3>Time's up!</h3>
			<ActionButton text='Play again!' onClick={handleRestart}/>
		</div>
	)
}

export default Over