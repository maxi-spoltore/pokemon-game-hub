import React, { useState } from 'react';
import classNames from 'classnames';
import { unslugify } from '../utils/utils';

const themes = {
	type: {
		normal: {
			text:'text-pink-800', 
			background:'bg-pink-100',
			border: 'border-pink-100'
		},
		fighting: {
			text: 'text-white',
			background: 'bg-red-800',
			border: 'border-red-800'
		},
		flying: {
			text: 'text-white',
			background: 'bg-violet-400',
			border: 'border-violet-400'
		},
		poison: {
			text: 'text-white',
			background: 'bg-fuchsia-800',
			border: 'border-fuchsia-800'
		},
		ground: {
			text: 'text-slate-600',
			background: 'bg-amber-400',
			border: 'border-amber-400'
		},
		rock: {
			text: 'text-white',
			background: 'bg-yellow-600',
			border: 'border-yellow-600'
		},
		bug: {
			text: 'text-white',
			background: 'bg-lime-600',
			border: 'border-lime-600'
		},
		ghost: {
			text: 'text-white',
			background: 'bg-purple-800',
			border: 'border-purple-800'
		},
		steel: {
			text: 'text-white',
			background: 'bg-zinc-400',
			border: 'border-zinc-400'
		},
		fire: {
			text: 'text-white',
			background: 'bg-red-600',
			border: 'border-red-600'
		},
		water: {
			text: 'text-white',
			background: 'bg-blue-500',
			border: 'border-blue-500'
		},
		grass: {
			text: 'text-white',
			background: 'bg-green-600',
			border: 'border-green-600'
		},
		electric: {
			text: 'text-slate-600',
			background: 'bg-yellow-300',
			border: 'border-yellow-300'
		},
		psychic: {
			text: 'text-white',
			background: 'bg-fuchsia-400',
			border: 'border-fuchsia-400'
		},
		ice: {
			text: 'text-slate-600',
			background: 'bg-cyan-300',
			border: 'border-cyan-300'
		},
		dragon: {
			text: 'text-white',
			background: 'bg-purple-700',
			border: 'border-purple-700'
		},
		dark: {
			text: 'text-white',
			background: 'bg-stone-800',
			border: 'border-stone-800'
		},
		fairy: {
			text: 'text-white',
			background: 'bg-rose-400',
			border: 'border-rose-400'
		},
		_default: {
			text: 'text-white',
			background: 'bg-red-600',
			border: 'border-red-600'
		}
	},
	generation: {
		_default: {
			text: 'text-white',
			background: 'bg-red-600',
			border: 'border-red-600'
		}
	},
	_default: {
		text: 'text-white',
		background: 'bg-red-600',
		border: 'border-red-600'
	}
};

const getTheme = (group, type) => {
	const themeGroup = themes[group] || themes._default;
	if (!themeGroup) return themes._default;
	const theme = themeGroup[type] || themeGroup._default || themes._default;
	return theme;
};

const Checkbox = ({ label, groupName, componentAttributes, onChange }) => {
	const [checked, setChecked] = useState(false);
	const { labelFormat } = componentAttributes || {};

	const theme = getTheme(groupName, label);

	const inputId = `checkbox-${label}`;

	const formatLabel = () => {
		switch(true) {
			case (labelFormat === 'unslugify'):
				return unslugify(label);
			case (!labelFormat):
				return label;
			default:
				return label;
		}
	};

	const labelClasses = classNames([
		'flex',
		'justify-center',
		'items-center',
		'rounded-md',
		'p-1',
		'cursor-pointer',
		'border',
		...(checked ? [theme.background] : ['bg-white']),
		...(checked ? [theme.border] : ['border-black'])
	]);

	const textClasses = classNames([
		'uppercase',
		...(checked ? [theme.text] : ['text-black'])
	])

	const handleChange = e => {
		const isChecked = e?.target?.checked;
		setChecked(isChecked);
		if (onChange) onChange(e, label, groupName)
	}

	return (
		<div className="m-1 min-w-[80px]">
			<label className={labelClasses} htmlFor={inputId}>
				<input className="absolute hidden" value={checked} type="checkbox" id={inputId} onChange={handleChange}/>
				<span className={textClasses}>{formatLabel()}</span>
			</label>
		</div>
	)
}

export default Checkbox;