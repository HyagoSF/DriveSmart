'use client';

import { useEffect, useState } from 'react';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';

import toast, { Toaster } from 'react-hot-toast';
import { DollarSign } from 'lucide-react';

type Dollars = number | null;
type Liters = number | null;

type allVariablesMine = {
	date: string;
	totalHours: number;
	totalKms: number;
	grossEarnings: Dollars;
	liquidEarnings: Dollars;
	gasPrice: Dollars;
	gasLiters: Liters;
	gasSpent: Dollars;
};

export default function DeliveryForm() {
	// const [title, setTitle] = useState('');
	const [date, setDate] = useState('');
	const [totalHours, setTotalHours] = useState<number>(0);
	const [totalKms, setTotalKms] = useState<number>(0);
	const [grossEarnings, setGrossEarnings] = useState<Dollars>(0);
	const [liquidEarnings, setLiquidEarnings] = useState<Dollars>(0);
	const [gasPrice, setGasPrice] = useState<Dollars>(0);

	const [gasLiters, setGasLiters] = useState<Liters>(0);
	const [gasSpent, setGasSpent] = useState<Dollars>(0);

	const [isDisabled, setIsDisabled] = useState(false);
	let toastPostId: string;

	// To access the client, and use the queryClient to invalidate the query ( to refetch the data when the mutation is done)
	const queryClient = useQueryClient();

	// EFFECTS
	useEffect(() => {
		if (totalKms && grossEarnings && gasPrice) {
			const gasLiters = totalKms / 13; // Assuming 13 km per liter
			const gasSpent = gasLiters * gasPrice;
			const liquidEarnings = grossEarnings - gasSpent;

			setLiquidEarnings(+liquidEarnings.toFixed(2));
			setGasLiters(+gasLiters.toFixed(2));
			setGasSpent(+gasSpent.toFixed(2));
		} else {
			// setLiquidEarnings(null);
			// setGasLiters(null);
			// setGasSpent(null);
		}
	}, [totalKms, grossEarnings, gasPrice]);

	// useEffect(() => {
	// 	console.log(grossEarnings);
	// }, [grossEarnings]);

	// NOTIFICATIONS
	const notify = (message: string, type: string) => {
		if (type === 'loading') {
			toastPostId = toast.loading(message);
			return toastPostId;
		}
		if (type === 'error') {
			return toast.error(message, { id: toastPostId });
		}
		if (type === 'success') {
			return toast.success(message, { id: toastPostId });
		}
	};

	// HANDLERS
	const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const date = event.target.value;
		if (date === '') {
			setDate('');
		}
		setDate(date);
	};

	const handleTotalHoursChange = (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		const totalHours = Number(event.target.value);
		if (totalHours === 0) {
			setTotalHours(0);
		}
		setTotalHours(totalHours);
	};

	const handleTotalKmsChange = (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		const totalKms = Number(event.target.value);
		if (totalKms === 0) {
			setTotalKms(0);
		}
		setTotalKms(totalKms);
	};

	const handleGrossEarningsChange = (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		const grossEarnings = Number(event.target.value);
		if (grossEarnings === 0) {
			// setGrossEarnings(0);
			setGrossEarnings(null);
		}
		setGrossEarnings(Number(event.target.value));
	};

	const handleGasPriceChange = (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		const gasPrice = Number(event.target.value);
		if (gasPrice === 0) {
			setGasPrice(null);
		}
		setGasPrice(Number(event.target.value));
	};

	// SUBMIT HANDLER
	const onSubmitFormHandler = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setIsDisabled(true);
		// notify('Success', 'success');
		// notify('Loading...', 'loading');
		// mutate all my states
		mutate({
			date: date,
			totalHours: totalHours,
			totalKms: totalKms,
			grossEarnings: grossEarnings,
			gasPrice: gasPrice,
			liquidEarnings: liquidEarnings,
			gasLiters: gasLiters,
			gasSpent: gasSpent,
		});
	};

	// QUERIES
	// Create a mutation/delivery
	const { mutate } = useMutation(
		async ({
			date,
			totalHours,
			totalKms,
			grossEarnings,
			gasPrice,
			liquidEarnings,
			gasLiters,
			gasSpent,
		}: allVariablesMine) => {
			await axios.post('/api/delivery/addDelivery', {
				value: {
					date,
					totalHours,
					totalKms,
					grossEarnings,
					gasPrice,
					liquidEarnings,
					gasLiters,
					gasSpent,
				},
			});
		},
		{
			onError: (err: any) => {
				const errorMessage = err?.response?.data.message;
				// notify(errorMessage);
				if (err instanceof AxiosError) {
					notify(errorMessage, 'error');
				}
				setIsDisabled(false);
			},
			onSuccess: (data) => {
				console.log(data);
				// const successMessage = data.data.message;
				queryClient.invalidateQueries({ queryKey: ['delivery'] });

				// notify(successMessage, 'success');
				notify('Success', 'success');

				// Reset all the states
				setDate('');
				setTotalHours(0);
				setTotalKms(0);
				setGrossEarnings(0);
				setLiquidEarnings(0);
				setGasPrice(0);
				setGasLiters(0);
				setGasSpent(0);
				setIsDisabled(false);
			},
		}
	);

	return (
		<form
			onSubmit={onSubmitFormHandler}
			className="bg-white my-8 p-8 rounded-md">
			{/* Here is for the toaster notification */}

			<Toaster position="top-center" reverseOrder={false} />

			<h1 className="text-center text-3xl mb-8">Delivery</h1>
			{/* <form className="w-full max-w-lg"> */}
			<div className="flex flex-wrap -mx-3 ">
				<div className="w-full md:w-1/2 px-3">
					<label
						className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
						htmlFor="date">
						Date
					</label>
					<input
						className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
						id="date"
						name="date"
						type="date"
						value={date}
						onChange={handleDateChange}
						placeholder="YYYY-MM-DD"
						// required
					/>
				</div>
				<div className="w-full md:w-1/2 px-3">
					<label
						className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
						htmlFor="total_hours">
						Total Hours
					</label>
					<input
						className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
						id="total_hours"
						name="total_hours"
						value={totalHours === 0 ? '' : totalHours}
						onChange={handleTotalHoursChange}
						type="number"
						placeholder="Enter total hours"
					/>
				</div>
				<div className="w-full md:w-1/2 px-3">
					<label
						className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
						htmlFor="total_kms">
						Total Kms
					</label>
					<input
						className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
						id="total_kms"
						name="total_kms"
						value={totalKms === 0 ? '' : totalKms}
						onChange={handleTotalKmsChange}
						type="number"
						placeholder="Enter total kms"
					/>
				</div>
				<div className="w-full md:w-1/2 px-3 relative">
					<DollarSign
						size={16}
						className="absolute inset-y-0 left-0 mt-10 ml-6 flex items-center text-gray-700"
					/>
					<label
						className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
						htmlFor="gross_earnings">
						Gross Earnings
					</label>
					<input
						className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 pl-8 mb-3 leading-tight focus:outline-none focus:bg-white"
						id="gross_earnings"
						name="gross_earnings"
						value={grossEarnings === 0 ? '' : grossEarnings}
						onChange={handleGrossEarningsChange}
						type="number"
						placeholder="Enter gross earnings"
					/>
				</div>

				<div className="w-full md:w-1/2 px-3">
					<label
						className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
						htmlFor="gas_price">
						Gas Price
					</label>
					<input
						className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
						id="gas_price"
						name="gas_price"
						value={gasPrice === 0 ? '' : gasPrice}
						onChange={handleGasPriceChange}
						type="number"
						step="0.001"
						placeholder="Enter gas price"
					/>
				</div>

				<button
					disabled={isDisabled}
					type="submit"
					className="w-full bg-green-500 text-white font-bold py-2 px-6 rounded-xl disabled:opacity-25 ">
					Add Delivery Day
				</button>

				{gasLiters !== 0 && gasLiters !== null && (
					<div className="w-full md:w-1/2 px-3 relative mt-4 ">
						<label className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 pl-8 mb-3 leading-tight focus:outline-none focus:bg-white">
							Total gas used: &nbsp;
							<span className="text-green-600 font-bold ">
								{gasLiters.toFixed(2)} L
							</span>
						</label>
					</div>
				)}
				{gasSpent !== 0 && gasSpent !== null && (
					<div className="w-full md:w-1/2 px-3 relative mt-4 ">
						<label className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 pl-8 mb-3 leading-tight focus:outline-none focus:bg-white">
							Total spent on gas: &nbsp;
							<span className="text-green-600 font-bold ">
								$ {gasSpent.toFixed(2)}
							</span>
						</label>
					</div>
				)}
				{liquidEarnings !== 0 && liquidEarnings != null && (
					<div className="w-full md:w-1/2 px-3 relative mt-4 ">
						<label className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 pl-8 mb-3 leading-tight focus:outline-none focus:bg-white">
							Liquid Earnings: &nbsp;
							<span className="text-green-600 font-bold ">
								$ {liquidEarnings.toFixed(2)}
							</span>
						</label>
					</div>
				)}
			</div>
		</form>
	);
}
