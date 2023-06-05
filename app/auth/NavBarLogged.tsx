'use client';

import Image from 'next/image';
import { signOut } from 'next-auth/react';
import Link from 'next/link';
import { useState } from 'react';

type User = {
	name: string;
	image: string;
};

export default function NavBarLogged({ session }: { session: any }) {
	const [showMenu, setShowMenu] = useState(false);

	return (
		<div className="mx-2 sticky top-0 z-20">
			{showMenu && (
				<li
					className=" flex items-center flex-row w-full justify-between h-20 bg-black p-2 rounded-b-lg"
					onClick={() => setShowMenu(false)}>
					<Link href={'/'}>
						<Image
							src={session.user.image || ''}
							width={40}
							height={40}
							alt="Dashboard"
							className="rounded-full w-16 border "
						/>
					</Link>
					<div className="flex font-bold text-lg text-white">
						<h3>{session.user.name || ''}</h3>
					</div>
					<button
						onClick={() => {
							signOut();
						}}
						className="bg-white font-bold text-sm px-4 py-2 text-center rounded-md ">
						Sign Out
					</button>
				</li>
			)}

			{!showMenu && (
				<li
					className="  w-full h-14 bg-black p-2 rounded-b-lg flex items-center flex-col font-bold text-lg text-white"
					onClick={() => setShowMenu(true)}>
					<h3>MY AREA</h3>
					<span>----</span>
				</li>
			)}
		</div>
	);
}
