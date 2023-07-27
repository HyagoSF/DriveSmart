// 'use client';

import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import SimpleStatisticsReport from '../SimpleStatisticsReport';

const fetchCurrentWeek = async () => {
	const { data } = await axios.get('/api/delivery/getCurrentWeek');
	return data;
};

export default function CurrentWeek({}: {}) {
	const { data, error, isLoading } = useQuery({
		queryKey: ['currentWeek'],
		queryFn: fetchCurrentWeek,
	});

	const dateFormatted = `${data?.startDate} ${data?.endDate}`;
	const liquidEarnings = data?.totalLiquidEarnings;
	const totalHours = data?.totalHours;
	const totalKms = data?.totalKmsDriven;
	const liquidHourlyRate = data?.totalLiquidHourlyRate;

	const grossEarnings = data?.totalGrossEarnings;
	const gasSpent = data?.totalGasSpent;
	const gasLiters = data?.totalGasLiters;

	return (
		<>
			<SimpleStatisticsReport
				name="CURRENT WEEK"
				type="currentWeek"

				dateFormatted={dateFormatted}
				liquidEarnings={liquidEarnings}
				totalHours={totalHours}
				totalKms={totalKms}
				liquidHourlyRate={liquidHourlyRate}
				showChart={true}
				grossEarnings={grossEarnings}
				gasSpent={gasSpent}
				gasLiters={gasLiters}

				showHideButton={true}
				
				// hasBackgroundColor={true}
			/>
		</>
	);
}
