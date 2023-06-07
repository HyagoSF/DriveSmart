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

		try {
			// get all the expenses for the user and send them to the client
			const data = await prisma.delivery.findMany({
				where: {
					userId: user.id,
				},
				// organize the data by date
				orderBy: {
					date: 'desc',
				},
			});

			// console.log(data);

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
