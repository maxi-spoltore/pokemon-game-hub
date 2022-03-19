import React from 'react'
import { useGameDispatch, ActionTypes, gameStatusTypes } from './GameContext';
import usePokemonData from '../../hooks/usePokemonData';
import ActionButton from '../actionButton';
import CheckboxList from './CheckboxList';

const NonStarted = ({ name, description }) => {
	const dispatch = useGameDispatch();
	const { data: typeData, loading: typeLoading } = usePokemonData('type');
	const { data: generationData, loading: generationLoading } = usePokemonData('generation');

	const isLoading = typeLoading || generationLoading;
	
	const options = [
		{
			name: 'Pokemon Types',
			data: [...typeData]
		},
		{
			name: 'Generation',
			data: [...generationData]
		}
	];

	const start = () => {
		dispatch({ type: ActionTypes.UPDATE_GAME_STATUS, payload: gameStatusTypes.STARTING });
	};

	const renderTypes = () => {
		return !isLoading && (
			<CheckboxList
				options={options}
				labelName='name'
				componentAttributes={{
					labelFormat: 'unslugify'
				}}
			/>
		)
	};

	return (
		<div className='h-[70vh] flex flex-col items-center'>
			<h2 className='text-3xl font-bold my-8'>{name}</h2>
			<p className='text-md mt-4'>{description}</p>
			{renderTypes()}
			<div className='mt-auto flex flex-col items-center'>
				<ActionButton text='Start' size='large' onClick={start} disabled={isLoading} />
			</div>
		</div>
	);
};

export default NonStarted;