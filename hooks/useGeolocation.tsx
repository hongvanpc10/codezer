import { useState, useEffect } from 'react'

export default function useGeolocation() {
	const [location, setLocation] = useState<GeolocationCoordinates>()
	const [error, setError] = useState<GeolocationPositionError | string>()

	useEffect(() => {
		if (!navigator.geolocation) {
			setError('Geolocation is not available')
		}

		navigator.geolocation.getCurrentPosition(
			position => setLocation(position.coords),
			setError
		)
	}, [])

	return { location, error }
}
