import React, { useState, useEffect } from 'react'
import { get } from 'axios';
import toast from 'react-hot-toast';
import Sound from 'react-sound';
import { useGameState, useGameDispatch, ActionTypes } from './GameContext';
import LetterCube from '../LetterCube';
import Toaster from '../Toaster';
import { generateRandomId } from '../../utils/utils';
import GuessBoard from './GuessBoard';
import GuessPlaceholder from '../GuessPlaceholder';

const keyCodeMap = {
	backspace: 8,
	tab: 9,
	enter: 13,
	space: 32
}

const Started = () => {
	const [currentPokemon, setCurrentPokemon] = useState(null);
	const [guess, setGuess] = useState('');
	const [showImg, setShowImg] = useState(false);
	const [wrongGuess, setWrongGuess] = useState(false);
	const [matchesIds, setMatchesIds] = useState(new Set());
	const [guessingStarted, setGuessingStarted] = useState(false);
	const [backspaceSound, setBackspaceSound] = useState(false);
	const [matchSound, setMatchSound] = useState(false);
	const { difficulty } = useGameState();
	const dispatch = useGameDispatch();

	const handleShowImg = val => {
		if (difficulty !== 'hard') return;
		setShowImg(val);
	};

	const handleGuessState = () => {
		dispatch({ type: ActionTypes.UPDATE_MATCHES, payload: currentPokemon });
		setMatchesIds(prev => new Set(prev.add(currentPokemon.id)));
		setGuess('');
	};

	const submitGuess = async () => {
		if (!guess || !currentPokemon) return;
		const validMatch = currentPokemon.name === guess;
		if (validMatch) {
			toast('Gotcha!', {
				duration: 1000
			})
			setMatchSound(true);
			if (difficulty === 'hard') {
				handleShowImg(true);
				setTimeout(() => {
					handleGuessState();
				}, 1000)
			} else {
				handleShowImg(true);
				handleGuessState();
			}
		} else {
			setWrongGuess(true);
		}
	}

	const handleBackspace = () => {
		setBackspaceSound(true);
		if (guess) {
			const trimmedGuess = guess.substring(0, guess.length - 1);
			setGuess(trimmedGuess);
			if (wrongGuess) setWrongGuess(false);
		}
	}

	const handleGuess = e => {
		e.preventDefault();
		setGuessingStarted(true);
		setBackspaceSound(false);
		setMatchSound(false);
		setWrongGuess(false);
		const { key, keyCode } = e;
		if (keyCode == keyCodeMap['tab']) return;
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
					return <LetterCube key={key} char={char} error={wrongGuess} />
				})}
			</div>
		);
	};

	const renderCount = () => {
		return (
			<p className='my-4 text-xl font-bold text-red-700'>Pokémon caught: {matchesIds.size}</p>
		)
	};

	useEffect(() => {
		window.addEventListener('keydown', handleGuess);
		return () => window.removeEventListener('keydown', handleGuess);
	});

	useEffect(() => {
		const id = generateRandomId(matchesIds);
		const fetchPokemon = async () => {
			try {
				const { data } = await get(`https://pokeapi.co/api/v2/pokemon/${id}`);
				setCurrentPokemon(data);
			} catch (err) {
				console.log(err);
			}
		};
		fetchPokemon();
	}, [matchesIds])

	useEffect(() => {
		handleShowImg(false);
	}, [currentPokemon]);

	useEffect(() => {
		if (difficulty === 'normal') {
			setShowImg(true);
		};
	}, [difficulty]);

	return (
		<div className='w-full h-[70vh]'>
			<div className='w-full h-full'>
				<div className='w-9/12 flex flex-col items-center w-full h-full mx-auto'>
					{renderCount()}
					{currentPokemon && <GuessBoard pokemonImgs={currentPokemon.sprites} show={showImg} />}
					{renderGuess()}
					{!guessingStarted && !guess && !matchesIds.size && <GuessPlaceholder text='Start typing!'/>}
					<Toaster renderType={'pokeball'} />
					{backspaceSound && (
						<Sound
							url='/sounds/keypress.wav'
							playStatus={Sound.status.PLAYING}
						/>
					)}
					{wrongGuess && (
						<Sound
							url='/sounds/error.wav'
							playStatus={Sound.status.PLAYING}
						/>
					)}
					{matchSound && (
						<Sound
							url='/sounds/success.wav'
							playStatus={Sound.status.PLAYING}
							volume={60}
						/>
					)}
				</div>
			</div>
		</div>
	)
}

export default Started;