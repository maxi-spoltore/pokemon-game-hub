import React from 'react'
import ActionButton from './ActionButton';

const DifficultySelector = ({ difficulties = [], selectedDifficulty, handleSelect }) => {
	if (!difficulties || !difficulties.length) return null;

	const renderDifficultyBtns = () =>
		difficulties.map((difficulty, idx) => {
			const key = `difficulty--${difficulty}--${idx}`;
			return (
				<ActionButton
					key={key}
					active={selectedDifficulty === difficulty}
					text={difficulty}
					color='lightRed'
					size='small'
					onClick={() => handleSelect(difficulty)}
					styles={['w-min px-2']}
				/>
			)
		});

	return (
		<div className='flex flex-col lg:flex-row items-center bg-red-300 p-3 mb-8 rounded-xl'>
			<h5 className='lg:mr-2 text-sm'>Select difficulty:</h5>
			<div className='mt-2 lg:mt-0 flex flex-wrap gap-4'>
				{renderDifficultyBtns()}
			</div>
		</div>
	)
}

export default DifficultySelector