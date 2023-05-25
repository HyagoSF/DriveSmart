'use client';

import { clear } from 'console';
import { useEffect, useState } from 'react';
import { start } from 'repl';

interface locationType {
	lat: number;
	lng: number;
}

export default function MileageTracker() {
	const [map, setMap] = useState(null);
	const [directionsService, setDirectionsService] =
		useState<google.maps.DirectionsService>(null);

	const [directionsRenderer, setDirectionsRenderer] =
		useState<google.maps.DirectionsRenderer>(null);

	const [startLocation, setStartLocation] = useState<locationType | null>(
		null
	);
	const [endLocation, setEndLocation] = useState<locationType | null>(null);
	const [distance, setDistance] = useState(0);
	// const [trackedLocations, setTrackedLocations] = useState<locationType[]>(
	// 	[]
	// );

	// to store the user's tracked locations
	const [locations, setLocations] = useState<locationType[]>([]);
	// track whether the user is tracking or not
	const [tracking, setTracking] = useState(false);
	// to store the ID of the interval used for geolocation updates
	const [intervalId, setIntervalId] = useState<NodeJS.Timer | null>(null);

	const mapOptions = {
		center: { lat: 43.629, lng: -79.489 },
		zoom: 10,
	};

	// This will run just once
	useEffect(() => {
		const mapScript = document.createElement('script');
		// mapScript.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.GOOGLE_MAPS_API_KEY}&libraries=places`;
		mapScript.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyCpMEKoIbnf0FIGlcl9-mM8WyNeCfJB7Js&libraries=places`;

		mapScript.onload = initMap;
		document.head.appendChild(mapScript);

		return () => {
			document.head.removeChild(mapScript);
		};
	}, []);

	// This will run every time the locations array changes
	useEffect(() => {
		if (locations.length > 1) {
			setEndLocation(locations[locations.length - 1]);
			if (locations.length === 25) {
				handleStartTracking();
			}
		}
	}, [locations]);

	const initMap = () => {
		const mapInstance = new google.maps.Map(
			document.getElementById('map'),
			mapOptions
		);
		setMap(mapInstance);
		setDirectionsService(new google.maps.DirectionsService());
		setDirectionsRenderer(
			new google.maps.DirectionsRenderer({ map: mapInstance })
		);

		if (navigator.geolocation) {
			console.log('Geolocation is supported!');
			// startTracking();
		} else {
			console.error('Geolocation is not supported by this browser.');
		}
	};

	const startTracking = () => {
		if (!tracking) {
			console.log('Starting tracking...');

			// reset the locations and distance when starting a new tracking session
			setLocations([]);
			setDistance(0);

			// Track the user's location every 10 seconds
			const id = setInterval(() => {
				navigator.geolocation.getCurrentPosition((position) => {
					const { latitude, longitude } = position.coords;
					const newLocation = { lat: +latitude, lng: +longitude };

					if (locations.length === 0) {
						setStartLocation(newLocation);
					}

					setLocations((prevLocations) => [
						...prevLocations,
						newLocation,
					]);
				});

				console.log('Tracking...');
				// }, 5 * 60 * 1000); // 5 minutes
			}, 10000); //	10 seconds

			setTracking(true);
			setIntervalId(id);
		}
	};

	const stopTracking = () => {
		if (tracking) {
			console.log('Stopping tracking...');

			clearInterval(intervalId);

			// Get the user's current location and add it to the locations array
			navigator.geolocation.getCurrentPosition((position) => {
				const { latitude, longitude } = position.coords;
				const newLocation = { lat: +latitude, lng: +longitude };

				setLocations((prevLocations) => [
					...prevLocations,
					newLocation,
				]);

				// Send the request if there are at least 2 locations
				if (locations.length > 1) {
					setEndLocation(newLocation);
					handleStartTracking();
				}
			});

			setTracking(false);
			setIntervalId(null);
		}
	};

	const handleStartTracking = () => {
		console.log('Start sending request...');

		// console.log('Start location:', startLocation);
		// console.log('End location:', endLocation);
		// console.log('Locations:', locations);
		if (startLocation && endLocation) {
			// to make waypoints work ✅

			const waypts: google.maps.DirectionsWaypoint[] = [];

			const numLocations = locations.length;

			// Checking if the number of locations is equal to 25
			if (numLocations === 25 || (tracking && numLocations > 1)) {
				// for loop to ignore the first and last location(just get the waypoints)
				for (let i = 1; i < numLocations - 1; i++) {
					waypts.push({
						location: locations[i],
						stopover: true,
					});
				}

				const request = {
					origin: startLocation,
					destination: endLocation,
					waypoints: waypts,
					travelMode: 'DRIVING',
				};

				directionsService.route(request, (result, status) => {
					if (status === 'OK') {
						directionsRenderer.setDirections(result);
						// console.log(result);
						calculateDistance(result);

						setStartLocation(locations[locations.length - 1]);

						setLocations([]);

						// just to see the next start location
						// console.log(startLocation);
					} else {
						console.error('Directions request failed:', status);
					}
				});
			} else {
				console.error('Not enough locations to send request or ');
			}
		} else {
			console.error(
				'Start and end locations are required, and  tracked locations are needed.'
			);
		}
	};

	// calculate the distance total ✅
	const calculateDistance = (response) => {
		if (response.routes && response.routes.length > 0) {
			const route = response.routes[0];

			let totalDistance = 0;

			for (let i = 0; i < route.legs.length; i++) {
				totalDistance += route.legs[i].distance.value / 1000;
			}

			setDistance(totalDistance);
			console.log('Total distance:', totalDistance);
		} else {
			console.error('No route found.');
		}
	};

	return (
		<div>
			<div id="map" style={{ width: '100%', height: '400px' }}></div>

			<button onClick={startTracking}>Start Tracking</button>
			<button onClick={stopTracking}>Stop Tracking</button>

			<div>Distance: {distance.toFixed(2)} Km</div>
		</div>
	);
}
