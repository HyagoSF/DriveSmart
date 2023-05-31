'use client';

import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { motion as m } from 'framer-motion';
import { useEffect, useState } from 'react';

const lastWorkDay = async () => {
	const { data } = await axios.get('/api/delivery/getLastWorkDay');
	// console.log(data);
	return data;
};

export default function LastWorkDay({}: {}) {
	const { data, error, isLoading } = useQuery({
		queryKey: ['delivery'],
		queryFn: lastWorkDay,
	});

	return (
		<>
			<div className="bg-white rounded px-4 py-2 m-4 mt-10">
				<h1 className="font-bold py-2">CURRENT WEEK:</h1>

				<div className=" grid grid-cols-5 gap-1">
					<div className="flex flex-col justify-around bg-gray-400 items-center rounded text-gray-100 font-bold p-1 ">
						<h1 className="text-xs">DATE</h1>
						<h1>MAY 9</h1>
					</div>

					<div className="flex flex-col justify-around bg-green-600 items-center rounded text-gray-100 font-bold p-1 ">
						<h1 className="text-xs">EARNS</h1>
						<h1>$829</h1>
					</div>

					<div className="flex flex-col justify-around bg-yellow-600 items-center rounded text-gray-100 font-bold p-1 ">
						<h1 className="text-xs">TIME</h1>
						<h1>6h 12m</h1>
					</div>

					<div className="flex flex-col justify-around bg-red-700 items-center rounded text-gray-100 font-bold p-1 ">
						<h1 className="text-xs">DRIVEN</h1>
						<h1>134KM</h1>
					</div>

					<div className="flex flex-col justify-around bg-green-600 items-center rounded text-gray-100 font-bold p-1 ">
						<h1 className="text-xs">HOURLY</h1>
						<h1>$89/H</h1>
					</div>
				</div>
			</div>
		</>
	);
}
