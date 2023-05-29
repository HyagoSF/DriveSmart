'use client';

import { useEffect, useState } from 'react';
import { motion as m } from 'framer-motion';

interface locationType {
	lat: number;
	lng: number;
}

export default function MileageTracker({
	isDriving,
	totalKms,
	setTotalKms,
}: {
	isDriving: boolean;
	totalKms: number;
	setTotalKms: Function;
}) {
	const [map, setMap] = useState(null);
	const [directionsService, setDirectionsService] =
		useState<google.maps.DirectionsService | null>(null);

	const [directionsRenderer, setDirectionsRenderer] =
		useState<google.maps.DirectionsRenderer | null>(null);

	const [startLocation, setStartLocation] = useState<locationType | null>(
		null
	);
	const [endLocation, setEndLocation] = useState<locationType | null>(null);

	// to store the user's tracked locations
	const [locations, setLocations] = useState<locationType[]>([]);

	// to store the ID of the interval used for geolocation updates
	const [intervalId, setIntervalId] = useState<any>(null);
	// this isTracking is to control isDriving inside this component without needing to change isDriving
	const [isTracking, setIsTracking] = useState(false);

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

	// useEffect to call the start and stop based on if the user is driving or not
	useEffect(() => {
		if (isDriving) {
			startTracking();
		} else {
			stopTracking();
		}
	}, [isDriving]);

	const initMap = () => {
		const mapInstance = new google.maps.Map(
			document.querySelector('#map'),
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
		if (!isTracking) {
			console.log('Starting tracking...');

			// reset the locations and totalKms when starting a new tracking session
			setLocations([]);
			setTotalKms(0);

			// Track the user's location every 10 seconds
			const id = setInterval(() => {
				navigator.geolocation.getCurrentPosition((position) => {
					const { latitude, longitude } = position.coords;
					const newLocation = { lat: +latitude, lng: +longitude };
					// console.log(locations);
					// console.log(locations.length);

					if (locations.length === 0) {
						setStartLocation(newLocation);
					}

					setLocations((prevLocations) => [
						...prevLocations,
						newLocation,
					]);
				});

				// console.log('Tracking...');

				// TODO: send request every 5 minutes, 10 seconds is just for testing
				// }, 5 * 60 * 1000); // 5 minutes
			}, 1000); //	10 seconds

			setIsTracking(true);
			setIntervalId(id);
		} else {
			console.log('is already driving, so not starting tracking');
		}
	};

	const stopTracking = () => {
		if (isTracking) {
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

			setIsTracking(false);
			setIntervalId(null);
		} else {
			console.log('is not driving, so not stopping tracking');
		}
	};

	// I'll execute this just when the user stop driving
	const handleStartTracking = () => {
		console.log('Start sending request...');

		// console.log('Start location:', startLocation);
		// console.log('End location:', endLocation);
		// console.log('Locations:', locations);
		if (startLocation && endLocation) {
			const waypts: google.maps.DirectionsWaypoint[] = [];

			const numLocations = locations.length;

			// Checking if the number of locations is equal to 25
			if (numLocations === 25 || (isTracking && numLocations > 1)) {
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
					travelMode: google.maps.TravelMode.DRIVING,
				};

				directionsService?.route(request, (result, status) => {
					if (status === 'OK') {
						directionsRenderer?.setDirections(result);
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
	const calculateDistance = (response: any) => {
		if (response.routes && response.routes.length > 0) {
			const route = response.routes[0];

			let totalKms = 0;

			for (let i = 0; i < route.legs.length; i++) {
				totalKms += route.legs[i].distance.value / 1000;
			}

			setTotalKms(+totalKms.toFixed(2));
			console.log('Total distance:', totalKms);
		} else {
			console.error('No route found.');
		}
	};

	return (
		<>
			<div
				id="map"
				style={{
					display: 'none',
					width: '100%',
					height: '400px',
				}}></div>
			{isDriving && (
				<m.div
					className="bg-white rounded  p-4"
					initial={{
						x: '-100%',
					}}
					animate={{
						x: '0',
					}}
					transition={{ duration: 0.5 }}>
					<h1 className="flex gap-4 justify-center">
						<span className="text-red-700 text-4xl">
							{totalKms} km
						</span>
					</h1>
				</m.div>
			)}
		</>
	);
}
