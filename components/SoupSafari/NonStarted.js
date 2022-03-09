import React, { useEffect } from 'react'
import useTypes from '../../hooks/useTypes';
import ActionButton from '../actionButton';
import { useGameDispatch, ActionTypes, gameStatusTypes } from './GameContext';

const NonStarted = ({ name, description }) => {
	const dispatch = useGameDispatch();
	const { data, loading } = useTypes();

	const start = () => {
		dispatch({ type: ActionTypes.UPDATE_GAME_STATUS, payload: gameStatusTypes.STARTING });
	}

	return (
		<div className='h-[70vh] flex flex-col items-center'>
			<h2 className='text-3xl font-bold my-8'>{name}</h2>
			<p className='text-md mt-4'>{description}</p>
			<div className='mt-auto flex flex-col items-center'>
				<ActionButton text='Start' size='large' onClick={start} disabled={loading} />
			</div>
		</div>
	)
}

export default NonStarted