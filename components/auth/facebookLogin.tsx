import { useMutation } from '@tanstack/react-query'
import { ReactFacebookLoginInfo } from 'react-facebook-login'
import RootFacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import { authService } from '~/apiServices'
import { useAuth } from '~/hooks'
import { FacebookIcon } from '../icons'
import SocialLoginButton from './socialLoginButton'

export default function FaceBookLogin() {
	const { login } = useAuth()

	const { mutate } = useMutation(authService.facebookLogin, {
		onSuccess(data) {
			login(data)
		},
	})

	return (
		<RootFacebookLogin
			appId={process.env.NEXT_PUBLIC_FACEBOOK_APP_ID as string}
			callback={(response: ReactFacebookLoginInfo) => {
				mutate({
					accessToken: response.accessToken,
					userID: response.userID,
				})
			}}
			render={renderProps => (
				<SocialLoginButton
					icon={FacebookIcon}
					onLogin={renderProps.onClick}
				/>
			)}
		/>
	)
}
