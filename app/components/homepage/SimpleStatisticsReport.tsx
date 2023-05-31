export default function SimpleStatisticsReport({
	name,
	dateFormatted,
	liquidEarnings,
	totalHours,
	totalKms,
	liquidHourlyRate,
}: {
	name?: string;
	dateFormatted: string;
	liquidEarnings: number;
	totalHours: string;
	totalKms: number;
	liquidHourlyRate: number;
}) {
	return (
		<div className="bg-white rounded px-4 py-2 m-4 mt-4">
			<h1 className="font-bold py-2">{name ? `${name}:` : ''}</h1>

			<div className=" grid grid-cols-5 gap-1">
				<div className="flex flex-col justify-around bg-gray-400 items-center rounded text-gray-100 font-bold p-1 ">
					<h1 className="text-xs">DATE</h1>
					<h1>{dateFormatted}</h1>
				</div>

				<div className="flex flex-col justify-around bg-green-600 items-center rounded text-gray-100 font-bold p-1 ">
					<h1 className="text-xs">EARNS</h1>
					<h1>${liquidEarnings}</h1>
				</div>

				<div className="flex flex-col justify-around bg-yellow-600 items-center rounded text-gray-100 font-bold p-1 ">
					<h1 className="text-xs">TIME</h1>
					<h1>{totalHours}</h1>
				</div>

				<div className="flex flex-col justify-around bg-red-700 items-center rounded text-gray-100 font-bold p-1 ">
					<h1 className="text-xs">DRIVEN</h1>
					<h1>{totalKms} km</h1>
				</div>

				<div className="flex flex-col justify-around bg-green-600 items-center rounded text-gray-100 font-bold p-1 ">
					<h1 className="text-xs">HOURLY</h1>
					<h1>${liquidHourlyRate}/h</h1>
				</div>
			</div>
		</div>
	);
}
