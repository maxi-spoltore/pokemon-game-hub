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
		<div className='fill-screen-vertical flex justify-center items-center'>
			<div className='font-pokemon-solid text-7xl tracking-[.15em] animate-bounce'>Time's Up!</div>
		</div>
	)
}

export default Finishing