import { useEffect } from 'react'

export default function useBeforeUnload(callback: () => boolean = () => true) {
	useEffect(() => {
		const handleBeforeUnload = (e: BeforeUnloadEvent) => {
			if (callback()) {
				e.preventDefault()
				e.returnValue = ''
			}
		}

		window.addEventListener('beforeunload', handleBeforeUnload)

		return () =>
			window.removeEventListener('beforeunload', handleBeforeUnload)
	}, [callback])
}
