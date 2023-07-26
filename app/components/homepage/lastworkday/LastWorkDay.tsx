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

	const dateFormatted = data?.date;
	const liquidEarnings = data?.liquidEarnings;
	const totalHours = data?.totalHours;
	const totalKms = data?.totalKms;
	const liquidHourlyRate = data?.liquidHourlyRate;

	const grossEarnings = data?.grossEarnings;
	const gasSpent = data?.gasSpent;
	const gasLiters = data?.gasLiters;

	return (
		<>
			<SimpleStatisticsReport
				name="LAST RIDE"
				type="lastWorkDay"

				dateFormatted={dateFormatted}
				liquidEarnings={liquidEarnings}
				totalHours={totalHours}
				totalKms={totalKms}
				liquidHourlyRate={liquidHourlyRate}
				grossEarnings={grossEarnings}
				gasSpent={gasSpent}
				gasLiters={gasLiters}

				showHideButton={true}
				// hasBackgroundColor={false}
			/>
		</>
	);
}
