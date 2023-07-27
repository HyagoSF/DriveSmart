import Image from 'next/image';
import { signOut } from 'next-auth/react';
import RedArrowIcon from './RedArrowIcon';

import CarIconNavBar from '../../images/navbar/CarIconNavBar.png';

import Link from 'next/link';

import { motion as m } from 'framer-motion';

export default function SideBar({
	setShowMenu,
	session,
}: {
	setShowMenu: Function;
	session: any;
}) {
	return (
		<m.div
			animate={{ x: 0 }}
			initial={{ x: -1000 }}
			transition={{ duration: 0.5 }}
			className="backdrop-blur-md fixed w-screen h-full z-30 left-0 rounded-sm -mt-20"
			onClick={() => setShowMenu(false)}>

			<div className="h-screen w-10/12 bg-white top-0 left-0 flex flex-col items-start justify-evenly fixed">
				<div className="ml-1 border-l-2 border-red-600 h-full w-full bg-white ">
					{/* this div to organize the things */}
					<div className="flex flex-col items-start w-full bg-gray-50 ">
						<div className="flex items-center gap-2  py-2 pl-2 w-full relative">
							<Image
								src={CarIconNavBar}
								width={64}
								height={64}
								alt="CarIcon"
								className="rounded-full w-16"
							/>

							<h1>
								Hello,{' '}
								<span className="font-bold">
									{session.user.name || ''} !
								</span>
							</h1>
						</div>

						<div className="flex flex-col items-center gap-4 w-48 pl-2 mt-8">
							<Link href={'/'} className="flex gap-2 w-full">
								<RedArrowIcon
									width={16}
									height={8}
									paddingY={1}
								/>
								<h1 className="font-extrabold">HOME</h1>
							</Link>
							<Link
								href={'/statistics'}
								className="flex gap-2 w-full">
								<RedArrowIcon
									width={16}
									height={8}
									paddingY={1}
								/>
								<h1 className="font-extrabold">STATISTICS</h1>
							</Link>

							<div className="flex gap-2 w-full">
								<RedArrowIcon
									width={16}
									height={8}
									paddingY={1}
								/>
								<h1 className="font-extrabold italic">
									GOLDEN HOUR*
								</h1>
							</div>
							<div className="flex gap-2 w-full">
								<RedArrowIcon
									width={16}
									height={8}
									paddingY={1}
								/>
								<h1 className="font-extrabold">ADD EXTRA $</h1>
							</div>
						</div>

						<button
							onClick={() => {
								signOut();
							}}
							className="font-extrabold text-xs px-4 pt-6 text-gray-500 ">
							LOG OUT
						</button>
					</div>
				</div>
			</div>
		</m.div>
	);
}
