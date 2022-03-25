import React, { useState, useEffect } from 'react';
import { isEmpty } from 'lodash';
import classNames from 'classnames';
import { useGameState } from './GameContext';

const wordsearch = require('wordsearch');

// Mocks
const matrixMock = {
	"grid": [
			[
					"a",
					"t",
					"u",
					"o",
					"r",
					"p",
					"s",
					"l",
					"l",
					"e",
					"b",
					"d",
					"i",
					"o",
					"n"
			],
			[
					"y",
					"z",
					"o",
					"f",
					"w",
					"n",
					"m",
					"a",
					"i",
					"r",
					"r",
					"f",
					"t",
					"c",
					"h"
			],
			[
					"c",
					"a",
					"i",
					"r",
					"n",
					"n",
					"p",
					"m",
					"v",
					"m",
					"y",
					"o",
					"z",
					"l",
					"v"
			],
			[
					"m",
					"m",
					"o",
					"x",
					"b",
					"a",
					"q",
					"d",
					"j",
					"c",
					"z",
					"q",
					"p",
					"c",
					"m"
			],
			[
					"b",
					"k",
					"t",
					"w",
					"z",
					"w",
					"x",
					"r",
					"h",
					"i",
					"s",
					"t",
					"e",
					"a",
					"y"
			],
			[
					"l",
					"o",
					"j",
					"a",
					"s",
					"y",
					"o",
					"k",
					"o",
					"e",
					"u",
					"g",
					"g",
					"b",
					"p"
			],
			[
					"a",
					"z",
					"e",
					"r",
					"b",
					"z",
					"m",
					"l",
					"u",
					"h",
					"q",
					"i",
					"u",
					"x",
					"t"
			],
			[
					"s",
					"w",
					"n",
					"t",
					"s",
					"j",
					"a",
					"n",
					"s",
					"n",
					"k",
					"l",
					"m",
					"f",
					"x"
			],
			[
					"t",
					"z",
					"i",
					"o",
					"t",
					"n",
					"n",
					"v",
					"v",
					"a",
					"b",
					"c",
					"i",
					"z",
					"z"
			],
			[
					"o",
					"a",
					"n",
					"r",
					"i",
					"e",
					"y",
					"b",
					"r",
					"a",
					"c",
					"j",
					"v",
					"w",
					"e"
			],
			[
					"i",
					"p",
					"a",
					"t",
					"r",
					"x",
					"t",
					"p",
					"s",
					"r",
					"q",
					"t",
					"k",
					"l",
					"s"
			],
			[
					"s",
					"d",
					"c",
					"l",
					"j",
					"c",
					"e",
					"a",
					"x",
					"q",
					"v",
					"f",
					"e",
					"z",
					"m"
			],
			[
					"e",
					"o",
					"r",
					"e",
					"m",
					"o",
					"u",
					"y",
					"o",
					"p",
					"o",
					"w",
					"z",
					"a",
					"x"
			],
			[
					"h",
					"s",
					"a",
					"w",
					"y",
					"r",
					"s",
					"e",
					"a",
					"k",
					"i",
					"n",
					"g",
					"z",
					"t"
			],
			[
					"e",
					"c",
					"y",
					"c",
					"u",
					"j",
					"f",
					"j",
					"s",
					"r",
					"r",
					"u",
					"w",
					"i",
					"p"
			]
	],
	"solved": [
			[
					" ",
					"t",
					"u",
					"o",
					"r",
					"p",
					"s",
					"l",
					"l",
					"e",
					"b",
					" ",
					" ",
					" ",
					" "
			],
			[
					" ",
					" ",
					"o",
					" ",
					" ",
					" ",
					" ",
					" ",
					" ",
					" ",
					" ",
					" ",
					" ",
					" ",
					" "
			],
			[
					" ",
					" ",
					" ",
					"r",
					" ",
					" ",
					" ",
					" ",
					" ",
					" ",
					" ",
					" ",
					" ",
					" ",
					" "
			],
			[
					" ",
					" ",
					" ",
					" ",
					"b",
					" ",
					" ",
					" ",
					" ",
					" ",
					" ",
					" ",
					" ",
					" ",
					"m"
			],
			[
					"b",
					" ",
					" ",
					"w",
					" ",
					"w",
					" ",
					" ",
					" ",
					" ",
					" ",
					" ",
					" ",
					"a",
					" "
			],
			[
					"l",
					" ",
					" ",
					"a",
					" ",
					" ",
					"o",
					" ",
					" ",
					" ",
					" ",
					" ",
					"g",
					"b",
					" "
			],
			[
					"a",
					" ",
					"e",
					"r",
					" ",
					" ",
					"m",
					"l",
					" ",
					" ",
					" ",
					"i",
					"u",
					" ",
					" "
			],
			[
					"s",
					" ",
					"n",
					"t",
					" ",
					" ",
					"a",
					" ",
					"s",
					" ",
					"k",
					"l",
					" ",
					" ",
					" "
			],
			[
					"t",
					"z",
					"i",
					"o",
					" ",
					" ",
					"n",
					" ",
					" ",
					"a",
					"b",
					" ",
					" ",
					" ",
					" "
			],
			[
					"o",
					"a",
					"n",
					"r",
					" ",
					" ",
					"y",
					" ",
					"r",
					"a",
					" ",
					" ",
					" ",
					" ",
					" "
			],
			[
					"i",
					"p",
					"a",
					"t",
					" ",
					" ",
					"t",
					"p",
					"s",
					" ",
					" ",
					" ",
					" ",
					" ",
					" "
			],
			[
					"s",
					"d",
					"c",
					"l",
					" ",
					" ",
					"e",
					"a",
					" ",
					" ",
					" ",
					" ",
					" ",
					" ",
					" "
			],
			[
					"e",
					"o",
					"r",
					"e",
					" ",
					" ",
					"u",
					" ",
					" ",
					" ",
					" ",
					" ",
					" ",
					" ",
					" "
			],
			[
					" ",
					"s",
					"a",
					" ",
					" ",
					"r",
					"s",
					"e",
					"a",
					"k",
					"i",
					"n",
					"g",
					" ",
					" "
			],
			[
					" ",
					" ",
					" ",
					" ",
					" ",
					" ",
					" ",
					" ",
					" ",
					" ",
					" ",
					" ",
					" ",
					" ",
					" "
			]
	],
	"unplaced": []
};

const pokemonNamesMock = ['bellsprout', 'slowbro', 'blastoise', 'zapdos', 'arcanine', 'wartortle', 'omanyte', 'magikarp', 'seaking', 'bulbasaur']

// End Mocks

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
	const [grid, setGrid] = useState([]);
	const [selectedPoints, setSelectedPoints] = useState(initialSelectedPoints);
	const [selectionStarted, setSelectionStarted] = useState(false);
	const [selectionEnded, setSelectionEnded] = useState(false);
	const [matchingCells, setMatchingCells] = useState(new Set());
	const [foundWords, setFoundWords] = useState(new Set());
	const { pokemonList } = useGameState();
	const pokemonNames = pokemonList.map(pokemon => pokemon.name);

	const flattenedGrid = grid.reduce((acc, val) => acc.concat(val), []) || [];

	const handleCellSelection = (e, cell, type) => {
		e.preventDefault();
		setSelectedPoints(prev => ({ ...prev, [type]: cell }));
		if (type === 'start') {
			setSelectionStarted(true);
			setSelectionEnded(false);
		} else {
			setSelectionStarted(false);
			setSelectionEnded(true);
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
			setFoundWords(prev => new Set(prev.add(word)));
			selectedCells.forEach(cell => setMatchingCells(prev => new Set(prev.add(cell))))
		}

	};

	const handleWordMatch = selectedPoints => {
		const { start, end } = selectedPoints;
		const { char: startChar, x: startX, y: startY } = start;
		const { char: endChar, x: endX, y: endY } = end;
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

	const getCellClasses = cellId => {
		return classNames([
			'w-[20px]',
			'md:w-[32px]',
			'h-[20px]',
			'md:h-[32px]',
			'flex',
			'justify-center',
			'items-center',
			'text-sm',
			'md:text-xl',
			'font-bold',
			'border',
			'hover:border-red-500',
			'cursor-pointer',
			...(matchingCells.has(cellId) ? ['bg-red-500', 'text-slate-100'] : []),
			'hover:bg-red-500',
			'hover:text-white'
		])
	};

	const getWordClasses = word => {
		const matchingWord = foundWords.has(word);
		return classNames([
			'text-xl',
			'font-bold',
			...(matchingWord ? ['line-through', 'decoration-2', 'text-black'] : ['text-red-500'])
		])
	}

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
		// console.log({ selectedPoints });
		if (selectionEnded) handleWordMatch(selectedPoints);
	}, [selectedPoints, selectionEnded])

	return (
		<div className='w-full h-full'>
			<div className='w-full md:w-6/12 flex mx-auto pt-8'>
				<div className='w-auto h-auto mx-auto grid grid-cols-15 border border-black'>
					{flattenedGrid.map((cell, idx) => {
						const key = `board-cell--${idx}`;
						const cellId = `x${cell.x}y${cell.y}`
						return (
							<div
								key={key}
								id={cellId}
								className={getCellClasses(cellId)}
								onMouseDown={(e) => handleCellSelection(e, cell, 'start')}
								onMouseUp={(e) => handleCellSelection(e, cell, 'end')}
							>
								{cell.char.toUpperCase()}
							</div>
						)
					})}
				</div>
				<div>
					{pokemonNames.map((word, idx) => {
						const key = `word--${idx}`;
						return (
							<div key={key} className={getWordClasses(word)}>{word.toUpperCase()}</div>
						)
					})}
				</div>
			</div>
		</div>
	)
}

export default Started;