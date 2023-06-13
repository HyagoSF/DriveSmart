import { NextApiResponse, NextApiRequest } from 'next';
import { getServerSession } from 'next-auth';

import prisma from '../../../prisma/client';
import { authOptions } from '../auth/[...nextauth].js';

import dayjs from 'dayjs';
import { format } from 'path';

interface WorkDay {
	id: string;
	userId: string;
	date: string;
	totalHours: any;
	totalKms: number;
	grossEarnings: number;
	liquidEarnings: number;
	gasPrice: string;
	gasLiters: number;
	gasSpent: number;
	grossHourlyRate: number;
	liquidHourlyRate: number;
}

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method === 'GET') {
		const session = await getServerSession(req, res, authOptions);

		const { value } = req.body;

		// Find the user where the email is equal to the session email
		const user = await prisma.user.findUnique({
			where: {
				email: session?.user?.email,
			},
		});

		try {
			// get the current week sum of

			const data = await prisma.delivery.findMany({
				where: {
					userId: user.id,
					// where the date is between the current week
					date: {
						gte: dayjs().startOf('week').toDate(),
						lte: dayjs().endOf('week').toDate(),
					},
				},
				orderBy: {
					date: 'desc',
				},
			});


			// get the first day of the week (Monday)
			const firstDayOfWeek = dayjs().startOf('week').add(1, 'day');
			// then get the last day of the week (Monday + 7 days = Sunday)
			const lastDayOfWeek = firstDayOfWeek.add(7, 'day').toDate();

			const weekData: {
				startDate: string | Date;
				endDate: string | Date;
				totalHours: any;
				totalLiquidEarnings: number;
				totalKmsDriven: number;
				totalLiquidHourlyRate: number;
			} = {
				startDate: firstDayOfWeek.toDate(),
				endDate: lastDayOfWeek,
				totalHours: 0,
				totalLiquidEarnings: 0,
				totalKmsDriven: 0,
				totalLiquidHourlyRate: 0,
			};

			// Format date
			// const formattedDate = dayjs(day.date).format('MMMM D');
			const formattedStartDate = dayjs(weekData.startDate).format(
				'MMMM D'
			);

			const formattedEndDate = dayjs(weekData.endDate).format('MMMM D');
			weekData.startDate = formattedStartDate;
			weekData.endDate = formattedEndDate;

			data.forEach((day: WorkDay) => {
				weekData.totalHours += day.totalHours;
				weekData.totalLiquidEarnings += day.liquidEarnings;
				weekData.totalKmsDriven += day.totalKms;
			});

			// Format time
			const hours = Math.floor(weekData.totalHours);
			const minutes = Math.round((weekData.totalHours - hours) * 60);

			const averageLiquidHourlyRate =
				weekData.totalLiquidEarnings / weekData.totalHours;



			weekData.totalLiquidHourlyRate = averageLiquidHourlyRate;
			weekData.totalHours = `${hours}h ${minutes}m`;




			return res.status(200).json(weekData);
		} catch (error) {
			// console.log(error);

			return res
				.status(400)
				.json({ message: 'Some error fetching data' });
		}
	}
}
