import React from 'react';
import classNames from 'classnames';

const ActionButton = ({ text, color = 'bg-red-500', size = 'medium', onClick = () => {}}) => {
	const btnSize = () => {
		switch (size) {
			case 'small':
				return 'w-24 p-2';
			case 'medium':
				return 'w-32 p-4';
			case 'large':
				return 'w-72 p-6'
		}
	}

	const btnClasses = classNames(
		btnSize(),
		color,
		'text-white',
		'text-2xl',
		'font-medium',
		'rounded-xl',
		'uppercase',
		'flex',
		'justify-center',
		'items-center'
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