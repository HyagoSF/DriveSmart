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

ChartJS.register(
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend
);

export const options = {
	responsive: true,
	plugins: {
		legend: {
			display: false,
			position: 'top' as const,
		},
		title: {
			display: true,
			text: 'LAST WEEK',
		},
	},
};

const labels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

function randomIntFromInterval(min: number, max: number) {
	// min and max included
	return Math.floor(Math.random() * (max - min + 1) + min);
}

// Giving data depending on the selected state

export function ChartCard() {
	const [typeOfDate, setTypeOfDate] = useState('liquidEarnings');

	let data = {
		labels,
		datasets: [
			{
				label: 'Dataset 1',
				data: labels.map(() => randomIntFromInterval(0, 11)),
				backgroundColor: 'rgba(255, 99, 132, 0.5)',
			},
		],
	};

	const handleClicked = () => {
		setTypeOfDate('timeDriving');
	};

	switch (typeOfDate) {
		case 'liquidEarnings':
			data.datasets[0].data = [1, 2, 3, 4, 5, 6, 7];
		case 'totalKms':
			data.datasets[0].data = [7, 6, 5, 4, 3, 2, 1];
		case 'timeDriving':
			data.datasets[0].data = [8, 9, 10, 11, 12, 13, 14];
		case 'fuelConsumption':
			data.datasets[0].data = [15, 16, 17, 18, 19, 20, 21];
		case 'liquidHourlyRate':
			data.datasets[0].data = [22, 23, 24, 25, 26, 27, 28];
	}

	return (
		<div className="mx-4">
			<button onClick={handleClicked}>click</button>

			<Bar options={options} data={data} />
		</div>
	);
}
