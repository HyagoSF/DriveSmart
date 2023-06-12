'use client';

import React, { useState } from 'react';
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import Select from 'react-select';
import { EntryType } from '@/app/types/StatisticsType';

// Register the required components
ChartJS.register(
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend
);

// Fetch the data from the server
const fetchCurrentWeekDaysFromChart = async () => {
	const { data } = await axios.get(
		'/api/delivery/getCurrentWeekDaysForChart'
	);
	return data;
};

// options for the chart
export const options = {
	responsive: true,
	plugins: {
		legend: {
			display: false,
			position: 'top' as const,
		},
		title: {
			display: true,
			text: 'CURRENT WEEK',
		},
	},
};

export function ChartCard({}: {}) {
	const [typeOfDate, setTypeOfDate] =
		useState<keyof EntryType>('liquidEarnings');

	const { data, error, isLoading } = useQuery({
		queryKey: ['currentWeekDaysFromChart'],
		queryFn: fetchCurrentWeekDaysFromChart,
	});

	const labels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

	let days = {
		labels,
		datasets: [
			{
				// label: 'Dataset 1',
				data: [0, 0, 0, 0, 0, 0, 0],
				backgroundColor: 'rgba(255, 99, 132, 0.5)',
			},
		],
	};

	// Get the day of the week for each data entry and accumulate the values for the same day
	const daysData: any = Array(7).fill(0); // Initialize with zeros
	const daysCount = Array(7).fill(0); // Initialize with zeros

	data?.forEach((entry: EntryType) => {
		const date = new Date(entry.date);
		let dayOfWeek = date.getUTCDay(); // Sunday = 0, Monday = 1, ..., Saturday = 6
		dayOfWeek = dayOfWeek === 0 ? 7 : dayOfWeek; // Convert Sunday from 0 to 7

		const dataIndex = dayOfWeek - 1;
		daysData[dataIndex] += entry[typeOfDate] || 0; // Accumulate the value based on the selected 'typeOfDate'
		daysCount[dataIndex]++; // Increment the count of entries for the specific day

		switch (typeOfDate) {
			case 'liquidEarnings':
				days.datasets[0].backgroundColor = 'rgb(22 163 74)';
				break;
			case 'totalKms':
				days.datasets[0].backgroundColor = 'rgb(185 28 28)';
				break;
			case 'totalHours':
				days.datasets[0].backgroundColor = 'rgb(202 138 4)';
				break;
			case 'gasSpent':
				days.datasets[0].backgroundColor = 'rgb(185 28 28)';
				break;
			case 'liquidHourlyRate':
				days.datasets[0].backgroundColor = 'rgb(22 163 74)';
				break;
		}
	});

	const averageDaysData = daysData.map((sum: number, index: number) => {
		const count = daysCount[index];
		return count > 0 ? sum / count : 0; // Calculate the average if count > 0, otherwise return 0 to avoid division by zero
	});

	// if the user try to see Houly I'm gonna show him the average of the day, if not I'm gonna show him just sum of the day
	days.datasets[0].data =
		typeOfDate === 'liquidHourlyRate' ? averageDaysData : daysData;

	const selectBoxOptions = [
		{ value: 'liquidEarnings', label: 'Liquid Earnings' },
		{ value: 'totalKms', label: 'Total Kilometers' },
		{ value: 'totalHours', label: 'Time Driven' },
		{ value: 'gasSpent', label: 'Fuel Consumption' },
		{ value: 'liquidHourlyRate', label: 'Liquid Hourly' },
	];

	const handleSelect = (e: any) => {
		setTypeOfDate(e.value);
	};

	return (
		<div className="mx-4 mt-4">
			<Select
				defaultValue={selectBoxOptions[0]}
				options={selectBoxOptions}
				onChange={handleSelect}
			/>

			<Bar options={options} data={days} />
		</div>
	);
}
