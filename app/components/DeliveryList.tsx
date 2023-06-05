'use client';

import React, { useState } from 'react';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import DateRangePicker from './DateRangePicker';
import SimpleStatisticsReport from './homepage/SimpleStatisticsReport';
import { StatisticsType } from '../types/StatisticsType';

// all work expenses
const allDelivery = async () => {
	const { data } = await axios.get('/api/delivery/getDelivery');
	return data;
};

export default function DeliveryList() {
	const [showList, setShowList] = useState(false);
	const [selectedDateRange, setSelectedDateRange] = useState<any>(null);

	// I can add a type to useQuery to make it more specific
	const { data, error, isLoading } = useQuery({
		queryKey: ['delivery'],
		queryFn: allDelivery,
	});

	const handleShowList = () => {
		setShowList(!showList);
	};

	const handleDateRangeChange = (dateRange: any) => {
		setSelectedDateRange(dateRange);
	};

	// Formatting date
	let formattedDate = '';
	const monthNames = [
		'January',
		'February',
		'March',
		'April',
		'May',
		'June',
		'July',
		'August',
		'September',
		'October',
		'November',
		'December',
	];

	let filteredDeliveryDays = null;

	// first day of the selected date range
	if (selectedDateRange !== null) {
		if (selectedDateRange.startDate && selectedDateRange.endDate) {
			filteredDeliveryDays = data?.filter((deliveryDay: any) => {
				if (!selectedDateRange) {
					return true;
				}
				const deliveryDayDate = new Date(deliveryDay.date);
				return (
					deliveryDayDate >= selectedDateRange.startDate &&
					deliveryDayDate <= selectedDateRange.endDate
				);
			});

			const firstDaySelected = selectedDateRange?.startDate?.getDate();
			const lastDaySelected = selectedDateRange?.endDate?.getDate();

			// first month of the selected date range
			const firstMonth = selectedDateRange?.startDate?.getMonth();
			const lastMonth = selectedDateRange?.endDate?.getMonth();

			if (firstMonth === lastMonth) {
				const monthName = monthNames[firstMonth];
				formattedDate = `${monthName} ${firstDaySelected} - ${lastDaySelected}`;
			} else {
				const monthName = monthNames[firstMonth];
				const monthName2 = monthNames[lastMonth];
				formattedDate = `${monthName} ${firstDaySelected} - ${monthName2} ${lastDaySelected}`;
			}
		}
	}

	let totalDays = 0;
	let totalHours = 0;
	let totalKms = 0;
	let liquidEarnings = 0;
	let liquidHourlyRate = 0;

	if (selectedDateRange) {
		filteredDeliveryDays?.map((deliveryDay: any) => {
			totalDays++;
			totalHours += deliveryDay.totalHours;
			totalKms += deliveryDay.totalKms;
			liquidEarnings += deliveryDay.liquidEarnings;
			liquidHourlyRate += deliveryDay.liquidHourlyRate;
		});

		liquidHourlyRate = +(liquidHourlyRate / totalDays).toFixed(2);
	}

	// formatting time

	const hours = Math.floor(totalHours);
	const minutes = Math.round((totalHours - hours) * 60);
	const totalHoursFormatted = `${hours}h ${minutes}m`;

	return (
		<>
			<h1
				onClick={handleShowList}
				className="flex justify-center w-full rounded-md mt-4 text-3xl px-8 py-2">
				Delivery List
			</h1>

			<DateRangePicker onChange={handleDateRangeChange} />

			{isLoading && <p>Loading...</p>}
			{/* {error && <p>Error: {error}</p>} */}

			{!selectedDateRange && !isLoading && (
				<h1 className="flex justify-center w-full rounded-md mt-4 px-8 py-2">
					Please select a range of dates to get data
				</h1>
			)}

			{
				selectedDateRange && filteredDeliveryDays && (
					// filteredDeliveryDays?.map((deliveryDay: any) => (
					<SimpleStatisticsReport
						// key={deliveryDay.id}
						// dateFormatted={'123'}
						name={'STATISTICS'}
						dateFormatted={formattedDate}
						liquidEarnings={liquidEarnings}
						totalHours={totalHoursFormatted}
						totalKms={totalKms}
						liquidHourlyRate={liquidHourlyRate}
					/>
				)
				// ))
			}
		</>
	);
}
