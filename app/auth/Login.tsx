'use client';

import { signIn } from 'next-auth/react';

export default function Login() {
	const handleSignIn = async () => {
		await signIn('google');
	};

	return (
		<main className="min-h-screen">
			<button
				onClick={handleSignIn}
				className="relative top-52 left-52 p- text-sm bg-gray-700 text-white py-2 px-6 rounded-xl disabled:opacity-25">
				Sign In
			</button>
		</main>
	);
}
