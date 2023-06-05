'use client';

import Image from 'next/image';
import { signOut } from 'next-auth/react';
import Link from 'next/link';

type User = {
	name: string;
	image: string;
};

export default function NavBarLogged({ session }: { session: any }) {
	return (
		<li className="sticky top-0 flex items-center flex-row w-full justify-between p-2 bg-white z-20  ">
			<Link href={'/'}>
				<Image
					src={session.user.image || ''}
					width={40}
					height={40}
					alt="Dashboard"
					className="rounded-full w-14 border  "
				/>
			</Link>
			<div className="flex font-bold text-lg">
				<h3>{session.user.name || ''}</h3>
			</div>
			<button
				onClick={() => {
					signOut();
				}}
				className="bg-black text-white font-bold text-sm px-4 py-2 text-center rounded-md">
				Sign Out
			</button>
		</li>
	);
}
