'use client';

import {
	JSXElementConstructor,
	Key,
	ReactElement,
	ReactFragment,
	ReactPortal,
	useState,
} from 'react';
import { Eye, EyeOff, Receipt, FuelIcon, LucideDollarSign } from 'lucide-react';
import { motion as m } from 'framer-motion';
import { Chart } from 'chart.js';
import { ChartCard } from './Chart/ChartCard';

import {
	StatisticsForLastAndCurrentWeek,
	ExtraStatisticsForLastAndCurrentWeek,
} from '@/app/types/StatisticsType';

export default function SimpleStatisticsReport({
	name,
	type,

	dateFormatted,
	liquidEarnings,
	totalHours,
	totalKms,
	liquidHourlyRate,
	grossEarnings,
	gasSpent,
	gasLiters,

	showChart,
	showHideButton,
	hasBackgroundColor,
}: {
	name?: string;
	type?: string;

	dateFormatted: string;
	liquidEarnings: number;
	totalHours: string;
	totalKms: number;
	liquidHourlyRate: number;
	grossEarnings: number;
	gasSpent: number;
	gasLiters: number;

	showChart?: boolean;
	showHideButton?: boolean;
	hasBackgroundColor?: boolean;
}) {
	const [showExtraStatistics, setShowExtraStatistics] = useState(true);

	type ValidStatisticsType = 'lastWorkDay' | 'currentWeek';
	const typeOfStatistics: ValidStatisticsType = type as ValidStatisticsType;

	const dayDate = {
		name: 'DATE',
		value: dateFormatted,
		textColor: hasBackgroundColor ? 'text-white' : 'text-black',
		bgColor: hasBackgroundColor ? 'bg-gray-400' : '',
	};

	const statistics: StatisticsForLastAndCurrentWeek = {
		lastWorkDay: [
			{
				name: 'TIME',
				value: totalHours,
				textColor: 'text-yellow-600 ',
				bgColor: '',
			},
			{
				name: 'DRIVEN',
				value: `${totalKms?.toFixed(0)} km`,
				textColor: 'text-red-700 ',
				bgColor: '',
			},
			{
				name: 'EARNS',
				value: `$${liquidEarnings?.toFixed(2)}`,
				textColor: 'text-green-600',
				bgColor: '',
			},
			{
				name: 'HOURLY',
				value: `$${liquidHourlyRate ? liquidHourlyRate.toFixed(2) : 0}`,
				textColor: 'text-blue-800',

				bgColor: '',
			},
		],
		currentWeek: [
			{
				name: 'TIME',
				value: totalHours,
				textColor: 'text-white',
				bgColor: 'bg-yellow-600',
			},
			{
				name: 'DRIVEN',
				value: `${totalKms?.toFixed(0)} km`,
				textColor: 'text-white',
				bgColor: 'bg-red-700',
			},
			{
				name: 'EARNS',
				value: `$${liquidEarnings?.toFixed(2)}`,
				textColor: 'text-white',
				bgColor: 'bg-green-600',
			},
			{
				name: 'HOURLY',
				value: `$${liquidHourlyRate ? liquidHourlyRate.toFixed(2) : 0}`,
				textColor: 'text-white',
				bgColor: 'bg-blue-800',
			},
		],
	};

	const extraStatisticsArray: ExtraStatisticsForLastAndCurrentWeek = {
		lastWorkDay: [
			{
				name: 'GROSS EARNINGS',
				value: `$${grossEarnings?.toFixed(2)}`,
				textColor: hasBackgroundColor ? 'text-white' : 'text-black',
				bgColor: hasBackgroundColor ? 'bg-green-600' : '',
				icon: <Receipt />,
			},
			{
				name: 'FUEL EXPENSES',
				value: `$${gasSpent?.toFixed(2)}`,
				textColor: hasBackgroundColor ? 'text-white' : 'text-black',
				bgColor: hasBackgroundColor ? 'bg-red-700' : '',
				icon: <LucideDollarSign />,
			},
			{
				name: 'FUEL CONSUMPTION',
				value: `${gasLiters?.toFixed(2)} L`,
				textColor: hasBackgroundColor ? 'text-white' : 'text-black',
				bgColor: hasBackgroundColor ? 'bg-yellow-600' : '',
				icon: <FuelIcon />,
			},
		],
		currentWeek: [
			{
				name: 'GROSS EARNINGS',
				value: `$${grossEarnings?.toFixed(2)}`,
				textColor: hasBackgroundColor ? 'text-white' : 'text-black',
				bgColor: hasBackgroundColor ? 'bg-green-600' : '',
				icon: <Receipt />,
			},
			{
				name: 'FUEL EXPENSES',
				value: `$${gasSpent?.toFixed(2)}`,
				textColor: hasBackgroundColor ? 'text-white' : 'text-black',
				bgColor: hasBackgroundColor ? 'bg-red-700' : '',
				icon: <LucideDollarSign />,
			},
			{
				name: 'FUEL CONSUMPTION',
				value: `${gasLiters?.toFixed(2)} L`,
				textColor: hasBackgroundColor ? 'text-white' : 'text-black',
				bgColor: hasBackgroundColor ? 'bg-yellow-600' : '',
				icon: <FuelIcon />,
			},
		],
	};

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
			<div className="bg-white rounded px-4 py-2 m-4 mt-8">
				{showHideButton && (
					<div className="flex justify-between items-center mb-4 ">
						<h1
							className={` flex items-center text-white font-extrabold bg-black ${
								type == 'lastWorkDay'
									? ' rounded-tl-md p-2 h-10'
									: 'rounded-t-md p-2 w-125 h-16'
							}`}>
							{dayDate.value}
						</h1>

						<h1 className="font-bold py-2">
							{name ? `${name}` : ''}
						</h1>
						{showExtraStatistics ? (
							<m.div
								className="cursor-pointer mr-2"
								initial={{ rotate: 0 }}
								animate={{ rotate: 180 }}
								transition={{ duration: 1 }}
								onClick={() => setShowExtraStatistics(false)}>
								<Eye size={28} />
							</m.div>
						) : (
							<m.div
								className="cursor-pointer mr-2"
								initial={{ rotate: 0 }}
								animate={{ rotate: 180 }}
								transition={{ duration: 1 }}
								onClick={() => setShowExtraStatistics(true)}>
								<EyeOff size={28} />
							</m.div>
						)}
					</div>
				)}

				<div
					className="container grid grid-cols-4 gap-1"
					// transition={{ duration: 0.5 }}
				>
					{statistics[typeOfStatistics].map(
						(statistic: {
							bgColor: string;
							name: string;
							textColor: string;
							value: string | number;
						}) => (
							<m.div
								className={`item flex flex-col justify-between items-center rounded  font-bold p-1 ${statistic.bgColor}`}
								key={statistic.name}
								variants={item}>
								<h1
									className={`text-sm w-full text-center ${
										statistic.name !== 'HOURLY'
											? 'border-b'
											: ''
									} ${statistic.textColor}`}>
									{statistic.name}
								</h1>
								<h1
									className={`${
										type == 'currentWeek'
											? 'text-white'
											: ''
									}`}>
									{statistic.value}
								</h1>
							</m.div>
						)
					)}
				</div>

				{showExtraStatistics && (
					<m.div
						className=""
						initial="hidden"
						animate="visible"
						variants={container}
						// transition={{ duration: 0.5 }}
					>
						{extraStatisticsArray[`${typeOfStatistics}`].map(
							(extraStatistic: {
								bgColor: string;
								name: string;
								textColor: string;
								value: string | number;
								icon: JSX.Element;
							}) => (
								<m.div
									className={`flex justify-between text-xs items-center gap-2 rounded mt-4 font-bold ${extraStatistic.bgColor} ${extraStatistic.textColor}`}
									key={extraStatistic.name}
									variants={item}>
									<div className="flex items-center gap-1">
										{extraStatistic.icon}
										<h1 className="w-40 ">
											{extraStatistic.name}
										</h1>
									</div>
									<span className="border-b border-black border-dashed w-12" />
									<h1
										className={`w-20  ${
											extraStatistic.name ==
											'FUEL EXPENSES'
												? 'text-red-600'
												: ''
										}`}>
										{extraStatistic.value}
									</h1>
								</m.div>
							)
						)}
					</m.div>
				)}

				{showChart && showExtraStatistics && <ChartCard />}
			</div>
		</>
	);
}
