import React from 'react';
import GameContent from './GameContent';

const GameWrapper = ({ name, description }) => {
	return (
		<div className='w-full flex justify-center'>
			<GameContent
				name={name}
				description={description}
			/>
		</div>
	);
};

export default GameWrapper;
