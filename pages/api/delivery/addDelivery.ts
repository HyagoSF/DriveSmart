import { NextApiResponse, NextApiRequest } from 'next';
import prisma from '../../../prisma/client';
import dayjs from 'dayjs';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	// Get the value object from the request body
	const { value } = req.body;

	// check if the user missed some field in the value object i got
	for (const key in value) {
		// just because the distance for now can be 0
		if (key !== 'totalKms') {
			if (
				value[key] == 0 ||
				value[key] == null ||
				value[key] == undefined
			) {
				switch (key) {
					case 'totalHours':
						return res
							.status(400)
							.json({ message: 'Total hours cannot be empty' });
					case 'grossEarnings':
						return res.status(400).json({
							message: 'Gross earnings cannot be empty',
						});
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
	}

	// Find the user where the email is equal to the session email
	const user = await prisma.user.findUnique({
		where: {
			email: value.userEmailSession,
		},
	});

	try {
		// fuelConsumption is the number of liters per 100 km => to calculate the gasLiters and gasSpent
		const fuelConsumptionPerKm = value.fuelConsumption / 100; // this is the number of liters per km

		// calculate the total liters of gas used
		const gasLiters = +(value.totalKms * fuelConsumptionPerKm).toFixed(2);

		// calculate the total money spent on gas
		const gasSpent = +(gasLiters * value.gasPrice).toFixed(2);

		// // calculate the totalHours in decimal format
		const totalHoursInDecimal = +(
			value.totalHours.hours +
			value.totalHours.minutes / 60 +
			value.totalHours.seconds / 3600
		).toFixed(2);

		// // Just debugging
		// const totalHoursInDecimal = 8;

		// calculate the liquid earnings
		const liquidEarnings = +(value.grossEarnings - gasSpent).toFixed(2);

		// calculate the grossHourlyRate
		const grossHourlyRate = +(
			value.grossEarnings / totalHoursInDecimal
		).toFixed(2);

		// calculate the liquidHourlyRate
		const liquidHourlyRate = +(
			liquidEarnings / totalHoursInDecimal
		).toFixed(2);

		// change gasPrice to 3 decimal places
		// const gasPriceUpdated = value.gasPrice.toFixed(3);

		if (grossHourlyRate == Infinity || liquidHourlyRate == Infinity) {
			return res.status(400).json({
				message: 'Some values are too small to be saved',
			});
		}

		const utcOffset = dayjs().format('Z');	// '-04:00' for example

		//get the -04 from the utcOffset 
		const utcOffsetHours = +utcOffset.slice(0, 3); // -4

		// Add the delivery day to the db and connect it to the user
		const newDelivery = await prisma.delivery.create({
			data: {
				date: dayjs(new Date()).add(utcOffsetHours, 'hour').toDate(), // get the date from today
				// totalHours: totalHoursInDecimal * 100, // converting to decimal
				totalHours: totalHoursInDecimal, // converting to decimal
				totalKms: value.totalKms,
				grossEarnings: value.grossEarnings,
				// gasPrice: gasPriceUpdated,
				gasPrice: value.gasPrice,

				liquidEarnings: liquidEarnings,
				gasLiters: gasLiters, // total liters of gas used
				gasSpent: gasSpent, // total money spent on gas
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
		// console.log(error);

		return res.status(400).json({ message: 'Something went wrong!' });
	}
}
