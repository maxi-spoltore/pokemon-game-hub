import React from 'react';
import classNames from 'classnames';
import { unslugify } from '../utils/utils';

const Checkbox = ({ label, groupName, componentAttributes, onChange }) => {
	const { labelFormat } = componentAttributes || {};

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

	const inputClasses = classNames([
		'form-check-input',
		'appearance-none',
		'h-4',
		'w-4',
		'border',
		'border-gray-300',
		'rounded-sm',
		'bg-white',
		'checked:bg-blue-600',
		'checked:border-blue-600',
		'focus:outline-none',
		'transition',
		'duration-200',
		'mt-1',
		'align-top',
		'bg-no-repeat',
		'bg-center',
		'bg-contain',
		'float-left',
		'mr-2',
		'cursor-pointer'
	]);

	return (
		<div className="flex">
			<div className="flex items-center">
				<input className={inputClasses} type="checkbox" value="" id={inputId} onChange={(e) => onChange(e, label, groupName)} />
				<label className="ml-1 text-gray-800 cursor-pointer" htmlFor={inputId}>
					{formatLabel()}
				</label>
			</div>
		</div>
	)
}

export default Checkbox;