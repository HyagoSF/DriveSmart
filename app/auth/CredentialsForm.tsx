'use client';

import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { useRouter } from 'next/router';

interface CredentialsFormProps {
	type: 'signin' | 'signup';
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
				<p className="text-white bg-red-600  rounded p-2"> {error}</p>
			)}

			<input
				name="csrfToken"
				type="hidden"
				defaultValue={props.csrfToken}
			/>
			<label>
				Email address
				<input type="text" name="email" />
			</label>
			<label>
				Password
				<input type="password" name="password" />
			</label>
			<button type="submit">
				{props.type === 'signin' ? 'Sign in' : 'Sign up'}
			</button>
		</form>
	);
}
