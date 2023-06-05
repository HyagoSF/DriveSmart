'use client';

import { motion as m } from 'framer-motion';
import { Fuel, AlertTriangle, Banknote } from 'lucide-react';
import { useState } from 'react';

export default function PopUpEarnings({
	grossEarnings,
	fuelConsumption,
	setShowStopDriveModal,
	setGrossEarnings,
	setSendingData,
	setFuelConsumption,
}: {
	fuelConsumption: number | null;
	grossEarnings: number | null;
	setShowStopDriveModal: Function;
	setGrossEarnings: Function;
	setSendingData: Function;
	setFuelConsumption: Function;
}) {
	const initial = {
		opacity: 0,
		scale: 0.5,
	};

	const animate = {
		opacity: 1,
		scale: 1,
	};

	const handleGrossEarningsChange = (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		setGrossEarnings(+event.target.value);
	};

	const handleFuelConsumptionChange = (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		setFuelConsumption(+event.target.value);
	};

	const handleEarnings = () => {
		if (!grossEarnings || !fuelConsumption) {
			alert('Please enter your earnings and fuel consumption');
			return;
		}

		setSendingData(true);
		setShowStopDriveModal(false);
	};

	return (
		<m.div
			initial={initial}
			animate={animate}
			transition={{ duration: 0.2 }}
			className=" fixed w-full h-full z-30 backdrop-blur-md left-0 -mt-24 pt-44 rounded-sm ">
			{/* basically centering the modal */}
			<div className="bg-white m-2 flex flex-col items-center gap-2 rounded-lg">
				<div className="bg-black flex justify-between items-center w-full text-sm px-2 py-1 rounded-t-lg">
					<div className="flex items-center ">
						<AlertTriangle size={32} className="text-white" />
						<h2 className="text-white">EARNINGS INFORMATION</h2>
					</div>
				</div>

				<Banknote size={64} className="text-green-600" />

				<h1 className="text-lg font-bold text-gray-700 mx-4">
					PLEASE FILL IN
					<span className="text-green-600">
						{' '}
						HOW MUCH DID YOU EARN TODAY
					</span>
				</h1>

				<input
					className="appearance-none block  bg-white text-gray-700 border border-gray-200 rounded py-2 px-4  leading-tight focus:outline-none focus:bg-gray-200"
					id="gross_earnings"
					name="gross_earnings"
					onChange={handleGrossEarningsChange}
					type="number"
					step="0.01"
					placeholder="Enter your earnings"
					required
				/>

				<h1 className=" font-bold text-gray-700 mx-4">
					LITERS OF GAS PER 100 KM USED
				</h1>

				<input
					className="appearance-none block  bg-white text-gray-700 border border-gray-200 rounded py-2 px-4  leading-tight focus:outline-none focus:bg-gray-200"
					id="gross_earnings"
					name="gross_earnings"
					onChange={handleFuelConsumptionChange}
					type="number"
					step="0.01"
					placeholder="Fuel Consumption"
					required
				/>

				<button
					className=" text-lg w-32 bg-black text-white rounded-lg hover:text-white my-4 px-2 py-1"
					onClick={handleEarnings}>
					Save
				</button>
			</div>
		</m.div>
	);
}
