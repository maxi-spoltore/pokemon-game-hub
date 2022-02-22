import React from 'react';
import { useSpring, animated } from 'react-spring';

const LetterCube = ({ char }) => {
	const animatedProps = useSpring({
		from: { transform: 'scale(1.3)'},
		to: { transform: 'scale(1)' }
	});
	return <animated.div style={animatedProps} className='flex items-center justify-center font-pokemon-solid text-3xl mx-4 bg-slate-200 rounded-md w-16 h-16 uppercase'>{char}</animated.div>
};

export default LetterCube;
