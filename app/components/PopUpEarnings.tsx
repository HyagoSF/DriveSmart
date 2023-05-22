'use client';

import { motion as m } from 'framer-motion';
import { Fuel, AlertTriangle, Banknote } from 'lucide-react';
import { useState } from 'react';

export default function PopUpEarnings({
	setShowStopDriveModal,
	setGrossEarnings,
	grossEarnings,
	setTotalKms,
	totalKms,
}: // showModal,
// onRealDelete,
// postId,

{
	setShowStopDriveModal: Function;
	setGrossEarnings: Function;
	grossEarnings: number | null;
	setTotalKms: Function;
	totalKms: number;

	// showModal: Function;
	// onRealDelete: Function;
	// postId: string;
}) {
	const initial = {
		y: '-100%',
	};

	const animate = {
		// opacity: 1,
		// scale: 1,
		y: '0',
	};

	const handleGrossEarningsChange = (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		setGrossEarnings(Number(event.target.value));
	};

	const handleTotalKmsChange = (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		const totalKms = Number(event.target.value);
		if (totalKms === 0) {
			setTotalKms(0);
		}
		setTotalKms(totalKms);
	};

	const handleEarnings = () => {
		console.log('grossEarnings is:' + grossEarnings);
		console.log('totalKms is:' + totalKms);
		alert('Earnings saved');
		setShowStopDriveModal(false);
	};

	return (
		<m.div
			initial={initial}
			animate={animate}
			transition={{ duration: 0.5 }}
			className=" fixed w-full h-full z-20 bg-black-300/20 left-0 ">
			{/* basically centering the modal */}
			<div className="bg-white m-2 flex flex-col items-center gap-2">
				<div className="bg-black flex justify-between items-center w-full text-sm px-2 py-1">
					<div className="flex items-center ">
						<AlertTriangle size={32} className="text-white" />
						<h2 className="text-white">EARNINGS INFORMATION</h2>
					</div>
					<button
						className="text-white "
						onClick={() => {
							setShowStopDriveModal(false);
						}}>
						X
					</button>
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
					value={grossEarnings === null ? '' : grossEarnings}
					onChange={handleGrossEarningsChange}
					type="number"
					step="0.01"
					placeholder="Enter your earnings"
					required
				/>

				<h1>Just temporary how many km you drove </h1>
				<input
					className="appearance-none block  bg-white text-gray-700 border border-gray-200 rounded py-2 px-4  leading-tight focus:outline-none focus:bg-gray-200"
					id="gross_earnings"
					name="gross_earnings"
					value={totalKms === 0 ? '' : totalKms}
					onChange={handleTotalKmsChange}
					type="number"
					placeholder="Enter total kms"
					required
				/>

				<button
					className=" text-lg w-32 bg-black text-white rounded-lg hover:text-white mb-8 px-2 py-1"
					onClick={handleEarnings}>
					Save Earnings
				</button>
			</div>
		</m.div>
	);
}
