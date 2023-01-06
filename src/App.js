import './App.css';
import React, { useState } from "react";
import Weather from './components/Weather';
import {Locations} from './models/Locations';
import LocationSelector from './components/LocationSelector';
import TemperatureUnitSelector from './components/TemperatureUnitSelector';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { library } from '@fortawesome/fontawesome-svg-core'
import { faCloud, faSun, faCloudSun, faCloudRain, faCloudBolt, faSnowflake, faSmog, faCloudShowersHeavy, faSpinner, faLocationCrosshairs, faGears } from '@fortawesome/free-solid-svg-icons'

library.add(faCloud, faSun, faCloudSun, faCloudRain, faCloudBolt, faSnowflake, faSmog, faCloudShowersHeavy, faSpinner, faLocationCrosshairs, faGears);

function App () {

	const _locations = new Locations();

	const [locations, setLocations] = useState(_locations.locations);
	const [temperatureUnit, setTemperatureUnit] = useState('fahrenheit');
	const [modalClassName, setModalClassName] = useState('closed');

	const handleLocationsChange = (_locations) => {
		console.log('handleLocationSelection', _locations);
		setLocations(_locations);
	}

	const handleRemoveLocation = (location) => {
		setLocations(_locations.remove(location));
	}

	const toggleModal = () => {
		setModalClassName(modalClassName === 'closed' ? 'open' : 'closed');
	}

	const handleTemperatureUnitChange = _temperatureUnit => {
		setTemperatureUnit(_temperatureUnit);
	}

	return (
		<div className="App">
			<div className="header">
				<LocationSelector handleLocationsChange={handleLocationsChange} locations={_locations} />
			</div>

			<div className="locations">
				{(locations.map(location => (
					<Weather key={location.id} location={location} temperatureUnit={temperatureUnit} removeLocationHandler={handleRemoveLocation} />
				)))}
				{locations.length === 0 && (
					<p className="intro">Choose a location to get started.</p>
				)}
			</div>

			{modalClassName === 'closed' && (<button id="settings-button" onClick={toggleModal}><FontAwesomeIcon icon="gears" /></button>)}
			<div id="settings-modal" className={modalClassName} onClick={toggleModal}>
				<h3>Settings</h3>
				<TemperatureUnitSelector handleTemperatureUnitChange={handleTemperatureUnitChange} />
			</div>
		</div>
	);
}

export default App;
