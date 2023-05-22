// 'use client';

// import { start } from 'repl';
// import React, { useEffect, useState } from 'react';
// import Link from 'next/link';

// export default function Tracking() {
// 	let watchId: any = null;
// 	let startPosition: any = null;
// 	let totalDistance = 0;
// 	let startTime: any = null;
// 	const [location, setLocation] = useState({ lat: 0, lon: 0 });

// 	function showMeMyLocation() {
// 		navigator.geolocation.getCurrentPosition(
// 			function (position) {
// 				setLocation({
// 					lat: position.coords.latitude,
// 					lon: position.coords.longitude,
// 				});
// 				console.log('Latitude is :', position.coords.latitude);
// 				console.log('Longitude is :', position.coords.longitude);
// 			},
// 			function (error) {
// 				console.error(
// 					'Error Code = ' + error.code + ' - ' + error.message
// 				);
// 			}
// 		);
// 	}

// 	// keep track of the distance every 10 seconds
// 	useEffect(() => {
// 		const intervalId = setInterval(() => {
// 			if (watchId) {
// 				navigator.geolocation.getCurrentPosition(
// 					function (position) {
// 						if (
// 							position.coords &&
// 							position.coords.latitude !== 0 &&
// 							position.coords.longitude !== 0 &&
// 							!isNaN(position.coords.latitude) &&
// 							!isNaN(position.coords.longitude) &&
// 							position.coords.latitude !== Infinity &&
// 							position.coords.longitude !== Infinity &&
// 							position.coords.latitude !== -Infinity &&
// 							position.coords.latitude !== 0.0 &&
// 							position.coords.longitude !== 0.0 &&
// 							!position.coords.heading &&
// 							!position.coords.altitude
// 						) {
// 							const { latitude, longitude } = position.coords;
// 							setLocation({ lat: latitude, lon: longitude });
// 						}
// 					},
// 					function (error) {
// 						console.log(error);
// 					},
// 					{
// 						enableHighAccuracy: true,
// 						timeout: 20000,
// 						maximumAge: 1000,
// 						// distanceFilter: 10,  minimum distance (in meters) between updates
// 					}
// 				);
// 			}
// 		}, 10000); // update distance every 10 seconds

// 		return () => {
// 			clearInterval(intervalId);
// 		};
// 	}, []);

// 	function startTracking() {
// 		startPosition = null;
// 		totalDistance = 0;
// 		startTime = null;
// 		console.log('Starting counting distance and time');
// 		watchId = navigator.geolocation.watchPosition(
// 			function (position) {
// 				if (!startPosition) {
// 					startPosition = position;
// 					startTime = new Date().getTime();
// 				} else {
// 					const distance = getDistanceFromLatLonInKm(
// 						startPosition.coords.latitude,
// 						startPosition.coords.longitude,
// 						position.coords.latitude,
// 						position.coords.longitude
// 					);
// 					totalDistance += distance;
// 					startPosition = position;
// 				}
// 			},
// 			function (error) {
// 				console.error(error);
// 			},
// 			{
// 				enableHighAccuracy: true,
// 				maximumAge: 0,
// 				timeout: 5000,
// 			}
// 		);

// 		// console.log(startTime);
// 	}

// 	function stopTracking() {
// 		navigator.geolocation.clearWatch(watchId);
// 		watchId = null;
// 		const endTime = new Date().getTime();
// 		const hours = (endTime - startTime) / (1000 * 60 * 60);
// 		const minutes = Math.floor(hours * 60);
// 		const seconds = Math.floor((hours * 60 - minutes) * 60);
// 		console.log(
// 			`You drove ${totalDistance.toFixed(
// 				2
// 			)} kilometers in ${hours.toFixed(
// 				2
// 			)} hours, ${minutes} minutes and ${seconds} seconds.`
// 		);
// 	}

// 	function getDistanceFromLatLonInKm(
// 		lat1: any,
// 		lon1: number,
// 		lat2: number,
// 		lon2: number
// 	) {
// 		const earthRadiusKm = 6371;
// 		const dLat = deg2rad(lat2 - lat1);
// 		const dLon = deg2rad(lon2 - lon1);
// 		const a =
// 			Math.sin(dLat / 2) * Math.sin(dLat / 2) +
// 			Math.cos(deg2rad(lat1)) *
// 				Math.cos(deg2rad(lat2)) *
// 				Math.sin(dLon / 2) *
// 				Math.sin(dLon / 2);
// 		const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
// 		const distance = earthRadiusKm * c;
// 		return distance;
// 	}

// 	function deg2rad(deg: any) {
// 		return deg * (Math.PI / 180);
// 	}

// 	const Button = ({ onClick, className, children }) => (
// 		<button onClick={onClick} className={className}>
// 			{children}
// 		</button>
// 	);

// 	return (
// 		<div className="">
// 			<h1>
// 				This is how many km you walked:
// 				{totalDistance.toFixed(2)}
// 			</h1>

// 			<div className="">
// 				<h1>
// 					Your current location is:
// 					{location.lat}, {location.lon}
// 				</h1>
// 			</div>

// 			{/* Create buttons to start tracking */}
// 			<Button onClick={startTracking} className={''}>
// 				Start
// 			</Button>
// 			<Button onClick={stopTracking} className={`ml-10`}>
// 				Stop
// 			</Button>
// 			<Button onClick={showMeMyLocation} className={`ml-10`}>
// 				Give me my current location
// 			</Button>
// 		</div>
// 	);
// }

// // 'use client';

// // import { start } from 'repl';
// // import React, { useState } from 'react';
// // import Link from 'next/link';
// // import LocationTracker1 from '../components/LocationTracker1';

// // export default function Tracking() {
// // 	return <LocationTracker1 isDriving={true} />;
// // }
