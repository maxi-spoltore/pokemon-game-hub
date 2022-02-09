import React from 'react';

const LetterCube = ({ char }) => {
	return <div className='flex items-center justify-center font-pokemon-solid text-3xl mx-4 bg-slate-200 rounded-md w-16 h-16 uppercase'>{char}</div>
};

export default LetterCube;
