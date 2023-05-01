import { useRouter } from 'next/router'
import routes from '~/config/routes'

export default function useRedirectToLogin() {
	const router = useRouter()
	
	return () => {
		router.push(routes.login + '?redirect-from=' + router.asPath)
	}
}
