import { useState, useEffect, useRef } from 'react'

export default function useInView(options?: IntersectionObserverInit) {
	const [inView, setInView] = useState(false)

	const ref = useRef(null)

	useEffect(() => {
		if (!ref.current) return

		const observer = new IntersectionObserver(
			([entry]) => setInView(entry.isIntersecting),
			options
		)

		observer.observe(ref.current)

		return () => {
			ref.current && observer.unobserve(ref.current)
		}
	}, [ref, options])

	return { ref, inView }
}
