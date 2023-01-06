import React from 'react';
import './TemperatureUnitSelector.css';

const TemperatureUnitSelector = ({handleTemperatureUnitChange}) => {

	const selectChange = event => {
		handleTemperatureUnitChange(event.target.value);
	}

	const onClick = event => {
		event.stopPropagation();
	}

	return (<span id="temperature-unit-selector">
		Unit:
		<select onChange={selectChange} onClick={onClick}>
			<option>fahrenheit</option>
			<option>celsius</option>
		</select>
	</span>);
};

export default TemperatureUnitSelector;
