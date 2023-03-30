import { useEffect, useState } from 'react'
import breakpoints from '~/config/breakpoints'
import useIsMounted from './useIsMounted'

type Prefix = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'

export type Matchers = Prefix | [Prefix] | [Prefix, Prefix]

export default function useResponsive() {
	const [width, setWidth] = useState(0)

	const isMounted = useIsMounted()

	useEffect(() => {
		handleResize()

		function handleResize() {
			setWidth(window.innerWidth)
		}

		window.addEventListener('resize', handleResize)

		return () => {
			window.removeEventListener('resize', handleResize)
		}
	}, [])

	function match(matchers: Matchers) {
		return (
			isMounted &&
			(typeof matchers === 'string'
				? width >= breakpoints[matchers]
				: matchers.length === 1
				? width <= breakpoints[matchers[0]]
				: width >= breakpoints[matchers[0]] &&
				  width <= breakpoints[matchers[1]])
		)
	}

	return { width, match }
}
