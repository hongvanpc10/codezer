import { useQuery } from '@tanstack/react-query'
import getWeatherData from '~/apiServices/weatherService'
import { useGeolocation } from '~/hooks'
import Image from './image'
import Skeleton from './skeleton'

export default function Weather() {
	const { location, error } = useGeolocation()

	const { data, error: getDataError } = useQuery(
		['weather'],
		() =>
			getWeatherData(
				location?.latitude as number,
				location?.longitude as number
			),
		{ enabled: !!location }
	)

	return !getDataError && !error ? (
		<div className='inline-flex px-4 py-1.5 rounded-3xl bg-white/95 backdrop-blur shadow-xl shadow-blue-900/5 items-center'>
			{data ? (
				<>
					<Image
						alt=''
						src={`http://openweathermap.org/img/wn/${data?.weather[0].icon}@2x.png`}
						width={11}
						height={11}
						containerClassName='-mx-3 -my-10'
					/>
					<div className='ml-3 text-lg flex items-start font-semibold'>
						{Math.round(data?.main.temp as number)}
						<span className='text-blue-600 text-sm ml-1'>°C</span>
					</div>
				</>
			) : (
				<Skeleton height={7} width='4.2rem' rounded='lg' />
			)}
		</div>
	) : null
}
