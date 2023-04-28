import { User } from '~/apiServices/usersService'
import Box from '../box'
import Heading from './heading'
import Info from './info'

export default function Activities({ data }: { data: User }) {
	return (
		<Box>
			<Heading>Hoạt động</Heading>

			<hr className='!my-4 border-blue-900/10' />

			<div className='space-y-2'>
				<Info
					label='Điểm tích luỹ'
					value={
						<span className='flex items-center'>{data.scores}</span>
					}
				/>
				<Info label='Số bài viết' value={data.blogsCount} />
				<Info label='Số lượt thích' value={data.likesCount} />
			</div>
		</Box>
	)
}
