'use client';

import axios from 'axios';
import React, { useState, useEffect } from 'react';

const Stopwatch = () => {
	const [time, setTime] = useState(0);

	const startTimer = async () => {
		await axios.post('/api/timer/timer').then((res) => {
			if (res.status === 200) {
				console.log('Timer started');
			}
		});
	};

	const stopTimer = async () => {
		await axios.delete('/api/timer/timer').then((res) => {
			console.log('total time driven: ' + res.data.time);

			if (res.status === 200) {
				console.log('Timer stopped');
			}
		});
	};

	useEffect(() => {
		const fetchTime = async () => {
			await axios.get('/api/timer/timer').then((res) => {
				setTime(res.data.time);
			});
		};

		const intervalId = setInterval(fetchTime, 1000);

		return () => {
			clearInterval(intervalId);
		};
	}, []);

	return (
		<div>
			<h1>{time}</h1>
			<button onClick={startTimer} className={'block'}>
				Start
			</button>
			<button onClick={stopTimer}>Stop</button>
		</div>
	);
};

export default Stopwatch;
