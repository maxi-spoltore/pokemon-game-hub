import React, { createContext, useReducer, useContext } from "react";

const GameStateContext = createContext(null);
const GameDispatchContext = createContext(null);

const gameStatusTypes = {
	NON_STARTED: 'non_started',
	STARTING: 'starting',
	IN_PROGRESS: 'in_progress',
	FINISHING: 'finishing',
	OVER: 'over'
}

const ActionTypes = {
	UPDATE_GAME_STATUS: 'update_game_status',
	ADD_GAME_OPTION: 'add_game_option',
	REMOVE_GAME_OPTION: 'remove_game_option',
	RESTART_GAME: 'restart_game'
}

const initialState = {
	gameStatus: gameStatusTypes.NON_STARTED,
	selectedOptions: []
}

const GameContextReducer = (state = initialState, action) => {
	switch (action.type) {
		case ActionTypes.UPDATE_GAME_STATUS:
			return {
				...state,
				gameStatus: action.payload
			}
		case ActionTypes.ADD_GAME_OPTION:
			return {
				...state,
				selectedOptions: [...state.selectedOptions, action.payload]
			}
		case ActionTypes.REMOVE_GAME_OPTION:
			const { matchField, matchValue } = action.payload;
			return {
				...state,
				selectedOptions: [...state.selectedOptions.filter(option => option[matchField] !== matchValue)]
			}
		case ActionTypes.RESTART_GAME:
			return {
				...state,
				gameStatus: gameStatusTypes.NON_STARTED
			}
		default:
			return state;
	}
}

const GameContextProvider = ({ children }) => {
	const [state, dispatch] = useReducer(GameContextReducer, initialState);

	return (
		<GameStateContext.Provider value={state}>
			<GameDispatchContext.Provider value={dispatch}>
				{children}
			</GameDispatchContext.Provider>
		</GameStateContext.Provider>
	)
};

const useGameState = () => {
	const context = useContext(GameStateContext)
	if (context === undefined) {
		throw new Error('useGameState must be used within a GameContextProvider')
	}
	return context;
};

const useGameDispatch = () => {	
	const context = useContext(GameDispatchContext)
	if (context === undefined) {
		throw new Error('useGameDispatch must be used within a GameContextProvider')
	}
	return context;
};

export { GameContextProvider, useGameState, useGameDispatch, gameStatusTypes, ActionTypes }