import Link from 'next/link';

export default function Home() {
	return (
		<main>
			<nav className="">
				<ul className="flex flex-center justify-end gap-4 p-4 text-gray-500 w-screen">
					<Link href="#">Home</Link>
					<Link href="About">About</Link>
				</ul>
			</nav>

			<h1 className={`font-open-sans`}>inter</h1>
			<h1 className={`font-open-sans`}>test</h1>
			<h1 className={``}>inter</h1>
		</main>
	);
}
