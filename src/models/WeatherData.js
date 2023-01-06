import _ from 'lodash';

const weatherCodes = require('../utils/weatherCodes'),
	predefinedParticles = require('../utils/predefinedParticles');

export class WeatherData {

	currentDatetime = new Date();

	constructor( weatherData) {
		//console.log('new Weather(weatherData)', weatherData);

		const getTimezoneOffset = (weatherData) => {
			const seconds = _.get(weatherData, 'utc_offset_seconds'),
				hours = seconds / 3600,
				hoursAbs =  Math.abs(hours);

			return ((hours > 0) ? '+' : '-') + ((hoursAbs < 10) ? '0' + hoursAbs : hoursAbs) + ':00';
		}

		this.currentTemperature =  (_.get(weatherData, 'current_weather.temperature'));
		this.highTemperature = _.get(weatherData, 'daily.temperature_2m_max[0]');
		this.lowTemperature = _.get(weatherData, 'daily.temperature_2m_min[0]');
		this.timezoneOffset = getTimezoneOffset(weatherData);
		this.sunrise = new Date(_.get(weatherData, 'daily.sunrise[0]') + this.timezoneOffset);
		this.sunset = new Date(_.get(weatherData, 'daily.sunset[0]') + this.timezoneOffset);
		this.isDaylight = this.currentDatetime.getTime() > this.sunrise.getTime() && this.currentDatetime.getTime() < this.sunset.getTime();
		this.weatherCode = _.get(weatherData, 'current_weather.weathercode');
		this.codeString = _.get(weatherCodes, `[${this.weatherCode}].string`);
		this.className = _.get(weatherCodes, `[${this.weatherCode}].className`);
		this.faIcon = _.get(weatherCodes, `[${this.weatherCode}].faIcon`);
		this.precipitation = _.get(weatherCodes, `[${this.weatherCode}].precipitation`);
		this.atmosphere = _.get(weatherCodes, `[${this.weatherCode}].atmosphere`);

		if (weatherData.weatherCodeString) {
			this.className += (this.isDaylight) ? " daylight" : " nighttime";
		}

	}

	get particles () {
		let params = {};
		if (this.precipitation) {
			const predefinedKey = this.precipitation + (this.isDaylight ? '-day' : '-night');
			params = predefinedParticles[predefinedKey];
		}

		return params;
	}

	get particlesAtmosphere () {
		let params = {};
		if (this.atmosphere) {
			let atmosphereString;

			if (this.atmosphere === 3) {
				atmosphereString = 'cloudy';
			}

			const predefinedKey = atmosphereString + (this.isDaylight ? '-day' : '-night');
			
			params = predefinedParticles[predefinedKey];
		}

		return params;
	}
}
