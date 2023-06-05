'use client';

import { motion as m } from 'framer-motion';
import { Fuel, AlertTriangle } from 'lucide-react';
import { useState } from 'react';

export default function PopUpFuelPrice({
	setShowStartDriveModal,
	setIsDriving,
	gasPrice,
	setGasPrice,
	handleX,
}: // showModal,
// onRealDelete,
// postId,

{
	setShowStartDriveModal: Function;
	setIsDriving: Function;
	gasPrice: number | null;
	setGasPrice: Function;
	handleX: any;

	// showModal: Function;
	// onRealDelete: Function;
	// postId: string;
}) {
	const initial = {
		// y: '-100%',
		opacity: 0,
		scale: 0.5,
	};

	const animate = {
		opacity: 1,
		scale: 1,
		// y: '0',
	};

	const handleGasPriceChange = (event: any) => {
		setGasPrice(+event.target.value);
	};

	const handleFuelPrice = () => {
		// just to make sure that the user has entered a gas price
		if (!gasPrice) {
			alert('Please enter a gas price');
			return;
		}

		setIsDriving(true);
		setShowStartDriveModal(false);
		// onRealDelete(postId);
	};

	const closePopupHandler = () => {
		setShowStartDriveModal(false);
		handleX.set(0);
	};

	return (
		<m.div
			initial={initial}
			animate={animate}
			transition={{ duration: 0.2 }}
			className=" fixed w-full h-full z-30 backdrop-blur-md left-0 -mt-24 pt-44 rounded-sm">
			{/* basically centering the modal */}
			<div className="bg-white m-2 flex flex-col items-center gap-2 rounded-lg">
				<div className="bg-black flex justify-between items-center w-full text-sm px-2 py-1 rounded-t-lg">
					<div className="flex items-center ">
						<AlertTriangle size={32} className="text-white" />
						<h2 className="text-white">FUEL INFORMATION</h2>
					</div>
					<button className="text-white " onClick={closePopupHandler}>
						X
					</button>
				</div>

				<Fuel size={64} className="text-yellow-600" />

				<h1 className="text-lg font-bold text-gray-700 mx-4">
					PLEASE FILL IN THE{' '}
					<span className="text-yellow-600"> PRICE PER LITER </span>
					OF YOUR{' '}
					<span className="text-yellow-600"> LAST FUEL SUPPLY </span>
				</h1>

				<input
					className="appearance-none block  bg-white text-gray-700 border border-gray-200 rounded py-2 px-4  leading-tight focus:outline-none focus:bg-gray-200"
					id="gas_price"
					name="gas_price"
					// value={gasPriceThisFile}
					onChange={handleGasPriceChange}
					type="number"
					step="0.001"
					placeholder="Enter gas price"
					required
				/>

				<button
					className=" text-lg w-32 bg-black text-white rounded-lg hover:text-white mb-8 px-2 py-1"
					onClick={handleFuelPrice}>
					Start
				</button>
			</div>
		</m.div>
	);
}
