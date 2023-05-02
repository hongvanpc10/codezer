import Box from '../box'
import NotificationSettingItem, { Props } from './notificationSettingItem'

const items: Props[] = [
	{ _key: 'newBlog', label: 'Tất cả bài viết mới' },
	{ _key: 'newFromFollowings', label: 'Bài viết từ bạn bè' },
	{ _key: 'newComment', label: 'Bình luận trong bài blog/post' },
	{ _key: 'newLike', label: 'Lượt thích trong bài viết' },
	{ _key: 'newReaction', label: 'Lượt cảm xúc trong bài post, bình luận' },
	{ _key: 'newReply', label: 'Trả lời bình luận' },
	{ _key: 'newFollower', label: 'Lượt theo dõi mới' },
]

export default function Notification() {
	return (
		<section>
			<h2 className='text-2xl font-bold mb-6'>Thông báo</h2>

			<Box>
				<div className='space-y-5'>
					{items.map((props, i) => (
						<NotificationSettingItem key={i} {...props} />
					))}
				</div>
			</Box>
		</section>
	)
}
