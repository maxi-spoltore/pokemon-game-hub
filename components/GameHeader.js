import React from 'react';

const GameHeader = ({ name, description }) => {
	console.log('here');
	return (
		<div className='flex flex-col items-center'>
			<div className='flex lg:inline-block'>
				<h2 className='text-lg lg:text-3xl font-bold my-8 w-full lg:w-0 lg:whitespace-nowrap lg:overflow-hidden animate-slide-in-title lg:animate-typing-title'>{name || ''}</h2>
			</div>
			<div className='lg:w-9/12'>
				<p className='text-sm mt-4 text-center animate-slide-in-bottom-blur'>{description}</p>
			</div>
		</div>
	)
}

export default GameHeader