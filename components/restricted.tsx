import { useRouter } from 'next/router'
import { useEffect } from 'react'
import routes from '~/config/routes'
import { useAuth } from '~/hooks'

export default function Restricted({
	isRestricted,
}: {
	isRestricted?: boolean
}) {
	const router = useRouter()

	const { isLogin } = useAuth()

	useEffect(() => {
		isLogin && isRestricted && router.push(routes.home)
	}, [isLogin, isRestricted, router])

	return null
}
