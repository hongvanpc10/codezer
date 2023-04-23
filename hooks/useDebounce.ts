import { useEffect, useState } from 'react'

export default function useDebounce(value: any, delay = 500) {
	const [debounced, setDebounced] = useState(value)

	useEffect(() => {
		const timeoutId = setTimeout(() => {
			setDebounced(value)
		}, delay)

		return () => {
			clearTimeout(timeoutId)
		}
    }, [delay, value])
    
    return debounced
}
