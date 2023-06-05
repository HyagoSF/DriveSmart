'use client';

import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { motion as m } from 'framer-motion';

export default function SimpleStatisticsReport({
	name,
	dateFormatted,
	liquidEarnings,
	totalHours,
	totalKms,
	liquidHourlyRate,
}: {
	name?: string;
	dateFormatted: string;
	liquidEarnings: number;
	totalHours: string;
	totalKms: number;
	liquidHourlyRate: number;
}) {
	const [showStatistics, setShowStatistics] = useState(false);

	return (
		<>
			<div className="bg-white rounded px-4 py-2 m-4 mt-4">
				<div className="flex justify-between items-center">
					<h1 className="font-bold py-2">{name ? `${name}:` : ''}</h1>
					{showStatistics ? (
						<m.div
							className="cursor-pointer mr-2"
							initial={{ rotate: 0 }}
							animate={{ rotate: 180 }}
							transition={{ duration: 1 }}
							onClick={() => setShowStatistics(false)}>
							<Eye size={28} />
						</m.div>
					) : (
						<m.div
							className="cursor-pointer mr-2"
							initial={{ rotate: 0 }}
							animate={{ rotate: 180 }}
							transition={{ duration: 1 }}
							onClick={() => setShowStatistics(true)}>
							<EyeOff size={28} />
						</m.div>
					)}
				</div>

				{showStatistics && (
					<m.div
						className=" grid grid-cols-5 gap-1"
						initial={{
							y: '-25%',
						}}
						animate={{
							y: '0',
						}}
						transition={{ duration: 0.5 }}>
						<div className="flex flex-col justify-around bg-gray-400 items-center rounded text-gray-100 font-bold p-1 ">
							<h1 className="text-xs">DATE</h1>
							<h1>{dateFormatted}</h1>
						</div>

						<div className="flex flex-col justify-around bg-green-600 items-center rounded text-gray-100 font-bold p-1 ">
							<h1 className="text-xs">EARNS</h1>
							<h1>${liquidEarnings}</h1>
						</div>

						<div className="flex flex-col justify-around bg-yellow-600 items-center rounded text-gray-100 font-bold p-1 ">
							<h1 className="text-xs">TIME</h1>
							<h1>{totalHours}</h1>
						</div>

						<div className="flex flex-col justify-around bg-red-700 items-center rounded text-gray-100 font-bold p-1 ">
							<h1 className="text-xs">DRIVEN</h1>
							<h1>{totalKms} km</h1>
						</div>

						<div className="flex flex-col justify-around bg-green-600 items-center rounded text-gray-100 font-bold p-1 ">
							<h1 className="text-xs">HOURLY</h1>
							<h1>${liquidHourlyRate}</h1>
						</div>
					</m.div>
				)}
			</div>
		</>
	);
}
