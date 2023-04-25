import NextAuth from 'next-auth/next';
import GoogleProvider from 'next-auth/providers/google';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
// this is my prisma client
import prisma from '../../../prisma/client';

export const authOptions = {
	adapter: PrismaAdapter(prisma),
	secret: process.env.AUTH_SECRET,
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET,
			// authorization: {
			// 	params: {
			// 		prompt: 'consent',
			// 		access_type: 'offline',
			// 		response_type: 'code',
			// 	},
			// },
		}),
	],
};

export default NextAuth(authOptions);
