import Link from 'next/link';
import {
	User,
	BellIcon,
	Car,
	ChevronDown,
	Home as HomeIcon,
	CalendarSearch,
	DollarSign,
} from 'lucide-react';

import Login from './Login';
import Logged from './Logged';

import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../pages/api/auth/[...nextauth].js';

export default async function Nav() {
	const session = await getServerSession(authOptions);
	console.log(session);

	return (
		/*
		<nav className="flex justify-between items-center py-8">
			<Link href={'/'}>
				<h1 className="font-bold text-4xl contrast-200 text-emerald-700">
					HiveFeed
				</h1>
			</Link>
			<ul className="flex items-center gap-6">

				// user not logged
				{!session?.user && <Login />}

				// user logged
				{session?.user && (
					<Logged
						name={session.user.name || ''}
						image={session.user.image || ''}
					/>
				)}

			</ul>
		</nav>
		*/
		<nav className="flex flex-col justify-center bg-white sticky top-0 z-50 ">
			<div className="flex flex-row items-center justify-between m-4">
				<User
					// onClick={() => console.log('clicked')}
					color="white"
					size={32}
					className=" bg-gray-600 rounded-full cursor-pointer"
				/>

				{/* User */}
				<div className="flex bg-gray-100 rounded p-1">
					<ul className="flex items-center gap-6">

						{!session?.user && <Login />}

						{session?.user && (
							<Logged
								name={session.user.name || ''}
								image={session.user.image || ''}
							/>
						)}
					</ul>

					{/* <h1 className="text-xl">Hyago</h1> */}

					{/* Dropdown */}

					{/* TODO: MAKE THIS BUTTON POSSIBLE TO CHANGE THE USER

                    WHEN CLICK: WILL GENERATE A LIST OF USERS TO CHANGE
                    */}

					<button>
						<ChevronDown color="black" size={24} className="" />
					</button>
				</div>

				{/* <BellIcon color="black" size={32} className="" /> */}
			</div>
		</nav>
	);
}
