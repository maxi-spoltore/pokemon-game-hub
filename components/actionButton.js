import React from 'react';
import classNames from 'classnames';

const ActionButton = ({
	text,
	color = 'red',
	size = 'medium',
	active,
	onClick = () => {}
}) => {
	const btnSize = () => {
		switch (size) {
			case 'small':
				return ['w-24 p-2 text-md rounded-md'];
			case 'medium':
				return ['w-32 p-4 text-lg rounded-lg'];
			case 'large':
				return ['w-72 p-6 text-2xl rounded-xl']
		}
	}

	const colorTheme = {
		red: {
			base: ['bg-red-500', 'hover:bg-red-500'],
			active: ['bg-red-600']
		},
		lightRed: {
			base: ['bg-red-300', 'hover:bg-red-500'],
			active: ['bg-red-600']
		},
	}

	const btnClasses = classNames(
		...btnSize(),
		color,
		'text-white',
		'font-medium',
		'uppercase',
		'flex',
		'justify-center',
		'items-center',
		'transition-all',
		...colorTheme[color].base,
		...(active ? colorTheme[color].active : [])
	);

	return (
		<button
			className={btnClasses}
			onClick={onClick}
		>
			{text || ''}
		</button>
	)
}

export default ActionButton