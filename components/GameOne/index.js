import React, { useState, useEffect, useRef } from 'react';
import useSWR from 'swr';
import { fetcher } from '../../data/api';
import LetterCube from './LetterCube';
import Match from './Match';
import Countdown from 'react-countdown';

const keyCodeMap = {
	backspace: 8,
	enter: 13,
	space: 32
}

const GameOne = () => {
	const [guess, setGuess] = useState('');
	const [matches, setMatches] = useState(new Set());
	const [gameOver, setGameOver] = useState(false);
	const { data, error } = useSWR('https://pokeapi.co/api/v2/pokemon?limit=151', fetcher);
	const gameOverRef = useRef(null);

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
		setGuess(prev => prev.concat(key.toLowerCase()));
	}

	const renderGuess = () => {
		const guessArr = guess.split('');
		return (
			<div className='flex mt-6'>
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
			<div className='flex flex-wrap w-100 bg-red-200 rounded-lg max-h-[320px] overflow-y-auto'>
				{!!matchesArr.length && matchesArr.map((match, idx) => {
					const key = `match-${match}-${idx}`;
					return <Match key={key} data={match} />
				})}
			</div>
		);
	};

	const renderTimer = ({ minutes, seconds, completed }) => {
		if (completed) {
			return <h5 ref={gameOverRef}>Time's up!</h5>
		} else {
			const formatTime = time => +time < 10 ? `0${time}` : time;
			const formattedSeconds = formatTime(seconds);
			return <span>{`${minutes}:`}{formattedSeconds}</span>
		}
	}

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

	useEffect(() => {
		if (gameOverRef && gameOverRef.current) {
			setGameOver(true);
		}
	}, [gameOverRef])
	
	return (
		<>
			{gameOver 
				? <h2>Time's up!</h2>
				: (
				<div>
					<div className='flex flex-col items-center w-9/12 mx-auto'>
						{renderMatches()}
						{renderGuess()}
					</div>
					<div>
						<Countdown
							date={Date.now() + 10000}
							renderer={renderTimer}
						/>
					</div>
				</div>
				)}
		</>
	);
};

export default GameOne;
