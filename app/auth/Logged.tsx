'use client';

import Image from 'next/image';
import { signOut } from 'next-auth/react';
import Link from 'next/link';

type User = {
	name: string;
	image: string;
};

export default function Logged({ image, name }: User) {
	return (
		<li className="flex gap-8 items-center">
			{/* <Image
				src={session.image}
				width={40}
				height={40}
				className="rounded-full"
				alt="Profile Img"
			/> */}
			<h3>{name}</h3>
			<button
				onClick={() => {
					signOut();
				}}
				className="bg-gray-700 text-white text-sm px-6 py-2 rounded-md">
				Sign Out
			</button>
			<Link href={'/dashboard'}>
				<Image
					src={image}
					width={40}
					height={40}
					alt="Dashboard"
					className="rounded-full w-14"
				/>
			</Link>
		</li>
	);
}
