'use client';

import { motion as m } from 'framer-motion';
import React, { useState, useEffect } from 'react';

interface Position {
	latitude: number;
	longitude: number;
}

export default function LocationTracker1({
	isDriving,
}: {
	isDriving: boolean;
}) {
	const [position, setPosition] = useState<Position | null>(null);
	const [distance, setDistance] = useState<number>(0);

	const calculateDistance = (
		lat1: number,
		lon1: number,
		lat2: number,
		lon2: number
	): number => {
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
		if (isDriving) {
			const watchId = navigator.geolocation.watchPosition(
				(position) => {
					if (position.coords) {
						if (position.coords.accuracy < 100) {
							if (position.coords.speed > 0) {
								if (position.timestamp > 0) {
									if (
										position.coords.latitude !==
										position.coords.longitude
									) {
										if (
											position.coords.latitude !== null &&
											position.coords.longitude !== null
										) {
											if (
												position.coords.latitude !==
													undefined &&
												position.coords.longitude !==
													undefined
											) {
												if (
													position.coords.latitude !==
														0 &&
													position.coords
														.longitude !== 0
												) {
													if (
														!Number.isNaN(
															position.coords
																.latitude
														) &&
														!Number.isNaN(
															position.coords
																.longitude
														)
													) {
														if (
															position.coords
																.latitude !==
																Infinity &&
															position.coords
																.longitude !==
																Infinity
														) {
															if (
																position.coords
																	.latitude !==
																	-Infinity &&
																position.coords
																	.longitude !==
																	-Infinity
															) {
																if (
																	position
																		.coords
																		.latitude !==
																		0.0 &&
																	position
																		.coords
																		.longitude !==
																		0.0
																) {
																	const {
																		latitude,
																		longitude,
																	} =
																		position.coords;
																	if (
																		!position
																			.coords
																			.heading &&
																		!position
																			.coords
																			.altitude
																	) {
																		setPosition(
																			{
																				latitude,
																				longitude,
																			}
																		);
																	}
																}
															}
														}
													}
												}
											}
										}
									}
								}
							}
						}
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
		}
	}, [isDriving]);

	useEffect(() => {
		if (position) {
			const { latitude: lat1, longitude: lon1 } = position;
			const intervalId = setInterval(() => {
				navigator.geolocation.getCurrentPosition(
					(position) => {
						if (position.coords) {
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
						maximumAge: 0, // force getCurrentPosition to get the most recent position
					}
				);
			}, 10000); // update distance every 10 seconds
			return () => {
				clearInterval(intervalId);
			};
		}
	}, [position]);

	return (
		<>
			{isDriving && (
				<m.div
					className="bg-white rounded  p-4 min-h-screen"
					initial={{
						x: '-100%',
					}}
					animate={{
						x: '0',
					}}
					transition={{ duration: 0.5 }}>
					<h1 className="flex gap-4 justify-center">
						<span className="text-red-700 text-4xl">
							{distance} km
						</span>
					</h1>
					{/* <h1 className="flex gap-4 justify-center">
						My Current location:{' '}
						{position?.latitude
							? position?.latitude
							: 'no latitude found'}
						,
						{position?.longitude
							? position?.longitude
							: 'no longitude found'}
					</h1> */}
				</m.div>
			)}
		</>
	);
}
