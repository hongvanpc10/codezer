import { User } from '~/apiServices/usersService'
import routes from '~/config/routes'
import { useAuth } from '~/hooks'
import timeFromNow from '~/utils/timeFromNow'
import Box from '../box'
import Button from '../button'
import { FacebookIcon2, GithubIcon2, GlobalIcon, TwitterIcon } from '../icons'
import Heading from './heading'
import Info from './info'
import SocialLink from './socialLink'

export default function Introduction({ data }: { data: User }) {
	const { auth } = useAuth()

	const user = auth?.data

	return (
		<Box>
			<Heading>Giới thiệu</Heading>

			<div className='space-y-3'>
				{data.bio && <p>{data.bio}</p>}

				<hr className='!my-4 border-blue-900/10' />

				<SocialLink url={data.website} icon={GlobalIcon} />
				<SocialLink url={data.facebook} icon={FacebookIcon2} />
				<SocialLink url={data.twitter} icon={TwitterIcon} />
				<SocialLink url={data.github} icon={GithubIcon2} />

				<Info
					value={timeFromNow(data.createdAt)}
					label='Đã tham gia lúc'
				/>
			</div>

			{user?._id === data._id && (
				<Button
					href={routes.settings}
					full
					className='mt-10'
					color='lightBlue'
				>
					Chỉnh sửa
				</Button>
			)}
		</Box>
	)
}
