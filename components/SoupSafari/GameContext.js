import React, { createContext, useReducer, useContext } from "react";

const GameStateContext = createContext(null);
const GameDispatchContext = createContext(null);

const gameStatusTypes = {
	NON_STARTED: 'non_started',
	STARTING: 'starting',
	IN_PROGRESS: 'in_progress'
}

const gameDifficulties = {
	NORMAL: 'normal',
	HARD: 'hard',
}

const ActionTypes = {
	SET_GAME_DIFFICULTY: 'set_game_difficulty',
	UPDATE_GAME_STATUS: 'update_game_status',
	ADD_GAME_OPTION: 'add_game_option',
	REMOVE_GAME_OPTION: 'remove_game_option',
	SET_POKEMON_LIST: 'set_pokemon_list',
	ADD_MATCH: 'add_match',
	GAME_WON: 'game_won',
	RESTART_GAME: 'restart_game'
}

const initialState = {
	pokemonListLength: 10,
	difficulty: gameDifficulties.NORMAL,
	gameStatus: gameStatusTypes.NON_STARTED,
	selectedOptions: [],
	pokemonList: [],
	matches: new Set(),
	gameWon: false
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
		case ActionTypes.SET_POKEMON_LIST:
			return {
				...state,
				pokemonList: action.payload
			}
		case ActionTypes.ADD_MATCH:
			return {
				...state,
				matches: new Set(state.matches.add(action.payload))
			}
		case ActionTypes.GAME_WON:
			return {
				...state,
				gameWon: true
			}
		case ActionTypes.RESTART_GAME:
			return {
				...state,
				...initialState,
				matches: new Set(state.matches.clear())
			};
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