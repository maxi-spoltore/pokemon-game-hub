import React, { useState, useEffect, useRef } from 'react'
import useSWR from 'swr';
import toast from 'react-hot-toast';
import { fetcher } from '../../data/api';
import LetterCube from './LetterCube';
import Match from './Match';
import Toaster from '../Toaster';

const keyCodeMap = {
	backspace: 8,
	enter: 13,
	space: 32
}

const Started = () => {
	const [guess, setGuess] = useState('');
	const [wrongGuess, setWrongGuess] = useState(false);
	const [matches, setMatches] = useState(new Set());
	const [guessingStarted, setGuessingStarted] = useState(false);
	const { data, error } = useSWR('https://pokeapi.co/api/v2/pokemon?limit=151', fetcher);
	const matchesRef = useRef(null);

	const submitGuess = async () => {
		if (!guess) return;
		const { results: pokemonList } = data || [];
		const validMatch = pokemonList.find(pokemon => pokemon.name === guess);
		if (validMatch) {
			toast('Gotcha!', {
				duration: 1000
			})
			setMatches(prev => new Set(prev.add(validMatch)));
			setGuess('');
		} else {
			setWrongGuess(true);
		}
	}

	const handleBackspace = () => {
		if (guess) {
			const trimmedGuess = guess.substring(0, guess.length - 1);
			setGuess(trimmedGuess);
			if (wrongGuess) setWrongGuess(false);
		}
	}

	const handleGuess = e => {
		setGuessingStarted(true);
		const { key, keyCode } = e;
		if (keyCode == keyCodeMap['enter']) return submitGuess();
		if (keyCode == keyCodeMap['backspace']) return handleBackspace();
		if (/^[A-Z\-\d]$/i.test(key)) setGuess(prev => prev.concat(key.toLowerCase()));
	}

	const renderGuess = () => {
		const guessArr = guess.split('');
		return (
			<div className='flex mt-auto'>
				{guessArr.map((char, idx) => {
					const key = `character-${char}-${idx}`;
					return <LetterCube key={key} char={char} error={wrongGuess}/>
				})}
			</div>
		);
	};

	const renderMatches = () => {
		const matchesArr = Array.from(matches);
		return (
			<div ref={matchesRef} className='flex justify-center flex-wrap my-8 bg-red-200 rounded-lg max-h-[320px] overflow-y-auto'>
				{!!matchesArr.length && matchesArr.map((match, idx) => {
					const key = `match-${match}-${idx}`;
					return <Match key={key} incomingData={{ data: match }} />
				})}
			</div>
		);
	};

	const GuessPlaceholder = () => (
		<p className='text-2xl font-bold animate-text-blink'>
			Start typing!
		</p>
	);

	useEffect(() => {
		window.addEventListener('keydown', handleGuess);
		return () => window.removeEventListener('keydown', handleGuess);
	});

	useEffect(() => {
		if (matchesRef && matchesRef.current) {
			matchesRef.current.scrollTop = matchesRef.current.clientHeight;
		}
	}, [matchesRef, matches])

	return (
		<div className='w-full h-[70vh]'>
			<div className='w-full h-full'>
				<div className='w-9/12 flex flex-col items-center w-full h-full mx-auto'>
					{renderMatches()}
					{renderGuess()}
					{!guessingStarted && !guess && !matches.size && <GuessPlaceholder />}
					<Toaster />
				</div>
			</div>
		</div>
	)
}

export default Started;