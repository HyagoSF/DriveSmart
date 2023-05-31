// this page is going to be the first page, the login page
// 'use client';

import Login from './auth/Login';
import HomePage from './components/homepage/HomePage';

import { getServerSession } from 'next-auth/next';
import { authOptions } from '../pages/api/auth/[...nextauth]';

export default async function Home() {
	const session = await getServerSession(authOptions);

	return (
		<main className="min-h-screen">
			{/* If the user is not Logged */}
			{!session?.user && <Login />}

			{/* If the user is Logged */}
			{session?.user && <HomePage session={session} />}
		</main>
	);
}
