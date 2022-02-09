import React, { useState, useEffect } from 'react';
import useSWR from 'swr';
import { fetcher } from '../../data/api';
import LetterCube from './LetterCube';
import Match from './Match';

const keyCodeMap = {
	backspace: 8,
	enter: 13,
	space: 32
}

const GameOne = () => {
	const [guess, setGuess] = useState('');
	const [matches, setMatches] = useState([]);
	const { data, error } = useSWR('https://pokeapi.co/api/v2/pokemon?limit=151', fetcher);

	const submitGuess = () => {
		if (!guess) return;
		console.log({ submittedGuess: guess });
		const { results: pokemonList } = data || [];
		const validMatch = pokemonList.some(pokemon => pokemon.name === guess);
		if (validMatch) {
			setMatches(prev => [...prev, guess]);
			setGuess('');
		} 
	}

	const handleBackspace = () => {
		if (guess) {
			const trimmedGuess = guess.substring(0, guess.length - 1);
			setGuess(trimmedGuess);
		}
	}

	const handleGuess = e => {
		const { key, keyCode } = e;
		if (keyCode == keyCodeMap['enter']) return submitGuess();
		if (keyCode == keyCodeMap['backspace']) return handleBackspace();
		setGuess(prev => prev.concat(key.toLowerCase()));
	}

	const renderGuess = () => {
		const guessArr = guess.split('');
		return (
			<div className='flex'>
				{guessArr.map((char, idx) => {
					const key = `character-${char}-${idx}`;
					return <LetterCube key={key} char={char} />
				})}
			</div>
		);
	};

	const renderMatches = () => (
		<div className='flex w-100'>
			{!!matches.length && matches.map((match, idx) => {
				const key = `match-${match}-${idx}`;
				return <Match key={key} text={match} />
			})}
		</div>
	);

	useEffect(() => {
		window.addEventListener('keydown', handleGuess);
		return () => window.removeEventListener('keydown', handleGuess);
	});

	useEffect(() => {
		console.log({ guess });
	}, [guess])

	useEffect(() => {
		console.log({ pokemon: data });
	}, [data])

	useEffect(() => {
		console.log({ matches });
	}, [matches])
	
	return (
		<div className='flex flex-column w-100'>
			{renderMatches()}
			{renderGuess()}
		</div>
	);
};

export default GameOne;
