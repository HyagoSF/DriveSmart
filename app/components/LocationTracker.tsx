'use client';

import { useEffect, useState } from 'react';

const coordinates = [
	{ lat: 43.629, lng: -79.489 },
	{ lat: 43.624, lng: -79.515 },
	{ lat: 43.639, lng: -79.521 },
];

interface locationType {
	lat: number;
	lng: number;
}

export default function MileageTracker() {
	const [map, setMap] = useState(null);
	const [directionsService, setDirectionsService] = useState(null);
	const [directionsRenderer, setDirectionsRenderer] = useState(null);
	const [startLocation, setStartLocation] = useState<locationType>({
		lat: 43.629,
		lng: -79.489,
	});
	const [endLocation, setEndLocation] = useState<locationType | null>(null);
	const [distance, setDistance] = useState(0);
	const [trackedLocations, setTrackedLocations] = useState<locationType[]>(
		[]
	);

	const mapOptions = {
		center: { lat: 43.629, lng: -79.489 },
		zoom: 10,
	};

	// This will run just once
	useEffect(() => {
		const mapScript = document.createElement('script');
		mapScript.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyCpMEKoIbnf0FIGlcl9-mM8WyNeCfJB7Js&libraries=places`;

		mapScript.onload = initMap;
		document.head.appendChild(mapScript);

		return () => {
			document.head.removeChild(mapScript);
		};
	}, []);

	// This will run every time the trackedLocations array changes
	useEffect(() => {
		if (trackedLocations.length === coordinates.length) {
			setEndLocation(trackedLocations[trackedLocations.length - 1]);
			handleStartTracking();
		}
	}, [trackedLocations]);

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
			startTracking();
		} else {
			console.error('Geolocation is not supported by this browser.');
		}
	};

	// const startTracking = () => {
	// 	if (tracking) {
	// 		setInterval(() => {
	// 			navigator.geolocation.getCurrentPosition((position) => {
	// 				const { latitude, longitude } = position.coords;
	// 				const newLocation = { lat: latitude, lng: longitude };

	// 				setTrackedLocations((prevLocations) => [
	// 					...prevLocations,
	// 					newLocation,
	// 				]);

	// 				if (trackedLocations.length === 10) {
	// 					handleStartTracking();
	// 				}
	// 			});
	// 		}, 10000);
	// 	}
	// };

	const startTracking = () => {
		let currentIndex = 0;
		const intervalId = setInterval(() => {
			const currentCoordinate = coordinates[currentIndex];

			const newLocation = {
				lat: currentCoordinate.lat,
				lng: currentCoordinate.lng,
			};
			setTrackedLocations((prevLocations) => [
				...prevLocations,
				newLocation,
			]);

			console.log(currentIndex);
			console.log(coordinates.length - 1);

			// just run this until the end of the array coordinates
			if (currentIndex === coordinates.length - 1) {
				setEndLocation(newLocation);
				clearInterval(intervalId); // stop the interval
			}

			currentIndex++;
		}, 50000);
	};

	const calculateDistance = (response) => {
		if (response.routes && response.routes.length > 0) {
			const leg = response.routes[0].legs[0];
			setDistance((prevDistance) => prevDistance + leg.distance.value);
			console.log('Driven distance:', leg.distance.text);
		} else {
			console.error('No route found.');
		}
	};

	const handleStartTracking = () => {
		console.log('end location: ', endLocation);

		if (startLocation && endLocation) {
			const request = {
				origin: startLocation,
				destination: endLocation,
				waypoints: trackedLocations.slice(1, -1).map((location) => ({
					location: new google.maps.LatLng(
						location.lat,
						location.lng
					),
				})),
				travelMode: 'DRIVING',
			};

			directionsService.route(request, (result, status) => {
				if (status === 'OK') {
					directionsRenderer.setDirections(result);
					calculateDistance(result);
					setStartLocation(trackedLocations.slice(-1)[0]);
					setTrackedLocations([]);
				} else {
					console.error('Directions request failed:', status);
				}
			});
		} else {
			console.error(
				'Start and end locations are required, and  tracked locations are needed.'
			);
		}
	};

	return (
		<div>
			<div id="map" style={{ width: '0%', height: '400px' }}></div>

			<div>Distance: {distance} meters</div>
		</div>
	);
}
