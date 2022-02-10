import React, { createContext, useReducer, useContext } from "react";

const GameStateContext = createContext(null);
const GameDispatchContext = createContext(null);

const gameStatusTypes = {
	NON_STARTED: 'non_started',
	IN_PROGRESS: 'in_progress',
	OVER: 'over'
}

const ActionTypes = {
	UPDATE_GAME_STATUS: 'update_game_status',
	UPDATE_MATCHES: 'update_matches',
	RESTART_GAME: 'restart_game'
}

const initialState = {
	gameStatus: gameStatusTypes.NON_STARTED,
	countdownTime: 30000
}

const GameContextReducer = (state = initialState, action) => {
	switch (action.type) {
		case ActionTypes.UPDATE_GAME_STATUS:
			return {
				...state,
				gameStatus: action.payload
			}
		case ActionTypes.RESTART_GAME:
			return {
				...state,
				gameStatus: gameStatusTypes.IN_PROGRESS
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