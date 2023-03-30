import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { authService } from '~/apiServices'
import { ResDataWithAccessToken } from '~/apiServices/authService'
import { User } from '~/apiServices/usersService'
import queryKeys from '~/config/queryKeys'

export default function useAuth() {
	const [isLogin, setIsLogin] = useState(false)

	const queryClient = useQueryClient()

	useEffect(() => {
		setIsLogin(!!localStorage.getItem('isLogin'))
	}, [])

	const { data: auth } = useQuery(
		queryKeys.refreshToken,
		() => authService.refreshToken(),
		{
			enabled: isLogin,
			staleTime: 1 * 60 * 60 * 1000,
			onError() {
				logout()
			},
		}
	)

	function update(data: ResDataWithAccessToken | null | undefined) {
		queryClient.setQueryData(queryKeys.refreshToken, data)
	}

	function updateUser(data: User) {
		queryClient.setQueryData(queryKeys.refreshToken, { ...auth, data })
	}

	function login(data: ResDataWithAccessToken | null | undefined) {
		update(data)
		localStorage.setItem('isLogin', 'true')
	}

	function logout() {
		update(null)
		localStorage.removeItem('isLogin')
	}

	return {
		auth,
		update,
		login,
		logout,
		isLogin: !!(auth?.data && auth.accessToken),
		updateUser,
	}
}
