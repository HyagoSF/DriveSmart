import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

interface CustomDateRangePickerProps {
	onChange: (dateRange: {
		startDate: Date | null;
		endDate: Date | null;
	}) => void;
}

export default function CustomDateRangePicker({
	onChange,
}: CustomDateRangePickerProps) {
	const [startDate, setStartDate] = useState<Date | null>(null);
	const [endDate, setEndDate] = useState<Date | null>(null);

	const handleDateRangeChange = (
		newStartDate: Date | null,
		newEndDate: Date | null
	) => {
		setStartDate(newStartDate);
		setEndDate(newEndDate);
		onChange({ startDate: newStartDate, endDate: newEndDate });
	};

	const dayClassNames = (date: Date) => {
		return 'text-gray-700';
	};

	return (
		<div className="my-4 flex flex-col md:flex-row justify-center items-center bg-white">
			<DatePicker
				selected={startDate}
				startDate={startDate}
				endDate={endDate}
				onChange={(date) => handleDateRangeChange(date[0], date[1])}
				selectsRange
				inline
				className="border border-gray-300 rounded-md p-2"
				calendarClassName="bg-white shadow-md rounded-md custom-calendar"
				dayClassName={dayClassNames}
				todayButton="Today"
				dateFormat="yyyy/dd/MM"
			/>

			{startDate && endDate && (
				<div className="flex flex-col justify-center w-full items-center mt-2 p">
					<p className="text-gray-700">Deliveries from</p>
					<span className="text-gray-700 font-bold">
						{startDate?.toString().slice(0, 10)}
					</span>
					<p className="text-gray-700 ">to</p>
					<span className="text-gray-700 font-bold">
						{endDate?.toString().slice(0, 10)}
					</span>
				</div>
			)}
		</div>
	);
}
