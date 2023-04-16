import { FacebookCounter } from '@charkour/react-reactions'
import Link from 'next/link'
import images from '~/assets/images'
import Avatar from '~/components/avatar'
import {
	CameraOutlineIcon,
	GalleryBoldIcon,
	LikeIcon,
	SendIcon,
	SmsOutlineIcon,
	TickIcon,
	VideoIcon,
} from '~/components/icons'
import Image from '~/components/image'
import { useAuth } from '~/hooks'
import { NextPageWithLayout } from '../_app'
import { NextSeo } from 'next-seo'

const Community: NextPageWithLayout = () => {
	const { auth } = useAuth()
	const user = auth?.data

	return user ? (
		<div className='row -mt-8'>
			<NextSeo title='Cộng đồng' />

			<div className='xl:col-3 lg:col-2 col-12'></div>

			<section className='xl:col-6 lg:col-8 col-12 space-y-6'>
				<div className='bg-white/90 rounded-3xl px-5 pt-6 pb-4 shadow-lg shadow-blue-900/5'>
					<div className='flex items-center'>
						<Avatar
							size={9}
							noRing
							alt=''
							src={user.avatar}
						/>
						<input
							placeholder='Bạn đang nghĩ gì?'
							className='py-2.5 cursor-pointer transition placeholder:text-blue-900/50 hover:bg-blue-50/75 px-6 bg-blue-50/50 rounded-full flex-1 ml-2.5'
						/>
					</div>

					<hr className='mt-4 mb-2 border-blue-900/5' />

					<div className='flex items-center'>
						<button className='flex-1 transition hover:bg-slate-100 font-medium justify-center py-2 rounded-xl flex items-center mr-1'>
							<GalleryBoldIcon className='h-7 mr-3 text-green-500' />
							Ảnh
						</button>
						<button className='flex-1 transition hover:bg-slate-100 font-medium justify-center py-2 rounded-xl flex items-center ml-1'>
							<VideoIcon className='h-7 mr-3 text-rose-500' />
							Video
						</button>
					</div>
				</div>

				<div className='bg-white/90 rounded-3xl px-3 pt-6 pb-4 shadow-lg shadow-blue-900/5'>
					<div className='flex items-center px-2'>
						<Link href={''}>
							<Avatar
								src={images.logo}
								alt=''
								noRing
								size={9}
							/>
						</Link>

						<div className='ml-3'>
							<Link href={''}>
								<h3 className='font-semibold leading-5 flex items-center'>
									Codezer
									<TickIcon className='h-[1.125rem] text-sky-500 ml-1' />
								</h3>
								<span className='text-sm'>1 ngày trước</span>
							</Link>
						</div>
					</div>

					<p className='px-2 !prose !prose-blue prose-img:rounded-2xl prose-video:rounded-2xl prose-img:mx-auto prose-a:underline-offset-2 prose-p:break-words prose-headings:break-words prose-a:break-words prose-pre:!rounded-2xl prose-td:!p-3 even:prose-tr:bg-blue-50 prose-th:!p-3 prose-tr:rounded-xl prose-tr:border-none prose-thead:bg-blue-100/75 prose-thead:rounded-xl prose-thead:border-none prose-table:border-separate first:prose-th:rounded-l-xl last:prose-th:rounded-r-xl first:prose-td:rounded-l-xl last:prose-td:rounded-r-xl prose-table:border-spacing-px prose-figcaption:text-center prose-figcaption:italic prose-figcaption:!mt-3 prose-pre:scroll-sm prose-blockquote:!not-italic prose-blockquote:!font-normal prose-blockquote:bg-blue-50/50 [&>*]:prose-blockquote:before:hidden [&>*]:prose-blockquote:after:hidden prose-blockquote:py-1 first:[&>*]:prose-blockquote:!mt-2 last:[&>*]:prose-blockquote:!mb-2 prose-blockquote:pr-4 prose-blockquote:rounded-r-2xl prose-th:!align-middle mt-3 mb-4 prose-p:!my-2'>
						<p>
							Extension hỗ trợ nhận diện thụt đầu dòng trong
							vscode
						</p>
						<p>------</p>
						<p>
							Thụt đầu dòng rất quan trọng trong các ngôn ngữ như
							Python, Nim, Yaml,... Ngoài ra, nó giúp cho việc
							format các đoạn code ở trong các ngôn ngữ không bắt
							buộc cần phải có thụt đầu dòng dễ đọc hơn. Đặc biệt,
							những cậu đang sử dụng VSCode thì mình đề xuất một
							extension có tên {'"Indent-Rainbow"'}, có thể tạo
							các vùng màu giúp phân biệt các đoạn code trong cùng
							một khối lệnh.
						</p>
						<p>
							Ngoài ra, extension này có thể sử dụng trên VSCode
							bản web từ phiên bản v8.0.0.0.
						</p>
						<p>Hy vọng chia sẻ này có ích với cậu!</p>
					</p>

					<div>
						<Image
							alt=''
							src='https://i.ibb.co/V2ctWx2/image.png'
							ratio={[16, 14]}
							rounded='xl'
						/>
					</div>

					<div className='flex py-2 items-center justify-between text-sm px-2'>
						<div className='last:[&_div_div]:hidden flex items-center'>
							<FacebookCounter
								counters={[
									{ by: 'Codezer', emoji: 'like' },
									{ by: 'Hong Van', emoji: 'love' },
									{ by: 'Hong Van', emoji: 'haha' },
								]}
							/>

							<span className='ml-2'>16</span>
						</div>

						<div>2 bình luận</div>
					</div>

					<div className='flex items-center border-y py-1.5 border-blue-900/5'>
						<button className='flex items-center justify-center mx-1 rounded-xl transition hover:bg-slate-50 py-2 flex-1'>
							<LikeIcon className='h-6' />
						</button>
						<button className='flex items-center justify-center mx-1 rounded-xl transition hover:bg-slate-50 py-2 flex-1'>
							<SmsOutlineIcon className='h-6' />
						</button>
					</div>

					<div className='flex items-center pt-3'>
						<Avatar alt='' src={user.avatar} noRing />
						<form className='flex relative flex-1 items-center'>
							<input
								placeholder='Viết bình luận của bạn...'
								className='w-full py-2 px-6 bg-blue-50/50 rounded-full ml-2 placeholder:text-blue-900/50'
							/>

							<div className='absolute flex items-center right-3 space-x-2 text-blue-900/60'>
								<button>
									<CameraOutlineIcon className='h-5' />
								</button>
								<button>
									<SendIcon className='h-5' />
								</button>
							</div>
						</form>
					</div>
				</div>
			</section>

			<div className='xl:col-3 lg:col-2 col-12'></div>
		</div>
	) : null
}

Community.isPrivate = true

export default Community
