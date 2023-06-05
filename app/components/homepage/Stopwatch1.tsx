'use client';

import React, { useState, useEffect } from 'react';
import { motion as m } from 'framer-motion';
import usePrevious from '../../hooks/usePrevious';

export default function Stopwatch1({
	isDriving,
	setTimeDriving,
	setShowStopDriveModal,
}: {
	isDriving: Boolean;
	setTimeDriving: Function;
	setShowStopDriveModal: Function;
}) {
	const [startTime, setStartTime] = useState<number | null>(null);
	const [elapsedTime, setElapsedTime] = useState<number>(0);
	const [isRunning, setIsRunning] = useState<boolean>(false);

	useEffect(() => {
		let timerId: NodeJS.Timeout;

		// if I'm driving and I don't have a start time, then I set the start time
		if (isDriving && !startTime) {
			setStartTime(Date.now());
		}

		// if I'm driving and I have a start time, then I start the timer
		if (isDriving && startTime) {
			timerId = setInterval(() => {
				setElapsedTime(Date.now() - startTime);
			}, 1000);
		}

		// if I'm not driving and I have a start time, then I stop the timer
		if (!isDriving && startTime) {
			const timeDriving = formatTime(elapsedTime);

			// console.log(timeDriving);

			setTimeDriving(timeDriving);
			setShowStopDriveModal(true);
			setStartTime(null);
			setElapsedTime(0);
		}

		return () => clearInterval(timerId);
	}, [isDriving, startTime]);

	// function to format time
	const formatTime = (
		time: number
	): {
		hours: number;
		minutes: number;
		seconds: number;
	} => {
		const hours = Math.floor(time / 3600000);
		const minutes = Math.floor(time / 60000);
		const seconds = Math.floor((time / 1000) % 60);
		// const milliseconds = Math.floor((time % 1000) / 10);

		return {
			hours: hours,
			minutes: minutes,
			seconds: seconds,
		};
	};

	return (
		<div>
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
							{`${formatTime(elapsedTime)
								.hours.toString()
								.padStart(2, '0')}:${formatTime(elapsedTime)
								.minutes.toString()
								.padStart(2, '0')}:${formatTime(elapsedTime)
								.seconds.toString()
								.padStart(2, '0')}`}
						</p>
					</h1>
				</m.div>
			)}
		</div>
	);
}
