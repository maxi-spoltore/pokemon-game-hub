import React, { useState } from 'react'
import { useGameDispatch, ActionTypes } from './GameContext';
import BaseSelector from '../DifficultySelector';

const difficulties = ['normal', 'hard'];

const DifficultySelector = () => {
	const [selectedDifficulty, setDifficulty] = useState(difficulties[0]);
	const dispatch = useGameDispatch();

	const selectDifficulty = name => {
		setDifficulty(name);
		dispatch({ type: ActionTypes.SET_GAME_DIFFICULTY, payload: name });
	};

	return (
		<BaseSelector
			difficulties={difficulties}
			selectedDifficulty={selectedDifficulty}
			handleSelect={selectDifficulty}
		/>
	);
}

export default DifficultySelector