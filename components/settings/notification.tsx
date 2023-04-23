import Box from '../box'
import Toggle from '../toggle'

export default function Notification() {
	return (
		<section>
			<h2 className='text-2xl font-bold mb-6'>Thông báo</h2>

			<Box>
				<div className='space-y-4'>
					<div className='flex items-center justify-between'>
						<label>Tất cả bài viết mới</label>
						<Toggle defaultChecked={true} />
					</div>

					<div className='flex items-center justify-between'>
						<label>Bài viết theo dõi</label>
						<Toggle defaultChecked={true} />
					</div>

					<div className='flex items-center justify-between'>
						<label>Bình luận trong bài blog / post</label>
						<Toggle defaultChecked={true} />
					</div>

					<div className='flex items-center justify-between'>
						<label>Lượt thích trong bài blog / post</label>
						<Toggle defaultChecked={true} />
					</div>

					<div className='flex items-center justify-between'>
						<label>Trả lời bình luận</label>
						<Toggle defaultChecked={true} />
					</div>

					<div className='flex items-center justify-between'>
						<label>Cảm xúc trong bình luận</label>
						<Toggle defaultChecked={true} />
					</div>
				</div>
			</Box>
		</section>
	)
}
