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

const gameDifficulties = {
	NORMAL: 'normal',
	HARD: 'hard',
}

const ActionTypes = {
	SET_GAME_DIFFICULTY: 'set_game_difficulty',
	UPDATE_GAME_STATUS: 'update_game_status',
	UPDATE_MATCHES: 'update_matches',
	RESTART_GAME: 'restart_game'
}

const initialState = {
	difficulty: gameDifficulties.NORMAL,
	gameStatus: gameStatusTypes.NON_STARTED,
	matches: []
}

const GameContextReducer = (state = initialState, action) => {
	switch (action.type) {
		case ActionTypes.SET_GAME_DIFFICULTY:
			return {
				...state,
				difficulty: action.payload
			}
		case ActionTypes.UPDATE_GAME_STATUS:
			return {
				...state,
				gameStatus: action.payload
			}
		case ActionTypes.UPDATE_MATCHES:
			return {
				...state,
				matches: [...state.matches].concat([action.payload])
			}
		case ActionTypes.RESTART_GAME:
			return {
				...state,
				gameStatus: gameStatusTypes.NON_STARTED,
				matches: [],
				difficulty: gameDifficulties.NORMAL
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

export { GameContextProvider, useGameState, useGameDispatch, gameStatusTypes, gameDifficulties, ActionTypes }