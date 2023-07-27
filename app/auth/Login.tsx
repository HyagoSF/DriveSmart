'use client';

import { signIn } from 'next-auth/react';
import CredentialsForm from './CredentialsForm';

import Image from 'next/image';

import carsBackground from '../images/login/cars_background.png';
import logoSmartDrive from '../images/login/LOGO_SMARTDRIVE.png';
import googleicon from '../images/login/googleicon.png';

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
		<div className="w-full flex flex-col items-center justify-start py-2 min-h-screen ">
			<div className="flex flex-col items-center shadow-md w-11/12 gap-8 rounded-md">
				<Image
					src={carsBackground}
					alt="Cars Background"
					className="object-cover"
					width={500}
					height={500}
				/>

				<Image
					src={logoSmartDrive}
					alt="Smart Drive Logo"
					className="object-cover relative bottom-14"
					width={200}
					height={200}
				/>

				<div className="flex flex-col items-center w-11/12 gap-8 rounded-md px-4">
					<div className="flex flex-row w-full justify-between items-center px-4">
						<h1
							className="
						text-black text-3xl font-extrabold
					">
							LOGIN
						</h1>
						<h2 className="text-red-600 font-extrabold text-2xl">
							SIGN UP
						</h2>
					</div>

					<CredentialsForm type="login" />

					<div className="flex justify-center -mt-4 w-full">
						<button
							type="button"
							onClick={handleSignInGoogle}
							className=" shadow-md p-4 rounded-md w-3/4 mb-4 flex justify-center items-center">
							<Image
								src={googleicon}
								alt="Google Icon"
								width={20}
								height={20}
								className="mr-1"
							/>
							Sign in with Google
						</button>
					</div>
				</div>
			</div>
		</div>

	);
}
