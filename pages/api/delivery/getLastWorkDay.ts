import { NextApiResponse, NextApiRequest } from 'next';
import { getServerSession } from 'next-auth';

import prisma from '../../../prisma/client';
import { authOptions } from '../auth/[...nextauth].js';

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
			const data = await prisma.delivery.findFirst({
				where: {
					userId: user.id,
				},
				orderBy: {
					date: 'desc',
				},
			});

			// Formatting date
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
			const monthIndex = data.date.getMonth();
			const monthName = monthNames[monthIndex].toUpperCase();
			const dayOfMonth = data.date.getDate();
			const formattedDate = `${monthName} ${dayOfMonth}`;
			data.date = formattedDate;

			// formatting time

			const hours = Math.floor(data.totalHours);
			const minutes = Math.round((data.totalHours - hours) * 60);
			data.totalHours = `${hours}h ${minutes}m`;

			// console.log(data.date);

			return res.status(200).json(data);

			// return res.status(200).json('Success');
		} catch (error) {
			// console.log(error);

			return res
				.status(400)
				.json({ message: 'Some error fetching data' });
		}
	}
}
