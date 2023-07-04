'use client';

import React, { useState } from 'react';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import DateRangePicker from './DateRangePicker';
import SimpleStatisticsReport from '../homepage/SimpleStatisticsReport';
import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
dayjs.extend(isBetween);
dayjs.extend(utc);
dayjs.extend(timezone);

// all work expenses
const allDelivery = async () => {
	const { data } = await axios.get('/api/delivery/getDelivery');
	return data;
};

export default function DeliveryList() {
	const [showList, setShowList] = useState(false);
	const [selectedDateRange, setSelectedDateRange] = useState<any>(null);

	const [currentPage, setCurrentPage] = useState(1);
	const [showDaily, setShowDaily] = useState(false);

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

	let filteredDeliveryDays: any[] | null = null;

	// Filter the delivery days by the selected date range
	if (selectedDateRange !== null) {
		if (selectedDateRange.startDate && selectedDateRange.endDate) {
			filteredDeliveryDays = data?.filter((deliveryDay: any) => {
				// Convert the delivery day date to a dayjs object
				const deliveryDayDate = dayjs(deliveryDay.date);

				// Convert the selected date range to dayjs objects
				const startDate = dayjs(selectedDateRange.startDate);
				const endDate = dayjs(selectedDateRange.endDate);
				// Convert the selected date range to local time

				const localStartDate = startDate.local().startOf('day');
				const localEndDate = endDate.local().endOf('day');

				// Check if the delivery day date is between the selected date range, inclusive
				return deliveryDayDate.isBetween(
					localStartDate,
					localEndDate,
					'day',
					'[]'
				);
			});

			// this is just for formatting the date answer to the user
			const firstDaySelected = selectedDateRange.startDate.getDate();
			const lastDaySelected = selectedDateRange.endDate.getDate();

			const firstMonth = selectedDateRange.startDate.getMonth();
			const lastMonth = selectedDateRange.endDate.getMonth();

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

	// Calculate the total of the selected date range
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

	// Formatting total hours
	const hours = Math.floor(totalHours);
	const minutes = Math.round((totalHours - hours) * 60);
	const totalHoursFormatted = `${hours}h ${minutes}m`;

	// Pagination
	const currentDeliveryDays = filteredDeliveryDays?.slice(
		(currentPage - 1) * 5,
		currentPage * 5
	);

	const handleShowDaily = () => {
		setShowDaily(!showDaily);
	};

	return (
		<>
			<h1
				onClick={handleShowList}
				className="flex justify-center w-full rounded-md mt-4 text-3xl px-8 py-2">
				STATISTICS
			</h1>

			<DateRangePicker onChange={handleDateRangeChange} />

			{isLoading && <p className="text-center">Loading...</p>}
			{/* {error && <p>Error: {error}</p>} */}

			{!selectedDateRange && !isLoading && (
				<h1 className="flex justify-center w-full rounded-md mt-4 px-8 py-2">
					Please select a range of dates to get data
				</h1>
			)}

			{selectedDateRange && filteredDeliveryDays && (
				<div className="">
					<SimpleStatisticsReport
						// key={deliveryDay.id}
						// dateFormatted={'123'}
						name={'STATISTICS'}
						dateFormatted={formattedDate}
						liquidEarnings={liquidEarnings}
						totalHours={totalHoursFormatted}
						totalKms={totalKms}
						liquidHourlyRate={liquidHourlyRate}
						showHideButton={true}
					/>

					<div className="bg-gray-500 rounded py-4 m-4 mt-12">
						<div className="flex justify-center align-center">
							<button
								className="text-white text-3xl font-bold "
								onClick={handleShowDaily}>
								DAILY
							</button>
						</div>

						{
							// Show the daily statistics
							showDaily &&
								currentDeliveryDays?.map((deliveryDay: any) => (
									<SimpleStatisticsReport
										key={deliveryDay.id}
										dateFormatted={dayjs(
											deliveryDay.date
										).format('MMMM D, YYYY')}
										liquidEarnings={
											deliveryDay.liquidEarnings
										}
										totalHours={deliveryDay.totalHours}
										totalKms={deliveryDay.totalKms}
										liquidHourlyRate={
											deliveryDay.liquidHourlyRate
										}
										showHideButton={false}
									/>
								))
						}

						{/* Pagination */}
						{filteredDeliveryDays?.length > 5 && (
							<div className="flex justify-center mb-4 gap-2">
								<button
									onClick={() =>
										setCurrentPage(currentPage - 1)
									}
									className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded">
									Previous
								</button>
								<button
									onClick={() =>
										setCurrentPage(currentPage + 1)
									}
									className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded">
									Next
								</button>
							</div>
						)}
					</div>
				</div>
			)}
		</>
	);
}
