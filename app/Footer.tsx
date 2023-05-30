import Link from 'next/link';
import {
	User,
	BellIcon,
	Car,
	ChevronDown,
	Home as HomeIcon,
	CalendarSearch,
	DollarSign,
	Receipt,
} from 'lucide-react';

// import Login from './Login';
// import NavBarLogged from './NavBarLogged';

// import { getServerSession } from 'next-auth/next';
// import { authOptions } from '../../pages/api/auth/[...nextauth].js';

export default async function Footer() {
	// const session = await getServerSession(authOptions);
	// console.log(session);

	return (
		// <nav className="flex justify-between items-center py-8">
		// 	<Link href={'/'}>
		// 		<h1 className="font-bold text-4xl contrast-200 text-emerald-700">
		// 			HiveFeed
		// 		</h1>
		// 	</Link>
		// 	<ul className="flex items-center gap-6">
		// 		{/* I can have a client component here inside this server component*/}

		// 		{/* If the user is not NavBarLogged */}
		// 		{!session?.user && <Login />}

		// 		{/* If the user is NavBarLogged */}
		// 		{session?.user && (
		// 			<NavBarLogged
		// 				name={session.user.name || ''}
		// 				image={session.user.image || ''}
		// 			/>
		// 		)}
		// 	</ul>
		// </nav>

		<footer className="flex flex-col items-center justify-center w-screen h-20 bg-white sticky bottom-0 ">
			<ul className="flex flex-center justify-between w-screen p-4 py-2 ">
				<Link
					href="/"
					className="flex flex-col items-center justify-center text-center w-12">
					<HomeIcon size={32} />
					Home
				</Link>
				<Link
					href="statistics"
					className="flex flex-col items-center justify-center text-center w-12">
					<DollarSign size={32} />
					Statistics
				</Link>
				<Link
					href="expense"
					className="flex flex-col items-center justify-center text-center w-12">
					<Receipt size={32} />
					Work
				</Link>
				{/* <Link
					href="carExpense"
					className="flex flex-col items-center justify-center text-center w-12">
					<Receipt size={32} />
					Personal
				</Link> */}
			</ul>
		</footer>
	);
}
