import axios from 'axios'

interface Data {
	main: {
		temp: number
	}
	weather: [
		{
			icon: string
		}
	]
}

export default async function getWeatherData(lat: number, lon: number) {
	const res = await axios.get<Data>(
		process.env.NEXT_PUBLIC_OPEN_WEATHER_MAP_API_URL as string,
		{
			params: {
				appid: process.env.NEXT_PUBLIC_OPEN_WEATHER_MAP_API_KEY,
				lat: lat,
				lon: lon,
				units: 'metric',
			},
		}
	)

	return res.data
}
