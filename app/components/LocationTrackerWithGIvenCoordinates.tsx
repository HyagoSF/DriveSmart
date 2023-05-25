'use client';

import { useEffect, useState } from 'react';

const coordinates = [
	{
		lat: 43.629,
		lng: -79.489,
	},
	{
		lat: 43.624,
		lng: -79.515,
	},
	{
		lat: 43.639,
		lng: -79.521,
	},
	{
		lat: 43.66,
		lng: -79.388,
	},
	{
		lat: 43.653,
		lng: -79.383,
	},
	{
		lat: 43.704,
		lng: -79.397,
	},
];

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
		// mapScript.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.GOOGLE_MAPS_API_KEY}&libraries=places`;
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

	// this is the original function to track the location

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

			// just run this until the end of the array coordinates
			if (currentIndex === coordinates.length - 1) {
				setEndLocation(newLocation);
				clearInterval(intervalId); // stop the interval when the end of the array is reached
			}

			currentIndex++;
		}, 50);
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

			// // For each route, get the distance and add to distance hook.
			// for (let i = 0; i < route.legs.length; i++) {
			// 	const routeSegment = i + 1;

			// 	console.log(
			// 		`Route ${routeSegment}: ${route.legs[i].distance.text} meters`
			// 	);

			// 	setDistance(
			// 		(prevDistance) =>
			// 			prevDistance + route.legs[i].distance.value / 1000
			// 	);
			// }
		} else {
			console.error('No route found.');
		}
	};

	const handleStartTracking = () => {
		if (startLocation && endLocation) {
			// to make waypoints work ✅

			const waypts: google.maps.DirectionsWaypoint[] = [];

			// for loop to ignore the first and last location(just get the waypoints)
			for (let i = 1; i < trackedLocations.length - 1; i++) {
				waypts.push({
					location: trackedLocations[i],
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
					setStartLocation(trackedLocations.slice(-1)[0]);
					setTrackedLocations([]);

					// just to see the next start location
					// console.log(startLocation);
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
			<div id="map" style={{ width: '100%', height: '400px' }}></div>

			<div>Distance: {distance.toFixed(2)} meters</div>
		</div>
	);
}
