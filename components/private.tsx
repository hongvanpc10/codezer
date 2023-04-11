import { useRouter } from 'next/router'
import { useEffect } from 'react'
import routes from '~/config/routes'
import { useAuth } from '~/hooks'

export default function Private({
	isPrivate,
	isAdminRequired,
}: {
	isPrivate?: boolean
	isAdminRequired?: boolean
}) {
	const router = useRouter()

	const { isLogin, auth } = useAuth()

	const user = auth?.data

	useEffect(() => {
		!isLogin &&
			(isPrivate || isAdminRequired) &&
			router.push(routes.login + '?redirectFrom=' + router.asPath)
		isAdminRequired && user?.role !== 'admin' && router.push(routes.home)
	}, [isAdminRequired, isLogin, isPrivate, router, user?.role])

	return null
}
