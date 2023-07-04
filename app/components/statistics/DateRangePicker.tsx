// import 'node_modules/react-datepicker/src/stylesheets/datepicker.scss';
import './variables.scss';

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
		<div className="my-4 flex flex-col md:flex-row justify-center items-center">
			<DatePicker
				selected={startDate}
				startDate={startDate}
				endDate={endDate}
				onChange={(date) => handleDateRangeChange(date[0], date[1])}
				selectsRange
				inline
				// block
				// calendarClassName=" rounded-md custom-calendar rounded-md p-1 "
				// dayClassName={dayClassNames}
				// monthClassName={(date: Date) => 'text-gray-700'}
				// weekDayClassName={(date: Date) => 'text-red'}
				// dayClassName={() => 'text-black '}
				todayButton="Today"
				dateFormat="yyyy/dd/MM"
			/>

			{/* dayClassName?(date: Date): string | null;
				weekDayClassName?(date: Date): string | null;
				monthClassName?(date: Date): string | null;
				timeClassName?(date: Date): string | null; 
			*/}


			{startDate && endDate && (
				<div className="flex flex-col justify-center w-full items-center mt-2 p">
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
