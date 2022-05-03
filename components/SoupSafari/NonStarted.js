import React from 'react'
import toast from 'react-hot-toast';
import { useGameState, useGameDispatch, ActionTypes, gameStatusTypes } from './GameContext';
import { oneOfTypeSelected, getPokemonList, validateList, sortAndSlice } from './utils';
import usePokemonData from '../../hooks/usePokemonData';
import ActionButton from '../ActionButton';
import GameHeader from '../GameHeader';
import CheckboxList from './CheckboxList';
import DifficultySelector from './DifficultySelector';
import Toaster from '../Toaster';

const NonStarted = ({ name, description }) => {
	const { selectedOptions, pokemonListLength } = useGameState();
	const dispatch = useGameDispatch();
	const { data: typeData, loading: typeLoading } = usePokemonData('type');
	const { data: generationData, loading: generationLoading } = usePokemonData('generation');

	const isLoading = typeLoading || generationLoading;
	
	const disabled = 
		isLoading || 
		!selectedOptions.length ||
		!oneOfTypeSelected(selectedOptions, ['type', 'generation']);

	const options = [
		{
			label: 'Pokemon Types',
			name: 'type',
			data: [...typeData]
		},
		{
			label: 'Generation',
			name: 'generation',
			data: [...generationData]
		}
	];

	const start = async () => {
		if (disabled) return toast("You must choose at least one type and one generation.", {
			duration: 1500
		});
		const pokemonList = await getPokemonList(selectedOptions);
		if (!validateList(pokemonList)) return toast("Not enough pokemon. Please select more types and/or more generations:");
		const sortedPokemonList = sortAndSlice(pokemonList, pokemonListLength);
		dispatch({ type: ActionTypes.SET_POKEMON_LIST, payload: sortedPokemonList });
		dispatch({ type: ActionTypes.UPDATE_GAME_STATUS, payload: gameStatusTypes.STARTING });
	};

	const renderTypes = () => {
		return !isLoading && (
			<CheckboxList
				options={options}
				nameField='name'
				componentAttributes={{
					labelFormat: 'unslugify'
				}}
			/>
		)
	};

	return (
		<>
			<div className='h-[70vh] flex flex-col items-center'>
				<GameHeader name={name} description={description} />
				{renderTypes()}
				<DifficultySelector />
				<div className='mt-auto flex flex-col items-center'>
					<ActionButton text='Start' size='large' onClick={start} />
				</div>
			</div>
			<Toaster />
		</>
	);
};

export default NonStarted;