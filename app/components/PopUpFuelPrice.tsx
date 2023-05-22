'use client';

import { motion as m } from 'framer-motion';
import { Fuel, AlertTriangle } from 'lucide-react';
import { useState } from 'react';

export default function PopUpFuelPrice({
	setShowStartDriveModal,
	setIsDriving,

	gasPrice,
	setGasPrice,
}: // showModal,
// onRealDelete,
// postId,

{
	setShowStartDriveModal: Function;
	setIsDriving: Function;
	gasPrice: number | null;
	setGasPrice: Function;

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

	const handleGasPriceChange = (event: any) => {
		setGasPrice(event.target.value);
	};

	const handleFuelPrice = () => {
		// showModal(true);
		setIsDriving(true);
		console.log('gasPrice is:' + gasPrice);
		setShowStartDriveModal(false);
		// onRealDelete(postId);
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
						<h2 className="text-white">FUEL INFORMATION</h2>
					</div>
					<button
						className="text-white "
						onClick={() => {
							setShowStartDriveModal(false);
						}}>
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
					value={gasPrice === null ? '' : gasPrice}
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
