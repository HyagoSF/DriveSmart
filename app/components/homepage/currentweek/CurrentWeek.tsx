'use client';

import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { motion as m } from 'framer-motion';
import { useEffect, useState } from 'react';
import SimpleStatisticsReport from '../SimpleStatisticsReport';

const currentWeek = async () => {
	const { data } = await axios.get('/api/delivery/CurrentWeek');
	// console.log(data);
	return data;
};

export default function CurrentWeek({}: {}) {
	const { data, error, isLoading } = useQuery({
		queryKey: ['delivery'],
		queryFn: currentWeek,
	});

	const dateFormatted = data?.date;
	const liquidEarnings = data?.liquidEarnings;
	const totalHours = data?.totalHours;
	const totalKms = data?.totalKms;
	const liquidHourlyRate = data?.liquidHourlyRate;

	return (
		<>
			<SimpleStatisticsReport
				name="CURRENT WEEK"
				dateFormatted={dateFormatted}
				liquidEarnings={liquidEarnings}
				totalHours={totalHours}
				totalKms={totalKms}
				liquidHourlyRate={liquidHourlyRate}
			/>
		</>
	);
}
