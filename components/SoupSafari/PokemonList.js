import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import { getPokemonListImages } from './utils';
import { useGameState } from './GameContext';

const PokemonList = ({ isLoading, handleLoading }) => {
	const { pokemonList, difficulty, matches } = useGameState();
	const [parsedList, setParsedList] = useState([]);

	const getWordClasses = word => {
		const matchingWord = matches.has(word);
		return classNames([
			'font-pokemon-gb',
			'text-lg',
			...(matchingWord ? ['line-through', 'decoration-2', 'text-black'] : ['text-red-500'])
		])
	}

	const renderPokemonNames = () => {
		return (
			<div className='bg-slate-100 border border-8 rounded-md px-4 py-2'>
				{parsedList.map((word, idx) => {
					const key = `word--${idx}`;
					return (
						<div key={key} className={getWordClasses(word)}>{word.toUpperCase()}</div>
					)
				})}
			</div>
		)
	};

	const renderPokemonImages = () => {
		return (
			<div className='grid grid-cols-2 gap-4 bg-slate-100 border border-8 rounded-md px-4 py-2'>
				{parsedList.map((pokemon, idx) => {
					const { name, sprites } = pokemon || {};
					const { other, front_default } = sprites || {};
					const imgUrl = other['official-artwork'].front_default || front_default;
					const found = matches.has(name);
					const key = `pokemon-img--${idx}`;
					return (
						<div key={key}>
							<div className='w-[96px] h-[96px]'>
								<img className={`w-full h-auto contrast-125 ${found ? 'grayscale brightness-50' : ''}`} src={imgUrl || ''} alt='pokemon_img'/>
							</div>
						</div>
					)
				})}
			</div>
		)
	}

	useEffect(() => {
		const getPokemonImages = async () => {
			if (difficulty === 'normal') {
				const pokemonNames = pokemonList.map(pokemon => pokemon.name) || [];
				handleLoading(false);
				setParsedList(pokemonNames);
				return;
			}

			const data = await getPokemonListImages(pokemonList);
			handleLoading(false);
			setParsedList(data);
		}
		getPokemonImages();
	}, []);

	if (isLoading) return null;

	return (
		<div className='border border-2 border-slate-800 rounded-md shadow-[2px_2px_14px_2px_rgba(0,0,0,0.5)]'>	
			{difficulty === 'normal' && renderPokemonNames()}
			{difficulty === 'hard' && renderPokemonImages()} 
		</div>
	);
};

export default PokemonList