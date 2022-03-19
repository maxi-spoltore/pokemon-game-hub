import React from 'react';
import { useGameDispatch, ActionTypes } from './GameContext';
import Checkbox from '../Checkbox';

const findOption = (options, field, value) => {
	const condition = item => item[field] === value;
	const option = options.reduce((prev, curr) => {
		const { data } = curr;
		return prev || data.find(condition);
	}, undefined);

	return option;
};

const CheckboxList = ({ options = [], labelName, componentAttributes }) => {
	const dispatch = useGameDispatch();

	const gridCols = options.length;

	const handleSelectBox = (e, label) => {
		const isChecked = e?.target?.checked;
		const targetData = findOption(options, labelName, label);
		if (isChecked) {
			dispatch({ type: ActionTypes.ADD_GAME_OPTION, payload: targetData });
		} else {
			dispatch({ type: ActionTypes.REMOVE_GAME_OPTION, payload: { matchField: labelName, matchValue: targetData[labelName] } });
		}
	}

	const renderCheckboxes = (optionGroup) => {
		const { name, data } = optionGroup;
		return data.map((item, idx) => {
			const label = item[labelName] || '';
			const key = `checkbox-item--${labelName}--${idx}`;
			return <Checkbox key={key} label={label} groupName={name} groupcomponentAttributes={componentAttributes} onChange={handleSelectBox} />
		})
	}

	return (
		<div className='w-9/12 m-auto'>
			<form className={`grid grid-cols-${gridCols}`}>
				{options.map((optionGroup, idx) => {
					const { name } = optionGroup;
					const key = `checkbox-group--${name}--${idx}`;
					return (
						<div key={key} className='w-full flex flex-col items-center'>
							<h5>{name}</h5>
							{renderCheckboxes(optionGroup)}
						</div>
					);
				})}
			</form>
		</div>
	)
}

export default CheckboxList;