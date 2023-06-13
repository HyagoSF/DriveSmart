'use client';

import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { motion as m } from 'framer-motion';
import { useEffect, useState } from 'react';
import SimpleStatisticsReport from '../SimpleStatisticsReport';

const lastWorkDay = async () => {
	const { data } = await axios.get('/api/delivery/getLastWorkDay');
	// console.log(data);
	return data;
};

export default function LastWorkDay({}: {}) {
	const { data, error, isLoading } = useQuery({
		queryKey: ['lastWorkDay'],
		queryFn: lastWorkDay,
	});

	/*
	// TO GET SCREEN SIZE
	const [screenSize, setScreenSize] = useState(getCurrentDimension());

	function getCurrentDimension() {
		return {
			width: window.innerWidth,
			height: window.innerHeight,
		};
	}

	useEffect(() => {
		const updateDimension = () => {
			setScreenSize(getCurrentDimension());
		};
		window.addEventListener('resize', updateDimension);

		return () => {
			window.removeEventListener('resize', updateDimension);
		};
	}, [screenSize]);

	screenSize.width > 768 ? 'desktop' : 'mobile';

	*/

	const dateFormatted = data?.date;
	const liquidEarnings = data?.liquidEarnings;
	const totalHours = data?.totalHours;
	const totalKms = data?.totalKms;
	const liquidHourlyRate = data?.liquidHourlyRate;

	return (
		<>
			<SimpleStatisticsReport
				name="LAST RIDE"
				dateFormatted={dateFormatted}
				liquidEarnings={liquidEarnings}
				totalHours={totalHours}
				totalKms={totalKms}
				liquidHourlyRate={liquidHourlyRate}
			/>
		</>
	);
}
