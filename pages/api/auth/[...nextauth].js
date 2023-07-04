import NextAuth from 'next-auth/next';
import GoogleProvider from 'next-auth/providers/google';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
// this is my prisma client
import prisma from '../../../prisma/client';

// This is the default credentials provider
import CredentialsProvider from 'next-auth/providers/credentials';

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

		CredentialsProvider({
			// The name to display on the sign in form (e.g. 'Sign in with...')
			name: 'Credentials',
			// The credentials is used to generate a suitable form on the sign in page.
			// You can specify whatever fields you are expecting to be submitted.
			// e.g. domain, username, password, 2FA token, etc.
			// You can pass any HTML attribute to the <input> tag through the object.
			credentials: {
				email: {
					label: 'Email',
					type: 'email',
					placeholder: 'example@example.com',
				},
				password: {
					label: 'Password',
					type: 'password',
					placeholder: 'Password',
				},
			},
			async authorize(credentials, req) {
				if (!credentials.email || !credentials.password) {
					return null;
				}

				const dbUser = await prisma.user.findFirst({
					where: { email: credentials.email },
				});

				// password should be encrypted using bcrypt for example
				if (dbUser && dbUser.password === credentials.password) {
					const user = {
						id: dbUser.id,
						name: dbUser.name,
						email: dbUser.email,
					};
					return user;
				}

				// console.log('credentials', credentials)
				return null;
			},
		}),
	],

	session: {
		maxAge: 24 * 60 * 60,
	},
};

export default NextAuth(authOptions);
