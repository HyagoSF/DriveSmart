// When the user login, he is going to be redirected to the home page, and the Nav component will be rendered.

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
// import DeliveryForm from './components/DeliveryForm';

export default function HomePage() {
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

			<div className=" bg-white m-2 rounded h-40">
				<h1 className="text-2xl">This week small summary</h1>
			</div>
		</main>
	);
}
