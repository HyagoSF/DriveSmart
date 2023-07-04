// 'use client';


import DeliveryList from '../components/statistics/DeliveryList';

// IMPORTS FOR TRYING TO MAKE THIS PAGE ONLY ACCESSIBLE TO LOGGED IN USERS
// import { useEffect } from 'react';
// import { getServerSession } from 'next-auth/next';
// import { authOptions } from '../../pages/api/auth/[...nextauth]';
// import { useRouter } from 'next/navigation';

export default function Delivery() {
	// TODO: AGAIN I WAS TRYING TO MAKE THIS PAGE ONLY ACCESSIBLE TO LOGGED IN USERS BUT I COULDN'T GET IT TO WORK
	// const router = useRouter();

	// useEffect(() => {
	// 	async function checkAuth() {
	// 		const session = await getServerSession(authOptions);

	// 		if (!session) {
	// 			router.push('/');
	// 		}
	// 	}

	// 	checkAuth();
	// }, []);

	return (
		<div className=" min-h-screen">
			<DeliveryList />

			{/* <DeliveryForm /> */}
		</div>
	);
}
