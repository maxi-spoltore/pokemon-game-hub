import React, { useState, useEffect, useRef } from 'react'
import useSWR from 'swr';
import { fetcher } from '../../data/api';
import { useGameState, gameStatusTypes } from './GameContext';
import LetterCube from './LetterCube';
import Match from './Match';

const keyCodeMap = {
	backspace: 8,
	enter: 13,
	space: 32
}


const Started = () => {
	const [guess, setGuess] = useState('');
	const [matches, setMatches] = useState(new Set());
	const { data, error } = useSWR('https://pokeapi.co/api/v2/pokemon?limit=151', fetcher);
	const { gameStatus } = useGameState();

	const gameOver = gameStatus === gameStatusTypes.OVER;

	const submitGuess = async () => {
		if (!guess) return;
		const { results: pokemonList } = data || [];
		const validMatch = pokemonList.find(pokemon => pokemon.name === guess);
		if (validMatch) {
			setMatches(prev => new Set(prev.add(validMatch)));
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
		if (/^[a-zA-Z]$/.test(key)) setGuess(prev => prev.concat(key.toLowerCase()));
	}

	const renderGuess = () => {
		const guessArr = guess.split('');
		return (
			<div className='flex mt-auto'>
				{guessArr.map((char, idx) => {
					const key = `character-${char}-${idx}`;
					return <LetterCube key={key} char={char} />
				})}
			</div>
		);
	};

	const renderMatches = () => {
		const matchesArr = Array.from(matches);
		return (
			<div className='flex flex-wrap mt-8 bg-red-200 rounded-lg max-h-[320px] overflow-y-auto'>
				{!!matchesArr.length && matchesArr.map((match, idx) => {
					const key = `match-${match}-${idx}`;
					return <Match key={key} data={match} />
				})}
			</div>
		);
	};

	useEffect(() => {
		window.addEventListener('keydown', handleGuess);
		return () => window.removeEventListener('keydown', handleGuess);
	});

	return (
		<div className='w-full h-[50vh]'>
			{gameOver 
				? <h2>Time's up!</h2>
				: (
				<div className='w-full h-full'>
					<div className='flex flex-col items-center w-full h-full mx-auto'>
						{renderMatches()}
						{renderGuess()}
					</div>
				</div>
			)}
		</div>
	)
}

export default Started;