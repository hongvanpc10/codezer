import { ReactElement } from 'react'
import { useResponsive } from '~/hooks'
import { Matchers } from '~/hooks/useResponsive'

interface Props {
	children: ReactElement
	matchers: Matchers
}

export default function Responsive({ children, matchers }: Props) {
	const { match } = useResponsive()

	return match(matchers) ? children : null
}
