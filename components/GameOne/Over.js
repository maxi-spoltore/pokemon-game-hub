import React from 'react'
import { useGameState, useGameDispatch, ActionTypes } from './GameContext'
import ActionButton from '../actionButton'
import MatchList from './MatchList'

const Over = () => {
	const { matches } = useGameState();
	const dispatch = useGameDispatch();
	const handleRestart = () => {
		dispatch({ type: ActionTypes.RESTART_GAME });
	}

	return (
		<div>
			<h3>Time's up!</h3>
			<MatchList matches={matches} />
			<ActionButton size='large' text='Play again!' onClick={handleRestart}/>
		</div>
	)
}

export default Over