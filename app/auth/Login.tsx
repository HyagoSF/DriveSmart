'use client';

import { signIn } from 'next-auth/react';
import CredentialsForm from './CredentialsForm';

export default function Login() {
	const handleSignInGoogle = async () => {
		await signIn('google');
	};

	const handleSignInCredentials = async () => {
		await signIn('credentials', {
			redirect: false,
			email: 'test',
			password: 'test232',
		});
	};

	const test = async () => {
		await signIn();
	};

	return (
		// <main className="min-h-screen">
		<div className="w-full flex flex-col items-center justify-center py-2 min-h-screen">
			<div className="flex flex-col items-center w-2/3 mt-10 p-10 shadow-md">
				<h1 className="mt-10 mb-4 text-4xl font-bold">Sign In</h1>
				<button
					onClick={handleSignInGoogle}
					className="text-sm bg-gray-700 text-white py-2 px-6 rounded-xl disabled:opacity-25">
					Sign In Google
				</button>

				<span className="text-2xl font-semibold text-white text-center my-8">
					OR
				</span>

				<CredentialsForm type="signin" />

				{/* <button
						onClick={test}
						className="text-sm bg-gray-700 text-white py-2 px-6 rounded-xl disabled:opacity-25">
						Sign In
					</button> */}
			</div>
		</div>
		// </main>h
	);
}
