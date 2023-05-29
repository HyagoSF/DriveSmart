// When the user login, he is going to be redirected to the home page, and the Nav component will be rendered.
'use client';

import { Car } from 'lucide-react';

import { motion as m, useMotionValue, useDragControls } from 'framer-motion';
import { useState } from 'react';
import Stopwatch from './stopwatch';
import PopUpFuelPrice from './PopUpFuelPrice';
import PopUpEarnings from './PopUpEarnings';
import LocationTrackerWithoutCood from './LocationTrackerWithoutCood';

interface TimeDriving {
	hours?: number;
	minutes?: number;
	seconds?: number;
}

export default function HomePage() {
	// STATES
	const [isDriving, setIsDriving] = useState(false);
	const [gasPrice, setGasPrice] = useState<number | null>(null);
	const [grossEarnings, setGrossEarnings] = useState<number | null>(null);
	// const [totalKms, setTotalKms] = useState<number>(0);

	// for the location tracker
	const [totalKms, setTotalKms] = useState<number>(0);
	// const [tracking, setTracking] = useState(false);

	// create state to get track of the sending data
	const [sendingData, setSendingData] = useState(false);

	// MODALS
	// this modal is going to show when the user start drive and will ask for the fuel price
	const [showStartDriveModal, setShowStartDriveModal] = useState(false);
	// this modal is going to show when the user stop drive and will ask for the earnings of the day
	const [showStopDriveModal, setShowStopDriveModal] = useState(false);

	const [timeDriving, setTimeDriving] = useState<TimeDriving | null>({});

	const handleX = useMotionValue(0);
	const dragControls = useDragControls();

	// HANDLING THE CAR DRAG
	const handleDragEnd = (event: any, info: { offset: { x: number } }) => {
		if (info.offset.x > 112.5) {
			// if the user swipe the car at least at the middle of the screen, the car will start to drive
			setShowStartDriveModal(true);
			handleX.set(225);
		} else {
			// otherwise, the car will go back to the start position
			setIsDriving(false);
			handleX.set(0);
		}
	};

	// TODO: here is where I'm going to send the data to the database
	if (sendingData) {
		console.log({
			totalKms: totalKms,
			grossEarnings: grossEarnings,
			timeDriving: timeDriving,
			gasPrice: gasPrice,
		});
		setSendingData(false);
	}

	return (
		<main className=" ">
			{/* Content */}

			<h1 className="font-bold text-xl text-center mt-6">LET'S RIDE</h1>

			{/* Tracking option */}
			<div
				className={`${
					isDriving ? 'bg-green-500' : 'bg-white'
				} items-center mx-4 mt-2 rounded`}>
				<div className=" w-full">
					{/* THIS IS WHAT I'M CHANGING */}
					<div className="flex flex-row items-center justify-center p-2">
						{/* <div className=""> */}
						<m.div
							className={`absolute left-6 rounded-full ${
								isDriving ? 'bg-green-500' : 'bg-white'
							}`}
							drag="x"
							dragConstraints={{ left: 0, right: 225 }}
							dragControls={dragControls}
							dragElastic={0.08}
							dragTransition={{
								bounceDamping: 30,
								bounceStiffness: 800,
							}}
							onDragEnd={handleDragEnd}
							style={{ x: handleX }}>
							<Car color="black" size={36} />
						</m.div>

						{!isDriving && (
							<p className="font-bold mr-4">
								SWIPE TO START TRACK
							</p>
						)}
						{isDriving && (
							<p className="font-bold mr-4">SWIPE BACK TO STOP</p>
						)}
					</div>

					{/* TODO: MAKE THIS A DIFFERENT COMPONENT TO SHOW JUST WHEN THE USER IS DRIVING */}
				</div>
			</div>

			{/* MODALS */}
			{showStartDriveModal && (
				<PopUpFuelPrice
					setShowStartDriveModal={setShowStartDriveModal}
					setIsDriving={setIsDriving}
					gasPrice={gasPrice}
					setGasPrice={setGasPrice}
				/>
			)}

			{showStopDriveModal && (
				<PopUpEarnings
					setShowStopDriveModal={setShowStopDriveModal}
					setGrossEarnings={setGrossEarnings}
					grossEarnings={grossEarnings}
					setSendingData={setSendingData}
				/>
			)}

			{/* STOPWATCH AND LOCATION TRACKER */}
			<div className=" bg-white mx-4 rounded">
				{/* I let this isDriving inside here, because if I let this outside, the stopwatch will not be triggered and will not send me the time  */}
				{isDriving && (
					<m.p
						className="w-full text-center font-bold text-base pt-2"
						initial={{
							x: '-100%',
						}}
						animate={{
							x: '0',
						}}
						transition={{ duration: 0.5 }}>
						TRACKING ...
					</m.p>
				)}
				<div className="flex flex-row justify-center ">
					<Stopwatch
						isDriving={isDriving}
						setTimeDriving={setTimeDriving}
						setShowStopDriveModal={setShowStopDriveModal}
					/>
					{/* <LocationTracker1 isDriving={isDriving} /> */}
					<LocationTrackerWithoutCood
						isDriving={isDriving}
						totalKms={totalKms}
						setTotalKms={setTotalKms}
					/>
				</div>
			</div>

			{/* <div className=" bg-white m-2 rounded h-40">
				<h1 className="text-2xl">This week small summary</h1>
			</div> */}
		</main>
	);
}
