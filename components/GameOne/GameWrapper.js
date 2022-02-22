import React from 'react';
import GameContent from './GameContent';
import WithCountdown from '../../hocs/WithCountdown';

const GameWrapper = ({ name, description }) => {
	return (
		<div className='w-full flex justify-center'>
			<WithCountdown countdownTime={1000000}>
				{({ setCountdown }) => (
					<GameContent
						name={name}
						description={description}
						handleCountdown={setCountdown}
					/>
				)}
			</WithCountdown>
		</div>
	);
};

export default GameWrapper;
