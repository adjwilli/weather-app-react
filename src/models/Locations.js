import {Location} from '../models/Location';

export class Locations {
	constructor () {
		this.locations = this.locationsFromLocalStorage() || [];
		this.defaultLocation = new Location();
	}

	locationsFromLocalStorage () {
		let locations = [];
		try {
			locations = JSON.parse(localStorage.locations || '[]').map(loc => new Location(loc));
		} catch (err) {
			console.error(err);
		}
		return locations;
	}

	add (location) {
		const otherLocations = this.locations.filter(loc => loc.id !== location.id);

		if (otherLocations.length === this.locations.length) {
			this.locations = [location, ...this.locations];
		} else {
			this.locations = [location, ...otherLocations];
		}

		this.saveToLocalStorage();
	}

	remove (location) {
		this.locations = this.locations.filter(loc => loc.id !== location.id);
		this.saveToLocalStorage();
		return this.locations;
	}

	saveToLocalStorage () {
		try {
			localStorage.locations = JSON.stringify(this.locations.map(loc => loc.toJSON()));
		} catch (err) {
			console.error(err);
		}
	}

	locationWithPosition (position) {
		return new Location({
			latitude: position.coords.latitude,
			longitude: position.coords.longitude
		});
	}

	get includesCurrentLocation () {
		return this.locations.filter(loc => loc.id.indexOf('current-location') > -1).length > 0;
	}
}
