import {WeatherData} from '../models/WeatherData';
import {Location} from '../models/Location';

async function getWeatherForecast (options) {

	if (typeof options !== 'object') {
		options = {};
	}

	const location = options.location || {},
		latitude = (typeof location.latitude === 'number') ? location.latitude : 0,
		longitude = (typeof location.longitude === 'number') ? location.longitude : 0,
		allowedTemperatureUnits = ['fahrenheit','celsius'],
		allowedWindSpeedUnits = ['mph', 'kph'],
		temperatureUnit = (allowedTemperatureUnits.indexOf(options.temperatureUnit) > -1) ? options.temperatureUnit : allowedTemperatureUnits[0],
		windSpeedUnit = allowedWindSpeedUnits.indexOf(options.windSpeedUnit) > -1 ? options.windSpeedUnit : allowedWindSpeedUnits[0];

	const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m&daily=sunrise,sunset,weathercode,temperature_2m_max,temperature_2m_min&temperature_unit=${temperatureUnit}&windspeed_unit=${windSpeedUnit}&current_weather=true&timezone=auto`;

	return fetch(url)
		.then(res => res.json())
		.then(res => {
			return new WeatherData(res);
		});
}

async function getLocations (search) {

	if (typeof search !== 'string') {
		search = '';
	}

	const url = `https://geocoding-api.open-meteo.com/v1/search?name=${search}`;

	return fetch(url)
		.then(res => res.json())
		.then(res => res.results.map(result => new Location(result)));
}

const openMeteoApi = {
	getWeatherForecast: getWeatherForecast,
	getLocations: getLocations,
	getDefaultLocation: new Location()
};

export default openMeteoApi;
