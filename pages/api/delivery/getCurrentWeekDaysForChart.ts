import { NextApiResponse, NextApiRequest } from 'next';
import { getServerSession } from 'next-auth';

import prisma from '../../../prisma/client';
import { authOptions } from '../auth/[...nextauth].js';

import dayjs from 'dayjs';

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

			// switch (typeOfDate) {
			//     case 'liquidEarnings':
			//         days.datasets[0].data = [1, 2, 3, 4, 5, 6, 7];
			//         break;
			//     case 'totalKms':
			//         days.datasets[0].data = [7, 6, 5, 4, 3, 2, 1];
			//         break;

			//     case 'timeDriving':
			//         days.datasets[0].data = [8, 9, 10, 11, 12, 13, 14];
			//         break;

			//     case 'fuelConsumption':
			//         days.datasets[0].data = [15, 16, 17, 18, 19, 20, 21];
			//         break;

			//     case 'liquidHourlyRate':
			//         days.datasets[0].data = [22, 23, 24, 25, 26, 27, 28];
			// }

			// create object with sum of each day

			// const days = {
			//     liquidEarnings: {

			// }

			return res.status(200).json(data);
		} catch (error) {
			// console.log(error);

			return res
				.status(400)
				.json({ message: 'Some error fetching data' });
		}
	}
}
