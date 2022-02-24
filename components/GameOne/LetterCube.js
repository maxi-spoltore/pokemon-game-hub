import React from 'react';
import classNames from 'classnames';

const LetterCube = ({ char, error }) => {
	const baseStyle = [
		'flex',
		'items-center',
		'justify-center',
		'rounded-md',
		... error ? ['bg-red-500'] : ['bg-slate-200']
	];
	const typographyStyle = [
		'font-pokemon-solid',
		'text-3xl',
		'uppercase'
	];
	const spacingStyle = [
		'mx-4',
		'w-16',
		'h-16'
	];
	const animationStyle = [
		... error ? ['animate-letter-error'] : ['animate-letter']
	];
	
	const classes = classNames(
		baseStyle,
		typographyStyle,
		spacingStyle,
		animationStyle
	);

	return <div className={classes}>{char}</div>
};

export default LetterCube;
