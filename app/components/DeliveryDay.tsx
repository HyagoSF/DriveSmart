'use client';

interface DeliveryDayProps {
	id: string;
	date: String;
	totalHours: number;
	totalKms: number;
	grossEarnings: number;
	liquidEarnings: number;
	gasPrice: number;
	gasLiters: number;
	gasSpent: number;
	liquidHourlyRate: number;
}

export default function DeliveryDay({
	id,
	date,
	totalHours,
	totalKms,
	grossEarnings,
	liquidEarnings,
	gasPrice,
	gasLiters,
	gasSpent,
	liquidHourlyRate
}: DeliveryDayProps) {
	return (
		<ul className="border pt-4 px-4">
			<li
				key={id}
				className="bg-white shadow-md rounded-lg p-4 grid grid-cols-2 gap-2">
				<p className=" font-medium">Date:</p>
				<p className="text-right font-medium">
					{date.toString().slice(0, 10)}
				</p>
				<p className="text-blue-500 font-medium">Total Hours:</p>
				<p className="text-right text-blue-500">{totalHours} Hours</p>
				<p className="text-blue-500 font-medium">Total Kilometers:</p>
				<p className="text-right text-blue-500">{totalKms} Km</p>
				<p className="text-green-500 font-medium">Gross Earnings:</p>
				<p className="text-right text-green-500">${grossEarnings}</p>
				


				<p className="text-green-500 font-medium">Liquid Hourly:</p>
				<p className="text-right text-green-500">${liquidHourlyRate}/h</p>

				<p className="text-green-500 font-medium">Liquid Earnings:</p>
				<p className="text-right text-green-500">${liquidEarnings}</p>
				<p className="text-red-500 font-medium">Gas Price:</p>
				<p className="text-right text-red-500">{gasPrice}</p>
				<p className="text-red-500 font-medium">Gas Liters:</p>
				<p className="text-right text-red-500">{gasLiters} Liters</p>
				<p className="text-red-500 font-medium">Gas Spent:</p>
				<p className="text-right text-red-500">${gasSpent}</p>
			</li>
		</ul>
	);
}


