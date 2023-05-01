import React, { useState, useEffect } from 'react';

const LocationTracker = () => {
	const [position, setPosition] = useState(null);
	const [distance, setDistance] = useState(0);

	const calculateDistance = (lat1, lon1, lat2, lon2) => {
		const R = 6371e3; // radius of the earth in meters
		const phi1 = lat1 * (Math.PI / 180);
		const phi2 = lat2 * (Math.PI / 180);
		const deltaPhi = (lat2 - lat1) * (Math.PI / 180);
		const deltaLambda = (lon2 - lon1) * (Math.PI / 180);

		const a =
			Math.sin(deltaPhi / 2) * Math.sin(deltaPhi / 2) +
			Math.cos(phi1) *
				Math.cos(phi2) *
				Math.sin(deltaLambda / 2) *
				Math.sin(deltaLambda / 2);
		const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
		return R * c;
	};

	useEffect(() => {
		const watchId = navigator.geolocation.watchPosition(
			(position) => {
				if (
					position.coords &&
					position.coords.accuracy < 100 &&
					position.coords.speed? > 0 &&
					position.timestamp > 0 &&
					position.coords.latitude !== position.coords.longitude &&
					position.coords.latitude !== null &&
					position.coords.longitude !== null &&
					position.coords.latitude !== undefined &&
					position.coords.longitude !== undefined &&
					position.coords.latitude !== 0 &&
					position.coords.longitude !== 0 &&
					!isNaN(position.coords.latitude) &&
					!isNaN(position.coords.longitude) &&
					position.coords.latitude !== Infinity &&
					position.coords.longitude !== Infinity &&
					position.coords.latitude !== -Infinity &&
					position.coords.latitude !== 0.0 &&
					position.coords.longitude !== 0.0 &&
					!position.coords.heading &&
					!position.coords.altitude
				) {
					const { latitude, longitude } = position.coords;
					setPosition({ latitude, longitude });
				}
			},
			(error) => {
				console.log(error);
			},
			{
				enableHighAccuracy: true,
				timeout: 20000,
				maximumAge: 1000,
				distanceFilter: 10, // minimum distance (in meters) between updates
			}
		);

		return () => {
			navigator.geolocation.clearWatch(watchId);
		};
	}, []);

	useEffect(() => {
		if (position) {
			const { latitude: lat1, longitude: lon1 } = position;
			const intervalId = setInterval(() => {
				navigator.geolocation.getCurrentPosition(
					(position) => {
						if (
							position.coords &&
							!isNaN(position.coords.latitude) &&
							!isNaN(position.coords.longitude)
						) {
							const { latitude: lat2, longitude: lon2 } =
								position.coords;
							const d = calculateDistance(lat1, lon1, lat2, lon2);
							setDistance((prevDistance) => prevDistance + d);
							setPosition({ latitude: lat2, longitude: lon2 });
						}
					},
					(error) => {
						console.log(error);
					},
					{
						enableHighAccuracy: true,
						timeout: 20000,
						maximumAge: 100,
					}
				);
			}, 10000); // update distance every 10 seconds

			return () => {
				clearInterval(intervalId);
			};
		}
	}, [position]);

	const handleSaveDistance = async () => {
		// send distance to server to save in database
		const response = await fetch('/api/save-distance', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ distance }),
		});
		if (response.ok) {
			console.log('Distance saved successfully');
		} else {
			console.log('Error saving distance');
		}
	};

	return (
		<div>
			<p>Distance traveled: {distance} meters</p>
			<button onClick={handleSaveDistance}>Save distance</button>
		</div>
	);
};
export default LocationTracker;
