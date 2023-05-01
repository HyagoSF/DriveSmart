'use client';

import Image from 'next/image';
import { signOut } from 'next-auth/react';
import Link from 'next/link';
import { ChevronDown } from 'lucide-react';
import { NextResponse } from 'next/server';

type User = {
	name: string;
	image: string;
};

export default function NavBarLogged({ session }: { session: any }) {
	return (
		<li className="sticky top-0 flex items-center flex-row w-full justify-between p-2 bg-white z-50 ">
			<Link href={'/'}>
				<Image
					src={session.user.image || ''}
					width={40}
					height={40}
					alt="Dashboard"
					className="rounded-full w-14"
				/>
			</Link>
			<div className="flex">
				<h3>{session.user.name || ''}</h3>
				<ChevronDown color="black" size={24} className="" />
			</div>
			<button
				onClick={() => {
					signOut();
				}}
				className="bg-gray-700 text-white text-sm p-2 rounded-md">
				Sign Out
			</button>
		</li>
	);
}
