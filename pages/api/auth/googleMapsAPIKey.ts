export default function handler(req: NextApiRequest, res: NextApiResponse) {
	const googleMapsAPIKey = process.env.GOOGLE_MAPS_API_KEY;

	res.status(200).json({ googleMapsAPIKey });
}
