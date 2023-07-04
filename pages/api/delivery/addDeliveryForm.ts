import { NextApiResponse, NextApiRequest } from 'next';
import { getServerSession } from 'next-auth';

import prisma from '../../../prisma/client';
import { authOptions } from '../auth/[...nextauth].js';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const session = await getServerSession(req, res, authOptions);

	// to get the local time of the user
	dayjs.extend(utc);
	dayjs.extend(timezone);
	
	const { value } = req.body;



	// check if the user missed some field in the value object i got
	for (const key in value) {
		if (value[key] == 0 || value[key] == null || value[key] == undefined) {
			switch (key) {
				case 'totalHours':
					return res
						.status(400)
						.json({ message: 'Total hours cannot be empty' });
				case 'totalKms':
					return res
						.status(400)
						.json({ message: 'Total kilometers cannot be empty' });
				case 'grossEarnings':
					return res
						.status(400)
						.json({ message: 'Gross earnings cannot be empty' });
				case 'gasPrice':
					return res
						.status(400)
						.json({ message: 'Gas price cannot be empty' });
				default:
					return res
						.status(400)
						.json({ message: 'Please fill the form' });
			}
		}
	}

	// Find the user where the email is equal to the session email
	const user = await prisma.user.findUnique({
		where: {
			email: session?.user?.email,
		},
	});

	try {
		// calculate the gross hourly rate and the liquid one and add them to the db
		const grossHourlyRate = +(
			value.grossEarnings / value.totalHours
		).toFixed(2);

		const liquidHourlyRate = +(
			value.liquidEarnings / value.totalHours
		).toFixed(2);

		// console.log('addDeliveryForm: ', {
		// 	data: {
		// 		date: new Date(dayjs(value.date).format('YYYY-MM-DD')),
		// 		totalHours: value.totalHours,
		// 		totalKms: value.totalKms,
		// 		grossEarnings: value.grossEarnings,
		// 		gasPrice: value.gasPrice,
		// 		liquidEarnings: value.liquidEarnings,
		// 		gasLiters: value.gasLiters,
		// 		gasSpent: value.gasSpent,
		// 		grossHourlyRate: grossHourlyRate,
		// 		liquidHourlyRate: liquidHourlyRate,
		// 		user: {
		// 			// connect the delivery to the user
		// 			connect: {
		// 				id: user.id,
		// 			},
		// 		},
		// 	},
		// });

		// Add the delivery day to the db and connect it to the user
		const newDelivery = await prisma.delivery.create({
			data: {
				date: dayjs(value.date).local().startOf('day').toDate(),
				totalHours: value.totalHours,
				totalKms: value.totalKms,
				grossEarnings: value.grossEarnings,
				gasPrice: value.gasPrice,
				liquidEarnings: value.liquidEarnings,
				gasLiters: value.gasLiters,
				gasSpent: value.gasSpent,
				grossHourlyRate: grossHourlyRate,
				liquidHourlyRate: liquidHourlyRate,
				user: {
					// connect the delivery to the user
					connect: {
						id: user.id,
					},
				},
			},
		});

		// TODO: get this delivery, get important parts to add it to the user's work expenses table
		// const newExpense = await prisma.expense.create({
		// 	data: {
		// 		userId: user.id,
		// 		expenseType: 'Gas',
		// 		date: new Date(value.date),
		// 		odometerReading: 1000,
		// 		gasSpent: value.gasSpent,
		// 		servicesExpenses: 0,
		// 		otherExpenses: 0,
		// 		delivery: {
		// 			// connect the expense to the delivery
		// 			connect: {
		// 				id: newDelivery.id,
		// 			},
		// 		},
		// 		user: {
		// 			// connect the expense to the user
		// 			connect: {
		// 				id: user.id,
		// 			},
		// 		},
		// 	},
		// });

		return res.status(200).json('Success');
	} catch (error) {
		console.log(error);

		return res.status(400).json({ error: 'Something went wrong' });
	}
}
