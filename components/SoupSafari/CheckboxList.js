import React from 'react';
import { useGameDispatch, ActionTypes } from './GameContext';
import Checkbox from './Checkbox';

const findOption = (options, field, value) => {
	const condition = item => item[field] === value;
	const option = options.reduce((prev, curr) => {
		const { data } = curr;
		return prev || data.find(condition);
	}, undefined);

	return option;
};

const CheckboxList = ({ options = [], nameField, componentAttributes }) => {
	const dispatch = useGameDispatch();

	const handleSelectBox = (e, label) => {
		const isChecked = e?.target?.checked;
		const targetData = findOption(options, nameField, label);
		if (isChecked) {
			dispatch({ type: ActionTypes.ADD_GAME_OPTION, payload: targetData });
		} else {
			dispatch({ type: ActionTypes.REMOVE_GAME_OPTION, payload: { matchField: nameField, matchValue: targetData[nameField] } });
		}
	}

	const renderCheckboxes = (optionGroup) => {
		const { name, data } = optionGroup;
		return data.map((item, idx) => {
			const label = item[nameField] || '';
			const key = `checkbox-item--${nameField}--${idx}`;
			return <Checkbox key={key} label={label} groupName={name} groupcomponentAttributes={componentAttributes} onChange={handleSelectBox} />
		})
	}

	return (
		<div className='w-10/12 md:w-6/12 mx-auto my-8'>
			<form>
				{options.map((optionGroup, idx) => {
					const { name, label } = optionGroup;
					const key = `checkbox-group--${name}--${idx}`;
					return (
						<div key={key} className='w-full flex flex-col items-center bg-gray-100 rounded-lg m-4 p-2'>
							<h5 className=''>{label}</h5>
							<div className='flex flex-wrap justify-center mt-4'>
								{renderCheckboxes(optionGroup)}
							</div>
						</div>
					);
				})}
			</form>
		</div>
	)
}

export default CheckboxList;