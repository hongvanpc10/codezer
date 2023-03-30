import { useGoogleLogin } from '@react-oauth/google'
import { useMutation } from '@tanstack/react-query'
import { authService } from '~/apiServices'
import { useAuth } from '~/hooks'
import { GoogleIcon } from '../icons'
import SocialLoginButton from './socialLoginButton'

export default function GoogleLogin() {
	const { login } = useAuth()

	const { mutate } = useMutation(authService.googleLogin, {
		onSuccess(data) {
			login(data)
		},
	})

	const googleLogin = useGoogleLogin({
		onSuccess: response => {
			mutate(response.code)
		},
		flow: 'auth-code',
	})

	return <SocialLoginButton icon={GoogleIcon} onLogin={googleLogin} />
}
