import { useEffect, useState } from 'react'

export default function useScroll() {
	const [lastScroll, setLastScroll] = useState(0)
	const [isScrollUp, setIsScrollUp] = useState(true)

	useEffect(() => {
		const handleScroll = () => {
			const currentScroll = window.scrollY

			setIsScrollUp(currentScroll <= lastScroll)

			setLastScroll(currentScroll)
		}

		window.addEventListener('scroll', handleScroll)

		return () => window.removeEventListener('scroll', handleScroll)
	}, [lastScroll])

	function scrollTo(top: number) {
		window && window.scrollTo({ top, left: 0, behavior: 'smooth' })
	}

	return { isScrollUp, scrollTop: lastScroll, scrollTo }
}
