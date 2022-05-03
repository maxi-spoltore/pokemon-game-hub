import React, { useState, useEffect } from 'react';
import { isEmpty } from 'lodash';
import toast from 'react-hot-toast';
import Sound from 'react-sound';
import { useGameState, useGameDispatch, ActionTypes } from './GameContext';
import Toaster from '../Toaster';
import PokemonList from './PokemonList';
import GameBoard from './GameBoard';
import Spinner from '../Spinner';

const wordsearch = require('wordsearch');

const directions = {
	HORIZONTAL: 'horizontal',
	HORIZONTAL_REVERSE: 'horizontal_reverse',
	VERTICAL: 'vertical',
	VERTICAL_REVERSE: 'vertical_reverse',
	DIAGONAL_LTR_UTD: 'diagonal_ltr_utd',
	DIAGONAL_RTL_UTD: 'diagonal_rtl_utd',
	DIAGONAL_LTR_DTU: 'diagonal_ltr_dtu',
	DIAGONAL_RTL_DTU: 'diagonal_rtl_dtu'
};

const initialSelectedPoints = {
	start: {},
	end: {}
};

const Started = () => {
	const { pokemonList, pokemonListLength, matches } = useGameState();
	const dispatch = useGameDispatch();

	const [grid, setGrid] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [selectedPoints, setSelectedPoints] = useState(initialSelectedPoints);
	const [selectionEnded, setSelectionEnded] = useState(false);
	const [matchingCells, setMatchingCells] = useState(new Set());
	const [matchSound, setMatchSound] = useState(false);
	
	const pokemonNames = pokemonList.map(pokemon => pokemon.name) || [];
	const flattenedGrid = grid.reduce((acc, val) => acc.concat(val), []) || [];

	const handleCellSelection = (e, cell, type) => {
		e.preventDefault();
		setMatchSound(false);
		setSelectedPoints(prev => ({ ...prev, [type]: cell }));
		if (type === 'end') {
			setSelectionEnded(true);
		} else {
			setSelectionEnded(false);
		}
	};

	const findWordMatch = (selectedPoints, direction) => {
		const { start, end } = selectedPoints;
		const { x: startX, y: startY } = start;
		const { x: endX, y: endY } = end;
		const word = '';
		const selectedCells = [];

		switch (direction) {
			case directions.HORIZONTAL:
				for (let i = startX; i <= endX; i++) {
					word += grid[startY][i].char;
					selectedCells.push(`x${i}y${startY}`);
				}
				break;
			case directions.HORIZONTAL_REVERSE:
				for (let i = startX; i >= endX; i--) {
					word += grid[startY][i].char;
					selectedCells.push(`x${i}y${startY}`);
				}
				break;
			case directions.VERTICAL:
				for (let i = startY; i <= endY; i++) {
					word += grid[i][startX].char;
					selectedCells.push(`x${startX}y${i}`);
				}
				break;
			case directions.VERTICAL_REVERSE:
				for (let i = startY; i >= endY; i--) {
					word += grid[i][startX].char;
					selectedCells.push(`x${startX}y${i}`);
				}
				break;
			case directions.DIAGONAL_LTR_UTD:
				for (let i = startX, j = startY; i <= endX, j <= endY; i++, j++) {
					word += grid[j][i].char;
					selectedCells.push(`x${i}y${j}`);
				}
				break;
			case directions.DIAGONAL_RTL_DTU:
				for (let i = startX, j = startY; i >= endX, j >= endY; i--, j--) {
					word += grid[j][i].char;
					selectedCells.push(`x${i}y${j}`);
				}
				break;
			case directions.DIAGONAL_LTR_DTU:
				for (let i = startY, j = startX; i >= endY, j <= endX; i--, j++) {
					word += grid[i][j].char;
					selectedCells.push(`x${j}y${i}`);
				}
				break;
			case directions.DIAGONAL_RTL_UTD:
				for (let i = startY, j = startX; i <= endY, j >= endX; i++, j--) {
					word += grid[i][j].char;
					selectedCells.push(`x${j}y${i}`);
				}
				break;
			default: {

			}
		};

		if (pokemonNames.includes(word)) {
			if (!matches.has(word)) {
				toast('Gotcha!', {
					duration: 1000
				})
				setMatchSound(true);
			}
			dispatch({ type: ActionTypes.ADD_MATCH, payload: word });
			selectedCells.forEach(cell => setMatchingCells(prev => new Set(prev.add(cell))))
		}
	};

	const handleWordMatch = selectedPoints => {
		const { start, end } = selectedPoints;
		const { x: startX, y: startY } = start;
		const { x: endX, y: endY } = end;
		let dir;
		switch (true) {
			case startX < endX && startY === endY:
				dir = directions.HORIZONTAL;
				break;
			case startX > endX && startY === endY:
				dir = directions.HORIZONTAL_REVERSE;
				break;
			case startY < endY && startX === endX:
				dir = directions.VERTICAL;
				break;
			case startY > endY && startX === endX:
				dir = directions.VERTICAL_REVERSE;
				break;
			case startX < endX && startY < endY && (endX - startX) === (endY - startY):
				dir = directions.DIAGONAL_LTR_UTD;
				break;
			case startX > endX && startY > endY && (startX - endX) === (startY - endY):
				dir = directions.DIAGONAL_RTL_DTU;
				break;
			case startX > endX && startY < endY && (startX - endX) === (endY - startY):
				dir = directions.DIAGONAL_RTL_UTD;
				break;
			case startX < endX && startY > endY && (endX - startX) === (startY - endY):
				dir = directions.DIAGONAL_LTR_DTU;
				break;
			default:
				return false;
		}
		findWordMatch(selectedPoints, dir);
	};

	useEffect(() => {
		const getMatrix = () => {
			const matrix = wordsearch(pokemonNames, 15, 15);
			if (matrix.unplaced.length) return getMatrix();
			return matrix;
		};

		const matrix = getMatrix();
		const { grid: generatedGrid } = matrix;
		const gridWithCoords = generatedGrid.map((row, y) => {
			return row.map((cell, x) => ({ char: cell, x, y }))
		});
		setGrid(gridWithCoords);
	}, [])

	useEffect(() => {
		const { start, end } = selectedPoints;
		if (isEmpty(start) || isEmpty(end)) return;
		if (selectionEnded) handleWordMatch(selectedPoints);
	}, [selectedPoints, selectionEnded]);

	useEffect(() => {
		if (matches && matches.size === pokemonListLength) {
			dispatch({ type: ActionTypes.GAME_WON })
		}
	}, [matches])

	return (
		<div className='w-full fill-screen-vertical bg-safari bg-cover bg-center'>
			<div className={`w-full md:w-6/12 flex ${isLoading ? 'justify-center items-center min-h-[500px]' : ''} items-center mx-auto pt-8`}>
				{isLoading
					? <Spinner />
					: (
						<>
							<GameBoard
								grid={flattenedGrid}
								matchingCells={matchingCells}
								handleCellSelection={handleCellSelection}
							/>
						</>
					)}
				<PokemonList isLoading={isLoading} handleLoading={setIsLoading} />
				{matchSound && (
					<Sound
						url='/sounds/success.wav'
						playStatus={Sound.status.PLAYING}
						volume={60}
					/>
				)}
			</div>
			<Toaster renderType={'pokeball'} />
		</div>
	)
}

export default Started;