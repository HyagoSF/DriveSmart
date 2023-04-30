import { NextApiResponse, NextApiRequest } from 'next';
// import { getServerSession } from 'next-auth';

import prisma from '../../../prisma/client';
import { authOptions } from '../auth/[...nextauth].js';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	// const session = await getServerSession(req, res, authOptions);

	// const { value } = req.body;
	// console.log(value + ' Is my Value');
	const { value } = req.body;
	console.log(value);

	/*
	I'm getting it:
	{
		date: '2023-04-13',
		totalHours: 3,
		totalKms: 3,
		grossEarnings: 3,
		gasPrice: 3,
		liquidEarnings: 2.31,
		gasLiters: 0.23,
		gasSpent: 0.69
	}
	*/

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

	// // Find the post where the id is equal to the postId
	// const post = await prisma.post.findUnique({
	// 	where: {
	// 		id: req.body.postId,
	// 	},
	// });

	// // Find the user who is logged in and get the id for use in the comment
	// const user = await prisma.user.findUnique({
	// 	where: {
	// 		email: session?.user?.email,
	// 	},
	// });

	const user = await prisma.user.findUnique({
		where: {
			// email: session?.user?.email,
			email: 'hyago@gmail.com',
		},
	});

	console.log(user);

	try {
		// // Add the delivery to this day and user
		// const newComment = await prisma.comment.create({
		// 	data: {
		// 		text: text,
		// 		post: {
		// 			// connect the comment to the post
		// 			connect: {
		// 				id: post.id,
		// 			},
		// 		},
		// 		user: {
		// 			// connect the comment to the user
		// 			connect: {
		// 				id: user.id,
		// 			},
		// 		},
		// 		// organize the comments by the date they were created
		// 		createdAt: new Date(),
		// 	},
		// });

		// Add the delivery day to the db and connect it to the user
		const newDelivery = await prisma.delivery.create({
			data: {
				date: new Date(value.date),
				totalHours: value.totalHours,
				totalKms: value.totalKms,
				grossEarnings: value.grossEarnings,
				gasPrice: value.gasPrice,
				liquidEarnings: value.liquidEarnings,
				gasLiters: value.gasLiters,
				gasSpent: value.gasSpent,
				user: {
					// connect the delivery to the user
					connect: {
						id: user.id,
					},
				},
			},
		});

		return res.status(200).json('Success');
	} catch (error) {
		console.log(error);

		return res.status(400).json({ error: 'Something went wrong' });
	}
}
