import Link from 'next/link';

export default function About() {
	return (
		<div className="">
			<nav className="">
				<ul className="flex flex-center justify-end gap-4 p-4 text-gray-500 w-screen">
					<Link href="#">Home</Link>
					<Link href="About">About</Link>
				</ul>
			</nav>

			<h1 className="mt-10">This is the about page</h1>

			<div>
				<p>
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad
					ipsa ut, ipsum repudiandae, beatae quam at modi eos ullam
					aut vel exercitationem magnam obcaecati adipisci saepe culpa
					deserunt fuga eligendi.
				</p>
			</div>
		</div>
	);
}
