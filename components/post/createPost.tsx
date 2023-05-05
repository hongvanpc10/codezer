import { useAuth } from '~/hooks'
import Avatar from '../avatar'
import { GalleryBoldIcon, VideoIcon } from '../icons'
import Modal from '../modal'
import CreatePostModal from './createPostModal'

export default function CreatePost() {
	const { auth } = useAuth()
	const user = auth?.data

	return user ? (
		<Modal
			render={setIsOpen => (
				<CreatePostModal
					setIsOpen={setIsOpen}
					user={user}
					accessToken={auth.accessToken}
				/>
			)}
			defaultOpen={false}
			maxWidth='xl'
			scale={false}
		>
			{setIsOpen => (
				<div className='bg-white/90 mx-auto max-w-2xl rounded-3xl px-5 pt-6 pb-4 shadow-lg shadow-blue-900/5'>
					<div className='flex items-center'>
						<Avatar size={9} noRing alt='' src={user.avatar} />

						<input
							onClick={() => setIsOpen(true)}
							placeholder='Bạn đang nghĩ gì?'
							className='py-2.5 cursor-pointer transition placeholder:text-blue-900/50 hover:bg-blue-50/75 px-6 bg-blue-50/50 rounded-full flex-1 ml-2.5'
						/>
					</div>

					<hr className='mt-4 mb-2 border-blue-900/5' />

					<div className='flex items-center'>
						<button
							onClick={() => setIsOpen(true)}
							className='flex-1 transition hover:bg-slate-100/50 font-medium justify-center py-2 rounded-xl flex items-center mr-1'
						>
							<GalleryBoldIcon className='h-7 mr-3 text-green-500' />
							Ảnh
						</button>
						<button
							onClick={() => setIsOpen(true)}
							className='flex-1 transition hover:bg-slate-100/50 font-medium justify-center py-2 rounded-xl flex items-center ml-1'
						>
							<VideoIcon className='h-7 mr-3 text-rose-500' />
							Video
						</button>
					</div>
				</div>
			)}
		</Modal>
	) : null
}
