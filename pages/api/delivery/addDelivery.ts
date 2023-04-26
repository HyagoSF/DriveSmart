import { NextApiResponse, NextApiRequest } from 'next';
// import { getServerSession } from 'next-auth';

import prisma from '../../../prisma/client';
import { authOptions } from '../auth/[...nextauth].js';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	// const session = await getServerSession(req, res, authOptions);

	
	const { title } = req.body;
	console.log(title + " Is my title");

	// // Check if the comment is empty or not
	// if (!text)
	// 	return res.status(400).json({ message: 'Comment cannot be empty' });

	// if (text.length > 150)
	// 	return res
	// 		.status(400)
	// 		.json({ message: 'Comment cannot be longer than 150 characters' });

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

	try {
		// // Add the comment to this post
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

		return res.status(200).json('worked');
	} catch (error) {
		console.log(error);

		return res.status(400).json({ error: 'Something went wrong' });
	}
}
