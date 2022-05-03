import React from 'react'

const GuessPlaceholder = ({ text = '' }) => {
	return (
		<p className='text-2xl font-bold animate-text-blink'>
			{text}
		</p>
	);
}

export default GuessPlaceholder