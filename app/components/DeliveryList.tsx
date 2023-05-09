// 'use client';

// import React, { useState } from 'react';
// import axios from 'axios';
// import { useQuery } from '@tanstack/react-query';
// import DeliveryDay from './DeliveryDay';

// // all work expenses
// const allDelivery = async () => {
// 	const { data } = await axios.get('/api/delivery/getDelivery');
// 	// console.log(data);
// 	return data;
// };

// export default function DeliveryList() {
// 	const [showList, setShowList] = useState(false);

// 	// I can add a type to useQuery to make it more specific
// 	const { data, error, isLoading } = useQuery({
// 		queryKey: ['delivery'],
// 		queryFn: allDelivery,
// 	});

// 	const handleShowList = () => {
// 		setShowList(!showList);
// 	};

// 	return (
// 		<>
// 			<h1
// 				onClick={handleShowList}
// 				className="flex justify-center w-full bg-white rounded-md mt-4 text-3xl cursor-pointer px-8 py-2">
// 				Delivery List
// 			</h1>

// 			{isLoading && <p>Loading...</p>}
// 			{/* {error && <p>Error: {error}</p>} */}

// 			{showList &&
// 				data?.map((deliveryDay: any) => (
// 					<DeliveryDay
// 						key={deliveryDay.id}
// 						id={deliveryDay.id}
// 						date={deliveryDay.date}
// 						totalHours={deliveryDay.totalHours}
// 						totalKms={deliveryDay.totalKms}
// 						grossEarnings={deliveryDay.grossEarnings}
// 						liquidEarnings={deliveryDay.liquidEarnings}
// 						gasPrice={deliveryDay.gasPrice}
// 						gasLiters={deliveryDay.gasLiters}
// 						gasSpent={deliveryDay.gasSpent}
// 					/>
// 				))}
// 		</>
// 	);
// }
'use client';

import React, { useState } from 'react';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import DeliveryDay from './DeliveryDay';
import DateRangePicker from './DateRangePicker';

// all work expenses
const allDelivery = async () => {
	const { data } = await axios.get('/api/delivery/getDelivery');
	// console.log(data);
	return data;
};

export default function DeliveryList() {
	const [showList, setShowList] = useState(false);
	const [selectedDateRange, setSelectedDateRange] = useState(null);

	// I can add a type to useQuery to make it more specific
	const { data, error, isLoading } = useQuery({
		queryKey: ['delivery'],
		queryFn: allDelivery,
	});

	const handleShowList = () => {
		setShowList(!showList);
	};

	const handleDateRangeChange = (dateRange) => {
		setSelectedDateRange(dateRange);
	};

	const filteredDeliveryDays = data?.filter((deliveryDay) => {
		if (!selectedDateRange) {
			return true;
		}
		const deliveryDayDate = new Date(deliveryDay.date);
		return (
			deliveryDayDate >= selectedDateRange.startDate &&
			deliveryDayDate <= selectedDateRange.endDate
		);
	});

	return (
		<>
			<h1
				onClick={handleShowList}
				className="flex justify-center w-full bg-white rounded-md mt-4 text-3xl cursor-pointer px-8 py-2">
				Delivery List
			</h1>

			<DateRangePicker onChange={handleDateRangeChange} />

			{isLoading && <p>Loading...</p>}
			{/* {error && <p>Error: {error}</p>} */}

			{selectedDateRange &&
				filteredDeliveryDays?.map((deliveryDay: any) => (
					<DeliveryDay
						key={deliveryDay.id}
						id={deliveryDay.id}
						date={deliveryDay.date}
						totalHours={deliveryDay.totalHours}
						totalKms={deliveryDay.totalKms}
						grossEarnings={deliveryDay.grossEarnings}
						liquidEarnings={deliveryDay.liquidEarnings}
						gasPrice={deliveryDay.gasPrice}
						gasLiters={deliveryDay.gasLiters}
						gasSpent={deliveryDay.gasSpent}
						liquidHourlyRate={deliveryDay.liquidHourlyRate}
					/>
				))}
		</>
	);
}
