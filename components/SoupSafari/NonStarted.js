import React, { useState } from 'react'
import { useGameDispatch, ActionTypes, gameStatusTypes } from './GameContext';
import usePokemonData from '../../hooks/usePokemonData';
import ActionButton from '../actionButton';
import CheckboxList from './CheckboxList';

const NonStarted = ({ name, description }) => {
	const dispatch = useGameDispatch();
	const { data: typeData, loading: typeLoading } = usePokemonData('type'); // data = { name, url } Example: {name: "normal", url: "https://pokeapi.co/api/v2/type/1/"}
	const { data: generationData } = usePokemonData('generation');
	
	const fullData = [...typeData, ...generationData];

	const start = () => {
		dispatch({ type: ActionTypes.UPDATE_GAME_STATUS, payload: gameStatusTypes.STARTING });
	}

	const renderTypes = () => {
		return !!generationData && !!generationData.length && (
			<CheckboxList
				data={fullData}
				labelName='name'
				componentMapping={{
					labelFormat: 'unslugify'
				}}
			/>
		)
	}

	return (
		<div className='h-[70vh] flex flex-col items-center'>
			<h2 className='text-3xl font-bold my-8'>{name}</h2>
			<p className='text-md mt-4'>{description}</p>
			{renderTypes()}
			<div className='mt-auto flex flex-col items-center'>
				<ActionButton text='Start' size='large' onClick={start} disabled={typeLoading} />
			</div>
		</div>
	)
}

export default NonStarted