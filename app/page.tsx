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
		<main className="bg-gray-200 min-h-screen">
			{/* NavBar */}
			<nav
				className="flex flex-col justify-center bg-white sticky top-0 z-50
			">
				{/* <ul className="flex flex-center justify-between w-screen px-4 py-2">
					<Link href="#">Home</Link>
					<Link href="About">About</Link>
					<Link href="Tracking">Tracking</Link>
				</ul> */}

				<div className="flex flex-row items-center justify-between m-4">
					<User
						color="white"
						size={32}
						className=" bg-gray-600 rounded-full"
					/>

					{/* User */}
					<div className="flex bg-gray-100 rounded p-1">
						<h1 className="text-xl">Hyago</h1>

						{/* Dropdown */}

						{/* TODO: MAKE THIS BUTTON POSSIBLE TO CHANGE THE USER

						WHEN CLICK: WILL GENERATE A LIST OF USERS TO CHANGE
						*/}

						<button>
							<ChevronDown color="black" size={24} className="" />
						</button>
					</div>

					<BellIcon color="black" size={32} className="" />
				</div>
			</nav>

			{/* Content */}

			{/* Tracking option */}
			<div className="flex flex-row items-center bg-white m-2 rounded">
				{/* TODO: MAKE THIS CAR GO TO THE RIGHT WHEN THE USER CLICK TO START DRIVE, AND MAKE SOMETHING GREEN */}

				<div className="flex flex-row justify-between items-center gap-16 mx-1">
					<div className="flex flex-row items-center m-2 gap-2">
						<Car color="black" size={32} className="" />
						<button className="">Start Drive</button>
					</div>

					{/* TODO: THIS WILL BE FUNCTIONS, WILL UPDATE BY ITSELF */}
					<h3>0:30 - 11km</h3>
				</div>
			</div>

			<div className=" bg-white m-2 rounded h-screen">
				<h1 className="text-2xl">This is the home page</h1>

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
				<ul className="flex flex-center justify-between w-screen px-4 py-2 ">
					<Link href="#" className="flex flex-col items-center">
						<HomeIcon size={32} />
						Home
					</Link>
					<Link href="About" className="flex flex-col items-center">
						<CalendarSearch size={32} />
						Events
					</Link>
					<Link
						href="Tracking"
						className="flex flex-col items-center">
						<DollarSign size={32} />
						Earnings
					</Link>
				</ul>
			</footer>
		</main>
	);
}
