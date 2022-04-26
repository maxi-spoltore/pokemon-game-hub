import React from 'react';

const GameHeader = ({ name, description }) => {
	return (
		<div className='flex flex-col items-center'>
			<div className='inline-block'>
				<h2 className='text-3xl font-bold my-8 w-0 overflow-hidden animate-typing-title'>{name || ''}</h2>
			</div>
			<div>
				<p className='text-sm mt-4 text-center animate-slide-in-bottom-blur md:animate-tracking'>{description}</p>
			</div>
		</div>
	)
}

export default GameHeader