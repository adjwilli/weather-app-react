import React, { useEffect, useState } from "react";
import './Weather.css';
import openMeteo from '../utils/openMeteoApi';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../utils/particles.js';

const Weather = ({location, temperatureUnit, removeLocationHandler}) => {

	const defaultStyle = {
		left: 0,
		transitionProperty: 'left, opacity',
		transitionDuration: '300ms',
		opacity: 1
	};

	const [weatherData, setWeatherData] = useState({});
	const [style, setStyle] = useState(defaultStyle);
	const [rowStyle, setRowStyle] = useState({
		height: 0,
		opacity: 0
	});
	const [xDown, setXDown] = useState();
	const [yDown, setYDown] = useState();
	const [currentGesture, setCurrentGesture] = useState();

	const fetchData = async () => {

		setRowStyle({
			height: '228px',
			transitionProperty: 'height, opacity',
			transitionDuration: '600ms',
			opacity: 1
		});

		if (typeof location.latitude == 'number' && typeof location.longitude == 'number') {

			openMeteo.getWeatherForecast({
					location: location,
					temperatureUnit: temperatureUnit
				})
				.then(result => {
					setWeatherData(result);
					if (result.precipitation) {
						window.particlesJS('#' + location.id + ' .precipitation', result.particles);
					}
					if (result.atmosphere) {
						window.particlesJS('#' + location.id + ' .atmosphere', result.particlesAtmosphere);
					}
				});
		} else {
			setWeatherData({});
		}
	};

	let className = 'weather';
	if (weatherData.className) {
		className += ' ' + weatherData.className;
	}
	if (weatherData.codeString) {
		className += (weatherData.isDaylight) ? " daylight" : " nighttime";
	}

	useEffect(() => {
		fetchData();

		let refreshTimeout = setTimeout(() => {
			fetchData();
		}, 1000 * 60);

	    return () => clearTimeout(refreshTimeout);
	}, [location, temperatureUnit]);

	const getTouchDiff = (touch) => {
		if (!touch) {
			return;
		}
		const xMove = touch.clientX,
			yMove = touch.clientY,
			xDiff = xDown - xMove,
			yDiff = yDown - yMove;

		return {
			x: xDiff,
			y: yDiff,
			absX: Math.abs(xDiff),
			absY: Math.abs(yDiff)
		};
	}

	const startMoveHandler = (event) => {
		const touch = (event.touches || [])[0] || event;

		setXDown(touch.clientX);
		setYDown(touch.clientY);

		setStyle({
			left: 0
		});
	}

	const moveHandler = (event) => {
	    if (!xDown) {
	        return;
	    }

		const touch = (event.touches || [])[0] || event,
			diff = getTouchDiff(touch),
			biggestDiff = diff.absX > diff.absY ? diff.absX : diff.absY;

		if (biggestDiff < 5 && !currentGesture) {
			//event.preventDefault();
			setCurrentGesture(false);
		} else {
			if (currentGesture === 'swipe' || (!currentGesture && diff.absX > diff.absY)) {
				setCurrentGesture('swipe');

				const newStyle = {
					left: (diff.x * -1) + 'px',
					opacity: 1 - (diff.absX / window.innerWidth)
				};

				window.requestAnimationFrame(() => {
					setStyle(newStyle);
				});
			} else {
				setCurrentGesture('scroll');
			}
		}
	}

	const endMoveHandler = (event) => {
		const touch = (event.changedTouches || [])[0] || event,
			diff = getTouchDiff(touch);

		if ((diff.absX > window.innerWidth * 0.55) && currentGesture === 'swipe') {
			setRowStyle({
				height: 0,
				left: diff.x * -1,
				transitionProperty: 'height, opacity',
				transitionDuration: '300ms',
				opacity: 0
			});

			setTimeout(() => {
				removeLocationHandler(location);
			}, 300);
		} else {
			window.requestAnimationFrame(() => {
				setStyle(defaultStyle);
			});
		}

		setCurrentGesture(false);
		setXDown(false);
		setYDown(false);
	}

	const outHandler = (event) => {
		if (event.currentTarget === event.fromElement || event.clientX >= window.innerWidth || event.clientX <= 1) {
			endMoveHandler(event);
		}
	}

	return (
		<div className="row" style={rowStyle}>
			<div id={location.id} className={className} style={style} onMouseDown={startMoveHandler} onMouseMove={moveHandler} onMouseUp={endMoveHandler} onMouseOut={outHandler} onTouchStart={startMoveHandler} onTouchMove={moveHandler} onTouchEnd={endMoveHandler}>
				<div className="atmosphere"></div>
				<div className="precipitation"></div>
				<div className="info">
					<b>{ location.name  || 'Current Location' }</b>
					<h1>{ weatherData.currentTemperature || '-' }&#176; </h1>
					<h2>{(weatherData.faIcon) ? (
						<FontAwesomeIcon icon={weatherData.faIcon} />
					): (
						<FontAwesomeIcon icon="spinner" spin />
					)} { weatherData.codeString || 'Loading...' }</h2>
					<p>H:{ weatherData.highTemperature || '-' }&#176;  L:{ weatherData.lowTemperature || '-' }&#176;</p>
				</div>
			</div>
		</div>
	)
}

export default Weather;
