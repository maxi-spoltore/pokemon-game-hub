import React, { useEffect } from 'react'
import { useGameDispatch, ActionTypes, gameStatusTypes } from './GameContext'

const Finishing = () => {
	const dispatch = useGameDispatch();

	useEffect(() => {
		const timer = setTimeout(() => {
			dispatch({ type: ActionTypes.UPDATE_GAME_STATUS, payload: gameStatusTypes.OVER })
		}, 3000);

		return () => {
			clearTimeout(timer);
		}
	}, [])

	return (
		<div className='font-pokemon-solid tracking-[.15em]'>Time's Up!</div>
	)
}

export default Finishing