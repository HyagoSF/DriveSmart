import Link from 'next/link';
import { Home as HomeIcon, DollarSign } from 'lucide-react';

export default async function Footer() {
	return (
		<footer className="flex flex-col items-center justify-center w-full h-20  sticky bottom-0 bg-black">
			<ul className="flex flex-center justify-between w-full ">
				<Link
					href="/"
					className="flex flex-col items-center justify-center text-center w-full text-white">
					<HomeIcon size={32} />
					Home
				</Link>
				<Link
					href="statistics"
					className="flex flex-col items-center justify-center text-center w-full text-white">
					<DollarSign size={32} />
					STATISTICS
				</Link>
				{/* <Link
					href="expense"
					className="flex flex-col items-center justify-center text-center w-full">
					<Receipt size={32} />
					Work
				</Link> */}
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
