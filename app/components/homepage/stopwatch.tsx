'use client';

import { motion as m } from 'framer-motion';
import React, { useState, useEffect } from 'react';
import usePrevious from '../../hooks/usePrevious';
import axios from 'axios';

export default function Stopwatch({
	isDriving,
	setTimeDriving,
	setShowStopDriveModal,
}: {
	isDriving: Boolean;
	setTimeDriving: Function;
	setShowStopDriveModal: Function;
}) {
	// state to store time
	const [time, setTime] = useState(0);
	const prevIsDriving = usePrevious(isDriving);

	// my time is in seconds, so I need to convert it to hours, minutes and seconds
	const hours = Math.floor(time / 3600);
	const minutes = Math.floor((time % 3600) / 60);
	const seconds = Math.floor((time % 3600) % 60);

	const startTimer = async () => {
		await axios.post('/api/timer/timer').then((res) => {
			if (res.status === 200) {
				console.log('Timer started');
			}
		});
	};

	const stopTimer = async () => {
		await axios.delete('/api/timer/timer').then((res) => {
			console.log('total time driven: ' + res.data.time);

			if (res.status === 200) {
				console.log('Timer stopped');
			}
		});
	};

	useEffect(() => {
		if (isDriving) {
			startTimer();
			console.log('Timer started');
		}

		// If I was driving and now I'm not, then I want to sum up the time and console log it
		if (!isDriving && prevIsDriving) {
			// here is where I'm gonna fetch the time from the server

			stopTimer();
			console.log('Timer stopped');

			console.log(`Driving time: ${hours}h:${minutes}m:${seconds}s`);
			setTimeDriving({
				hours: hours,
				minutes: minutes,
				seconds: seconds,
			});
			setTime(0);

			// Changing the state here will trigger the PopUpEarnings component when I stop driving
			setShowStopDriveModal(true);
		}
	}, [isDriving]);

	// Fetching the time from the server
	useEffect(() => {
		const fetchTime = async () => {
			await axios.get('/api/timer/timer').then((res) => {
				setTime(res.data.time);
			});
		};

		const intervalId = setInterval(fetchTime, 1000);

		return () => {
			clearInterval(intervalId);
		};
	}, []);

	return (
		<>
			{isDriving && (
				<m.div
					className="bg-white rounded p-4"
					initial={{
						x: '-100%',
					}}
					animate={{
						x: '0',
					}}
					transition={{ duration: 0.5 }}>
					<h1 className="flex gap-4 justify-center">
						<p className="text-4xl text-yellow-600">
							{hours}:{minutes.toString().padStart(2, '0')}:
							{seconds.toString().padStart(2, '0')}
						</p>
					</h1>
				</m.div>
			)}
		</>
	);
}
