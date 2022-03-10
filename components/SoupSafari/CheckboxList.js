import React, { useState } from 'react';
import Checkbox from '../Checkbox';

const CheckboxList = ({ data = [], labelName, componentMapping }) => {
	const [selectedBoxes, setSelectedBoxes] = useState([]);

	const handleSelectBox = (e, label) => {
		const isChecked = e?.target?.checked;
		const targetData = data.find(item => item[labelName] === label);
		if (isChecked) {
			setSelectedBoxes(prev => [...prev, targetData])
		} else {
			setSelectedBoxes(selectedBoxes.filter(item => item[labelName] !== label))
		}
	}

	const renderCheckboxes = () => {
		return data.map((item, idx) => {
			const label = item[labelName] || '';
			const key = `checkbox-item--${labelName}--${idx}`;
			return <Checkbox key={key} label={label} componentMapping={componentMapping} onChange={handleSelectBox} />
		})
	}

	return (
		<div>
			<form>
				{renderCheckboxes()}
			</form>
		</div>
	)
}

export default CheckboxList;