import React from 'react';
import './LocationSelector.css';
import { useEffect, useState } from "react";
import openMeteo from '../utils/openMeteoApi';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Result = ({result, handleResultSelection}) => {

	const handleClick = event => {
		handleResultSelection(result);
	}

	return (
		<div key={result.id} className="location-selector-result" onClick={handleClick}>
			<b>{result.name}</b>
		</div>
	)
}

const Results = ({searchResults, handleResultSelection}) => {

	if (searchResults.length > 0) {
		return (
			<div className="location-selector-results">
				{(searchResults.map(result => (
					<Result key={result.id} result={result} handleResultSelection={handleResultSelection} />
				)))}
			</div>
		)

	} else {
		return (<span></span>)
	}

}

const LocationSelector = ({handleLocationsChange, locations}) => {

	const [searchString, setSearchString] = useState('');
	const [searchResults, setSearchResults] = useState([]);
	const [searchStringIsFocus, setSearchIsFocus] = useState(false);
	const [errMsg, setErrMsg] = useState({});

	const fetchData = async () => {

		if (typeof searchString == 'string' && searchString.length > 1) {
			openMeteo.getLocations(searchString)
				.then(results => {
					setSearchResults(results);
				});
		}
	};

	useEffect(() => {
		fetchData();
	}, [searchString]);

	const handleSearchStringChange = event => {
		setSearchString(event.target.value);
	}

	const handleSearchStringBlur = event => {
		setTimeout(() => {
			setSearchIsFocus(false);
		}, 200);
	}

	const handleSearchStringFocus = event => {
		setSearchIsFocus(true);
		setErrMsg({});
	}

	const handleResultSelection = (result) => {
		setSearchString('');
		setSearchResults([]);
		locations.add(result);
		handleLocationsChange(locations.locations);
	}

	const handleCurrentLocationSelection = () => {
		const success = (position) => {
				const currentLocation = locations.locationWithPosition(position);
				locations.add(currentLocation);
				handleLocationsChange(locations.locations);
				setErrMsg({});
			},
			error = (errMsg) => {
				console.log('errMsg', errMsg);
				setErrMsg(errMsg);
				locations.add(locations.defaultLocation);
			};

		locations.add(locations.defaultLocation);
		handleLocationsChange(locations.locations);

		navigator.geolocation.getCurrentPosition(success, error);
	}

	return (
		<div className="location-selector">
			<input id="location-selector-input" placeholder="Search locations..." value={searchString} onChange={handleSearchStringChange} onBlur={handleSearchStringBlur} onFocus={handleSearchStringFocus} autoComplete="off" />
			{searchStringIsFocus &&
				<Results searchResults={searchResults} handleResultSelection={handleResultSelection} />
			}
			<span>
				{ locations.locations.length === 0 && (
				<span>or</span>
				)}
				<button onClick={handleCurrentLocationSelection} disabled={locations.includesCurrentLocation} >
					<FontAwesomeIcon icon="location-crosshairs" />
					{ locations.locations.length === 0 && (
						<span>Current Location</span>
					)}
				</button>
			</span>
			{errMsg.code === 1 &&
				(<div className="errMsg">You need to grant this app permission to access your location data.
				</div>)
			}
		</div>
	);
}

export default LocationSelector;
