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
		<footer className="flex flex-col items-center justify-center w-full h-20 bg-white sticky bottom-0 ">
			<ul className="flex flex-center justify-between w-full p-4 py-2 ">
				<Link
					href="/"
					className="flex flex-col items-center justify-center text-center w-full">
					<HomeIcon size={32} />
					Home
				</Link>
				<Link
					href="statistics"
					className="flex flex-col items-center justify-center text-center w-full">
					<DollarSign size={32} />
					Statistics
				</Link>
				<Link
					href="expense"
					className="flex flex-col items-center justify-center text-center w-full">
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
