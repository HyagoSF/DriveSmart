'use client';

import Image from 'next/image';
import { signOut } from 'next-auth/react';
import Link from 'next/link';
import { useState } from 'react';

import SmartAreaIcon from '../components/navbar/SmartAreaIcon';
import SideBar from '../components/navbar/SideBar';

type User = {
	name: string;
	image: string;
};

export default function NavBarLogged({ session }: { session: any }) {
	const [showMenu, setShowMenu] = useState(false);

	return (
		<div className=" sticky top-0 z-20">
			<div
				className="  w-full bg-black p-2 h-20 rounded-b-lg font-bold text-lg text-white"
				onClick={() => setShowMenu(true)}>
				<SmartAreaIcon width={64} height={64} />
			</div>

			{showMenu && (
				<SideBar setShowMenu={setShowMenu} session={session} />
			)}
		</div>
	);
}
