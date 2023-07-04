// When the user login, he is going to be redirected to the home page, and the Nav component will be rendered.
'use client';

// IMPORTING COMPONENTS
import { Car } from 'lucide-react';
import { motion as m, useMotionValue, useDragControls } from 'framer-motion';
import { useState } from 'react';

import PopUpFuelPrice from '../popups/PopUpFuelPrice';
import PopUpEarnings from '../popups/PopUpEarnings';
import LocationTracker from './LocationTracker';
import LastWorkDay from './lastworkday/LastWorkDay';

// IMPORTING TYPES
import { SessionType } from '../../types/SessionType';
// import { TimeDriving } from '../../types/TimeDriving';

import { StatisticsType, TimeDriving } from '@/app/types/StatisticsType';

// IMPORTING QUERY STUFF
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import CurrentWeek from './currentweek/CurrentWeek';
import Stopwatch1 from './Stopwatch1';

import dayjs from 'dayjs';
import DeliveryForm from '../DeliveryForm';

export default function HomePage({ session }: { session: SessionType }) {
	// STATES
	const [isDriving, setIsDriving] = useState(false);
	// create state to get track of the sending data
	const [sendingData, setSendingData] = useState(false);

	// const [carIconLocation, setCarIconLocation] = useState(0);

	// VARIABLES
	const [gasPrice, setGasPrice] = useState<number | null>(null);
	const [grossEarnings, setGrossEarnings] = useState<number | null>(null);
	const [totalKms, setTotalKms] = useState<number>(0);
	const [timeDriving, setTimeDriving] = useState<TimeDriving>({
		hours: 0,
		minutes: 0,
		seconds: 0,
	});
	const [fuelConsumption, setFuelConsumption] = useState<number | null>(null);

	// MODALS
	const [showStartDriveModal, setShowStartDriveModal] = useState(false);
	const [showStopDriveModal, setShowStopDriveModal] = useState(false);

	const handleX = useMotionValue(0);
	const dragControls = useDragControls();

	let toastPostId: string;

	// To access the client, and use the queryClient to invalidate the query ( to refetch the data when the mutation is done)
	const queryClient = useQueryClient();

	// HANDLING THE CAR DRAG
	const handleDragEnd = async (
		event: any,
		info: { offset: { x: number } }
	) => {
		if (info.offset.x > 157.5) {
			// if the user swipe the car at least at the middle of the screen, the car will start to drive
			// setCarIconLocation(315);
			// set an interval of 0.5 seconds to update the car location

			handleX.set(315);
			// setCarIconLocation((prev) => prev + 1);
			setShowStartDriveModal(true);

			// handleX.set(carIconLocation);
			// console.log(carIconLocation);
		} else {
			// otherwise, the car will go back to the start position
			// setCarIconLocation(0);
			handleX.set(0);

			// handleX.set(0);
			// setCarIconLocation((prev) => prev + 1);

			setIsDriving(false);
		}
		// // clear the interval
	};

	// SUBMIT HANDLER
	const onSubmitFormHandler = async () => {
		// setIsDisabled(true);
		// notify('Success', 'success');
		// notify('Loading...', 'loading');
		// mutate all my states
		mutate({
			totalHours: timeDriving,
			totalKms: totalKms,
			grossEarnings: grossEarnings,
			gasPrice: gasPrice,
			fuelConsumption: fuelConsumption,
		});
	};

	// NOTIFICATIONS
	const notify = (message: string, type: string) => {
		if (type === 'loading') {
			toastPostId = toast.loading(message);
			return toastPostId;
		}
		if (type === 'error') {
			return toast.error(message, { id: toastPostId });
		}
		if (type === 'success') {
			return toast.success(message, { id: toastPostId });
		}
	};

	// QUERIES
	// Create a mutation/delivery
	const { mutate } = useMutation(
		async ({
			totalHours,
			totalKms,
			grossEarnings,
			gasPrice,
			fuelConsumption,
		}: StatisticsType) => {
			await axios.post('/api/delivery/addDelivery', {
				value: {
					userEmailSession: session.user?.email,
					totalHours,
					totalKms,
					grossEarnings,
					gasPrice,
					fuelConsumption,
				},
			});
		},
		{
			onError: (err: any) => {
				const errorMessage = err?.response?.data.message;
				// notify(errorMessage);
				if (err instanceof AxiosError) {
					notify(errorMessage, 'error');
				}
				// setIsDisabled(false);
			},
			onSuccess: (data) => {
				// console.log(data);
				// const successMessage = data.data.message;
				queryClient.invalidateQueries({
					queryKey: ['delivery', 'currentWeek', 'lastWorkDay'],
				});

				// notify(successMessage, 'success');
				notify('Success', 'success');

				// Reset all the states
				setTimeDriving({ hours: 0, minutes: 0, seconds: 0 });
				setTotalKms(0);
				setGrossEarnings(0);
				setGasPrice(0);
				setFuelConsumption(0);
			},
		}
	);

	// TODO: here is where I'm going to send the data to the database
	if (sendingData) {
		// console.log({
		// 	totalKms: totalKms,
		// 	grossEarnings: grossEarnings,
		// 	timeDriving: timeDriving,
		// 	gasPrice: gasPrice,
		// 	fuelConsumption: fuelConsumption,
		// });

		onSubmitFormHandler();

		setSendingData(false);
	}

	return (
		<main className="min-h-screen">
			{/* Content */}

			{/* MODALS */}
			{showStartDriveModal && (
				<PopUpFuelPrice
					setShowStartDriveModal={setShowStartDriveModal}
					setIsDriving={setIsDriving}
					gasPrice={gasPrice}
					setGasPrice={setGasPrice}
					// setCarIconLocation={setCarIconLocation}
					handleX={handleX}
				/>
			)}

			{showStopDriveModal && (
				<PopUpEarnings
					grossEarnings={grossEarnings}
					fuelConsumption={fuelConsumption}
					setShowStopDriveModal={setShowStopDriveModal}
					setGrossEarnings={setGrossEarnings}
					setSendingData={setSendingData}
					setFuelConsumption={setFuelConsumption}
					setTotalKms={setTotalKms}
				/>
			)}

			<Toaster position="top-center" reverseOrder={false} />

			<h1 className="font-bold text-xl text-center mt-6">LET&apos;S RIDE</h1>

			{/* Tracking option */}
			<div
				className={`${
					isDriving ? 'bg-green-500' : 'bg-white'
				} items-center mx-4 mt-2 rounded`}>
				<div className="w-full">
					{/* THIS IS WHAT I'M CHANGING */}
					<div className="flex flex-row items-center justify-center p-2 h-20	">
						<m.div
							className={`absolute left-6 rounded-full z-10 ${
								isDriving ? 'bg-green-500' : 'bg-white'
							}`}
							drag="x"
							dragConstraints={{ left: 0, right: 315 }}
							dragControls={dragControls}
							dragElastic={0.08}
							dragTransition={{
								bounceDamping: 30,
								bounceStiffness: 800,
							}}
							onDragEnd={handleDragEnd}
							style={{ x: handleX, touchAction: 'none' }}>
							<Car color="black" size={80} />
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
				</div>
			</div>

			{/* if is not driving show the option to add values manually */}
			{!isDriving && <DeliveryForm />}

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
					{/* <Stopwatch
						isDriving={isDriving}
						setTimeDriving={setTimeDriving}
						setShowStopDriveModal={setShowStopDriveModal}
					/> */}

					<Stopwatch1
						isDriving={isDriving}
						setTimeDriving={setTimeDriving}
						setShowStopDriveModal={setShowStopDriveModal}
					/>
					{/* <LocationTracker1 isDriving={isDriving} /> */}
					{/* <LocationTracker
						isDriving={isDriving}
						totalKms={totalKms}
						setTotalKms={setTotalKms}
					/> */}
				</div>
			</div>

			{/* <div className=" bg-white m-2 rounded h-40">
				<h1 className="text-2xl">This week small summary</h1>
			</div> */}

			<h1 className="font-bold text-center mt-12">
				YOUR PREVIOUS TRACKS:
			</h1>

			<LastWorkDay />

			<CurrentWeek />
		</main>
	);
}
