import { NextApiResponse, NextApiRequest } from 'next';

let intervalId: NodeJS.Timeout | null = null;
let time = 0;

export default function handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.method === 'POST') {
		// Start the stopwatch
		if (!intervalId) {
			intervalId = setInterval(() => {
				time++;
			}, 1000);
		}
	} else if (req.method === 'DELETE') {
		res.status(200).json({ time });

		// Reset the stopwatch
		time = 0;

		// Stop the stopwatch
		if (intervalId) {
			clearInterval(intervalId);
			intervalId = null;
		}
	}

	res.status(200).json({ time });
}
