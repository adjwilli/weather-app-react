import _ from 'lodash';

export class Location {
	constructor (locationData) {
		//console.log('new Location(locationData)', locationData);

		this.id = 'loc-' + (_.get(locationData, 'id') || 'current-location');
		this.name = this.getLocationName(locationData);
		this.latitude = _.get(locationData, 'latitude');
		this.longitude = _.get(locationData, 'longitude');
	}

	getLocationName (locationData) {
		const name = _.get(locationData, 'name') || 'Current location',
			admin1 = _.get(locationData, 'admin1'),
			country = _.get(locationData, 'country');

		let string = name;

		if (admin1) {
			string += `, ${admin1}`;
		}

		if (country) {
			string += `, ${country}`;
		}

		return string;
	}

	toJSON () {
		const nameArray = this.name.split(', ');
		return {
			id: this.id.substr(4).replace('current-location',''),
			name: nameArray[0],
			admin1: nameArray[1],
			country: nameArray[2],
			latitude: this.latitude,
			longitude: this.longitude
		}
	}
}
