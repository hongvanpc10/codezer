import { Icon } from '../icons'

interface Props {
	icon: Icon
	onLogin: Function
}

export default function SocialLoginButton({ icon, onLogin }: Props) {
	const Icon = icon

	return (
		<button
			onClick={() => onLogin()}
			className='bg-blue-50 py-3.5 w-full flex justify-center mx-2 rounded-full transition hover:bg-blue-100/75'
		>
			<Icon className='h-7 w-7' />
		</button>
	)
}
