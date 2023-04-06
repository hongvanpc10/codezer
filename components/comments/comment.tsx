import { FacebookCounter, FacebookSelector } from '@charkour/react-reactions'
import Link from 'next/link'
import images from '~/assets/images'
import Avatar from '../avatar'

export default function Comment() {
	return (
		<li className='flex items-start'>
			<Link href='' className='mt-2'>
				<Avatar alt='' src={images.logo} />
			</Link>

			<div className='ml-3'>
				<div className='pt-2 pb-3 pl-4 pr-6 rounded-3xl bg-slate-100'>
					<Link href='' className='mb-2 inline-block'>
						<h3 className='font-medium'>Codezer</h3>
					</Link>

					<p className='!prose !prose-blue prose-img:rounded-2xl prose-video:rounded-2xl prose-img:mx-auto prose-a:underline-offset-2 prose-p:break-words prose-headings:break-words prose-a:break-words prose-pre:!rounded-2xl prose-td:!p-3 even:prose-tr:bg-blue-50 prose-th:!p-3 prose-tr:rounded-xl prose-tr:border-none prose-thead:bg-blue-100/75 prose-thead:rounded-xl prose-thead:border-none prose-table:border-separate first:prose-th:rounded-l-xl last:prose-th:rounded-r-xl first:prose-td:rounded-l-xl last:prose-td:rounded-r-xl prose-table:border-spacing-px prose-figcaption:text-center prose-figcaption:italic prose-figcaption:!mt-3 prose-pre:scroll-sm prose-blockquote:!not-italic prose-blockquote:!font-normal prose-blockquote:bg-blue-50/50 [&>*]:prose-blockquote:before:hidden [&>*]:prose-blockquote:after:hidden prose-blockquote:py-1 first:[&>*]:prose-blockquote:!mt-2 last:[&>*]:prose-blockquote:!mb-2 prose-blockquote:pr-4 prose-blockquote:rounded-r-2xl prose-th:!align-middle'>
						Nếu thấy hay hãy nhớ like và theo dõi.
					</p>

					<div className='last:[&_div_div]:hidden flex justify-end mt-2 -mr-3 -mb-0.5'>
						<FacebookCounter
							counters={[
								{ by: 'Codezer', emoji: 'like' },
								{ by: 'Hong Van', emoji: 'love' },
								{ by: 'Hong Van', emoji: 'haha' },
							]}
						/>
					</div>
				</div>

				<div className='flex text-sm pl-4 text-blue-900/75 mt-1 items-center space-x-2'>
					<div className='relative group'>
						<button>Thích</button>

						<div className='absolute hidden group-hover:block transition-all duration-300 opacity-0 group-hover:opacity-100 left-2 bottom-1/2 group-hover:bottom-full z-10'>
							<FacebookSelector iconSize={24} />
						</div>
					</div>

					<div className='w-1 h-1 rounded-full bg-blue-500' />

					<span>Trả lời</span>

					<div className='w-1 h-1 rounded-full bg-blue-500' />

					<span>1 giờ trước</span>
				</div>
			</div>
		</li>
	)
}
