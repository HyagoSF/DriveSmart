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

import DeliveryForm from '../DeliveryForm';

import Image from 'next/image';
import TrackButton from '../../images/home/TrackButton.png';
import ManuallyButton from '../../images/home/ManuallyButton.png';
import PopUpAddManually from '../popups/PopUpAddManually';

export default function HomePage({ session }: { session: SessionType }) {
	// STATES
	const [isDriving, setIsDriving] = useState(false);
	// create state to get track of the sending data
	const [sendingData, setSendingData] = useState(false);

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
	const [showAddManuallyModal, setShowAddManuallyModal] = useState(false);

	// const handleX = useMotionValue(0);

	let toastPostId: string;

	// To access the client, and use the queryClient to invalidate the query ( to refetch the data when the mutation is done)
	const queryClient = useQueryClient();

	// handling the button click to start track
	const handleTrackToggle = () => {
		if (isDriving) {
			setIsDriving(false);
		}

		if (!isDriving) {
			setShowStartDriveModal(true);
		}
	};

	//handle add manually button
	const handleAddManually = () => {
		setShowAddManuallyModal(true);
	};

	// SUBMIT HANDLER
	const onSubmitFormHandler = async () => {
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

	if (sendingData) {
		onSubmitFormHandler();
		setSendingData(false);
	}

	return (
		<main className={` min-h-screen `}>
			{showStartDriveModal && (
				<PopUpFuelPrice
					setShowStartDriveModal={setShowStartDriveModal}
					setIsDriving={setIsDriving}
					gasPrice={gasPrice}
					setGasPrice={setGasPrice}
					// setCarIconLocation={setCarIconLocation}
					// handleX={handleX}
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

			{showAddManuallyModal && (
				<PopUpAddManually
					setShowAddManuallyModal={setShowAddManuallyModal}
				/>
			)}

			<Toaster position="top-center" reverseOrder={false} />

			{/* <h1 className="font-bold text-xl text-center mt-6">
				LET&apos;S RIDE
			</h1> */}

			{/* NEW TRACKING */}
			{!isDriving && (
				<div className=" mt-8 h-40 flex justify-end sm:justify-center md:justify-center items-center gap-2 ">
					<Image
						src={TrackButton}
						alt="TrackButton"
						width={200}
						height={200}
						className="rounded-full"
						onClick={handleTrackToggle}
					/>
					<div
						className="flex flex-col justify-end items-center h-full pr-2"
						onClick={handleAddManually}>
						<span className="text-xs">SET MANUALLY</span>
						<Image
							src={ManuallyButton}
							alt="ManuallyButton"
							width={50}
							height={50}
							className="rounded-full"
						/>
					</div>
				</div>
			)}

			{isDriving && (
				<button onClick={handleTrackToggle}> STOP TRACK </button>
			)}

			{/* if is not driving show the option to add values manually */}
			{/* {!isDriving && <DeliveryForm />}  */}

			{/* STOPWATCH AND LOCATION TRACKER */}
			<div className=" bg-white mx-4 rounded">
				{/* I let this isDriving inside here, because if I let this outside, the stopwatch will not be triggered and will not send me the time  */}
				{isDriving && (
					<m.div
						initial={{
							x: '-100%',
						}}
						animate={{
							x: '0',
						}}
						transition={{ duration: 0.5 }}>
						<p className="w-full text-center font-bold text-base pt-2">
							TRACKING ...
						</p>

						<Stopwatch1
							isDriving={isDriving}
							setTimeDriving={setTimeDriving}
							setShowStopDriveModal={setShowStopDriveModal}
						/>
					</m.div>
				)}
			</div>

			<h1 className="font-bold text-center mt-12">
				YOUR PREVIOUS TRACKS:
			</h1>

			<LastWorkDay />

			<CurrentWeek />
		</main>
	);
}
