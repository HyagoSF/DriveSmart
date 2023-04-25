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

export default function Home() {
	return (
		<main className=" min-h-screen">
			{/* Content */}

			{/* Tracking option */}
			<div className="items-center bg-white m-2 rounded">
				{/* TODO: MAKE THIS CAR GO TO THE RIGHT WHEN THE USER CLICK TO START DRIVE, AND MAKE SOMETHING GREEN */}

				<div className="flex flex-row justify-between items-center gap-16 mx-1">
					<div className="flex flex-row items-center m-2 gap-2">
						<Car color="black" size={32} className="" />
						<button className="">Start Drive</button>
					</div>

					{/* TODO: THIS WILL BE FUNCTIONS, WILL UPDATE BY ITSELF */}
					<h3>0:30 11km</h3>
				</div>
			</div>

			<div className=" bg-white m-2 rounded h-screen">
				<h1 className="text-2xl">This week</h1>

				<div className="">
					<p>
						Lorem ipsum dolor sit amet consectetur adipisicing Lorem
						ipsum dolor, sit amet consectetur adipisicing elit.
						Facilis, expedita cum deleniti nostrum voluptas soluta
						tempora quia et recusandae voluptate sed reprehenderit
						ab magni provident voluptatibus, doloribus molestias
						consectetur necessitatibus. elit. Ad ipsa ut, ipsum
						repudiandae, beatae quam at modi
					</p>
				</div>
			</div>

			{/* Footer */}
			<footer className="flex flex-col items-center justify-center w-screen h-16 bg-white sticky bottom-0 ">
				<ul className="flex flex-center justify-between w-screen p-4 py-2 ">
					<Link href="#" className="flex flex-col items-center w-12">
						<HomeIcon size={32} />
						Home
					</Link>
					<Link
						href="about"
						className="flex flex-col items-center w-12">
						<CalendarSearch size={32} />
						Events
					</Link>
					<Link
						href="tracking"
						className="flex flex-col items-center w-12">
						<DollarSign size={32} />
						Earnings
					</Link>
				</ul>
			</footer>
		</main>
	);
}
