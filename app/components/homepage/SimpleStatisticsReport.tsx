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
	const [showStatistics, setShowStatistics] = useState(true);

	const statisticsArray = [
		{
			name: 'DATE',
			value: dateFormatted,
			color: 'bg-gray-400',
		},
		{
			name: 'EARNS',
			value: `$${liquidEarnings}`,
			color: 'bg-green-600',
		},
		{
			name: 'TIME',
			value: totalHours,
			color: 'bg-yellow-600',
		},
		{
			name: 'DRIVEN',
			value: `${totalKms} km`,
			color: 'bg-red-700',
		},
		{
			name: 'HOURLY',
			value: `$${liquidHourlyRate}`,
			color: 'bg-green-600',
		},
	];

	const container = {
		hidden: { opacity: 1, scale: 0 },
		visible: {
			opacity: 1,
			scale: 1,
			transition: {
				delayChildren: 0.2,
				staggerChildren: 0.1,
			},
		},
	};

	const item = {
		hidden: { y: 20, opacity: 0 },
		visible: {
			y: 0,
			opacity: 1,
		},
	};

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
						className="container grid grid-cols-5 gap-1"
						initial="hidden"
						animate="visible"
						variants={container}
						// transition={{ duration: 0.5 }}
					>
						{statisticsArray.map((statistic) => (
							<m.div
								className={`item flex flex-col justify-around items-center rounded text-gray-100 font-bold p-1 ${statistic.color}`}
								key={statistic.name}
								variants={item}>
								<h1 className="text-xs">{statistic.name}</h1>
								<h1>{statistic.value}</h1>
							</m.div>
						))}
					</m.div>
				)}
			</div>
		</>
	);
}
