import React, { useState, useEffect } from 'react';
import { partition } from 'lodash';
import axios from 'axios';
import Countdown from 'react-countdown';
import Sound from 'react-sound';
import { useGameState, useGameDispatch, ActionTypes, gameStatusTypes } from './GameContext';

const Starting = () => {
	const dispatch = useGameDispatch();
	const { selectedOptions } = useGameState();

	// const renderTimer = ({ seconds, completed }) => {
	// 	if (completed) {
	// 		dispatch({ type: ActionTypes.UPDATE_GAME_STATUS, payload: gameStatusTypes.IN_PROGRESS });
	// 		return <></>
	// 	} else {
	// 		return (
	// 			<div className='m-auto font-pokemon-solid text-9xl flex justify-center items-center'>
	// 				{seconds > 1 ? (
	// 					<>
	// 						<span className='animate-fade'>{seconds - 1}</span>
	// 						<Sound url='/sounds/tick.wav' playStatus={Sound.status.PLAYING} playFromPosition={10} />
	// 					</>
	// 				) : (
	// 					<>
	// 						<span className='tracking-[.15em]'>Go!</span>
	// 						<Sound url='/sounds/start_game.mp3' playStatus={Sound.status.PLAYING} playFromPosition={38} />
	// 					</>
	// 				)}
	// 			</div>
	// 		);
	// 	}
	// }

	useEffect(() => {
		if (!selectedOptions || !selectedOptions.length) return;
		async function getData() {
			try {
				const fetcher = async item => {
					const { data } = await axios.get(item.url);
					return data;
				};

				let [typeOptions] = partition(selectedOptions, ['type', 'type']);
				let [generationOptions] = partition(selectedOptions, ['type', 'generation']);
		
				typeOptions = await Promise.all(typeOptions.map(fetcher));
				generationOptions = await Promise.all(generationOptions.map(fetcher));
				
				return [typeOptions, generationOptions];

			} catch (error) {
				console.log(error);
			}
		}

		async function getOptionsData() {
			const [typeData, generationData] = await getData();
			const normalizedTypes = typeData.reduce((prev, curr) => {
				const currentData = { ...curr };
				const pokemonList = currentData.pokemon.map(pokemonData => {
					const { pokemon: { name, url } } = pokemonData;
					return { name, url }
				});
				return [...prev, ...pokemonList]
			}, []);
			const normalizedGenerations = generationData.reduce((prev, curr) => {
				const currentData = { ...curr };
				const pokemonList = currentData.pokemon_species.map(pokemonData => {
					const { name } = pokemonData;
					return name
				});

				return [...prev, ...pokemonList]
				
			}, []);

			const pokemonList = normalizedTypes.filter(pokemon => {
				return normalizedGenerations.includes(pokemon.name)
			});

			console.log({
				pokemonList
			})
		}

		getOptionsData();
	}, [selectedOptions])

	return (
		<div className='w-full fill-screen-vertical flex justify-center'>
			{/* <Countdown
				date={Date.now() + 4000}
				renderer={renderTimer}
			/> */}
		</div>
	)
}

export default Starting