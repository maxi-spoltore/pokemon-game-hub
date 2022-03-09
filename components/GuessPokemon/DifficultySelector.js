import React, { useState } from 'react'
import ActionButton from '../actionButton';
import { useGameDispatch, ActionTypes } from './GameContext';

const difficulties = ['normal', 'hard'];

const DifficultySelector = () => {
	const [selectedDifficulty, setDifficulty] = useState(difficulties[0]);
	const dispatch = useGameDispatch();

	const selectDifficulty = name => {
		setDifficulty(name);
		dispatch({ type: ActionTypes.SET_GAME_DIFFICULTY, payload: name });
	};

	console.log({ selectedDifficulty });

	return (
		<div className='flex items-center bg-red-300 p-3 mb-8 rounded-xl'>
			<h5 className='mr-2'>Select difficulty:</h5>
			<ActionButton active={selectedDifficulty === 'normal'} text='normal' color='lightRed' size='small' onClick={() => selectDifficulty('normal')} />
			<ActionButton active={selectedDifficulty === 'hard'} text='hard' color='lightRed' size='small' onClick={() => selectDifficulty('hard')} />
		</div>
	)
}

export default DifficultySelector