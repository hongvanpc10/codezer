import { useAuth, useRedirectToLogin } from '~/hooks'
import { HeartIcon, HeartSolidIcon } from './icons'

interface Props {
	isLiked: boolean
	onLike: Function
	onUnlike: Function
	className?: string
}

export default function LikeButton({
	isLiked,
	onLike,
	onUnlike,
	className,
}: Props) {
	const { isLogin } = useAuth()

	const redirectToLogin = useRedirectToLogin()

	return (
		<button
			className={className}
			onClick={() => {
				if (!isLogin) return redirectToLogin()

				isLiked ? onUnlike() : onLike()
			}}
		>
			{isLiked ? (
				<HeartSolidIcon className='h-6 text-rose-500' />
			) : (
				<HeartIcon className='h-6' />
			)}
		</button>
	)
}
