import { useRouter } from 'next/router'
import { useEffect } from 'react'
import routes from '~/config/routes'
import { useAuth, useRedirectToLogin } from '~/hooks'

export default function Private({
	isPrivate,
	isAdminRequired,
}: {
	isPrivate?: boolean
	isAdminRequired?: boolean
}) {
	const router = useRouter()

	const { isLogin, auth } = useAuth()

	const redirectToLogin = useRedirectToLogin()

	const user = auth?.data

	useEffect(() => {
		!isLogin &&
			(isPrivate || isAdminRequired) &&
			redirectToLogin()
		isAdminRequired && user?.role !== 'admin' && router.push(routes.home)
	}, [isAdminRequired, isLogin, isPrivate, redirectToLogin, router, user?.role])

	return null
}
