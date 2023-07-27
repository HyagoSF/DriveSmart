'use client';

import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { useRouter } from 'next/router';

interface CredentialsFormProps {
	type: 'signin' | 'signup' | 'login';
	csrfToken?: string;
}

export default function CredentialsForm(props: CredentialsFormProps) {
	// const router = useRouter();
	const [error, setError] = useState('');

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const data = new FormData(e.currentTarget);

		const signInResponse = await signIn('credentials', {
			email: data.get('email') as string,
			password: data.get('password') as string,
			redirect: false,
		});

		if (signInResponse && !signInResponse.error) {
			// router.push('/');
			console.log('success');
		} else {
			console.log('error', signInResponse);
			setError('Your Email or Password is wrong');
		}
	};

	// https://www.youtube.com/watch?v=AbUVY16P4Ys&ab_channel=CoderOne

	return (
		<form onSubmit={handleSubmit}>
			{error && (
				<p className="text-white bg-red-600  rounded "> {error}</p>
			)}

			<input
				type="email"
				id="email"
				name="email"
				placeholder="Email"
				className="w-full p-2 my-2 border border-gray-300 rounded-md"
				required
			/>

			<input
				name="csrfToken"
				type="hidden"
				defaultValue={props.csrfToken}
			/>

			<input
				type="password"
				id="password"
				name="password"
				placeholder="Password"
				className="w-full p-2 my-2 border border-gray-300 rounded-md bg-gray-200"
				required
			/>

			{/* forgot password */}
			<div className="flex justify-center">
				<a href="#" className="text-sm text-gray-500">
					Forgot Password?
				</a>
			</div>

			<div className="flex justify-center mt-4 ">
				<button
					type="submit"
					className="w-3/4 text-white bg-black p-4 rounded-md">
					{props.type === 'signin' ? 'SIGN IN' : 'LOGIN'}
				</button>
			</div>
		</form>
	);
}
