import { motion as m } from 'framer-motion';
import React, { useState, useEffect } from 'react';
import usePrevious from '../../hooks/usePrevious';

const Stopwatch = ({
	isDriving,
	setTimeDriving,
	setShowStopDriveModal,
}: {
	isDriving: Boolean;
	setTimeDriving: Function;
	setShowStopDriveModal: Function;
}) => {
	// state to store time
	const [time, setTime] = useState(0);

	const prevIsDriving = usePrevious(isDriving);

	useEffect(() => {
		let intervalId: NodeJS.Timeout;
		if (isDriving) {
			// setting time from 0 to 1 every 10 milisecond using javascript setInterval method
			intervalId = setInterval(() => setTime(time + 1), 10);
		}
		return () => clearInterval(intervalId);
	}, [isDriving, time]);

	// Hours calculation
	const hours = Math.floor(time / 360000);

	// Minutes calculation
	const minutes = Math.floor((time % 360000) / 6000);

	// Seconds calculation
	const seconds = Math.floor((time % 6000) / 100);

	// Milliseconds calculation
	const milliseconds = time % 100;

	useEffect(() => {
		if (!isDriving && prevIsDriving) {
			// 		// sum up the time, hour+minute+second+millisecond and then console log it
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
							{seconds.toString().padStart(2, '0')}:
							<span className="text-base">
								{milliseconds.toString().padStart(2, '0')}
							</span>
						</p>
					</h1>
				</m.div>
			)}
		</>
	);
};

export default Stopwatch;
