import React from 'react';
import classNames from 'classnames';
import { useGameState, useGameDispatch, ActionTypes } from './GameContext';
import ActionButton from '../ActionButton';

const GameBoard = ({ grid, matchingCells, handleCellSelection }) => {
	const { gameWon } = useGameState();
	const dispatch = useGameDispatch();

	const handleNewGame = () => {
		dispatch({ type: ActionTypes.RESTART_GAME });
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
			'md:text-lg',
			'font-pokemon-gb',
			'border',
			'hover:border-amber-900',
			'cursor-pointer',
			...(matchingCells.has(cellId) ? ['bg-amber-900', 'text-slate-100'] : []),
			'hover:bg-amber-900',
			'hover:text-white'
		])
	};

	const BoardOverlay = () => {
		const contentClasses = classNames([
			'font-pokemon-solid',
			'tracking-[.25em]',
			'flex',
			'flex-col',
			'justify-center',
			'items-center',
			'bg-white',
			'p-4',
			'mb-8',
			'rounded-xl',
			'shadow-2xl',
			'animate-slide-in'
		]);

		return (
			<div className='absolute w-full h-full'>
				<div className='absolute w-full h-full bg-red-300 opacity-70'></div>
				<div className='absolute w-full h-full flex flex-col justify-center items-center z-10'>
					<div className={contentClasses}>
						<h3 className='text-4xl tracking-[.25em] mb-4'>Congratulations!</h3>
						<p className='text-xl tracking-[.25em]'>You've catched 'em all!</p>
					</div>
					<div className='animate-btn-slide-in'>
						<ActionButton text='Start New Game' size='large' onClick={handleNewGame}/>
					</div>
				</div>
			</div>
		);
	};

	return (
		<div className='w-auto h-auto mx-auto mb-auto grid grid-cols-15 border border-8 border-green-800 rounded-lg relative bg-safari-texture'>
			{grid.map((cell, idx) => {
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
			{gameWon && <BoardOverlay />}
		</div>
	);
};

export default GameBoard