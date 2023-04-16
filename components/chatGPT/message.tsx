import { useEffect, useState } from 'react'
import images from '~/assets/images'
import markdownToHTML from '~/utils/markdownToHTML'
import Avatar from '../avatar'

interface Props {
	role?: 'user' | 'assistant' | 'system'
	content?: string
	avatar?: string
}

export default function Message({ role, content, avatar }: Props) {
	const [html, setHtml] = useState(content )

	useEffect(() => {
		async function convert() {
			if (content && role === 'assistant') {
				const _html = await markdownToHTML(content)
				setHtml(_html)
			}
		}

		convert()
	}, [content, role])

	return role === 'user' && avatar ? (
		<div className='flex items-start justify-end'>
			<p className='py-3 px-5 mr-2 mt-2 rounded-2xl rounded-tr-md bg-blue-500 text-white'>
				{content}
			</p>
			<Avatar noRing alt='' src={avatar} />
		</div>
	) : role === 'assistant' && html ? (
		<div className='flex items-start justify-start'>
			<Avatar
				noRing
				alt=''
				src={images.chatGPTLogo}
				className='bg-blue-500'
			/>

			<p
				className='py-3 px-5 ml-2 rounded-2xl rounded-tl-md bg-slate-200 mt-2 !prose !prose-blue prose-img:rounded-2xl prose-video:rounded-2xl prose-img:mx-auto prose-a:underline-offset-2 prose-p:break-words prose-headings:break-words prose-a:break-words prose-pre:!rounded-2xl prose-td:!p-3 even:prose-tr:bg-blue-50 prose-th:!p-3 prose-tr:rounded-xl prose-tr:border-none prose-thead:bg-blue-100/75 prose-thead:rounded-xl prose-thead:border-none prose-table:border-separate first:prose-th:rounded-l-xl last:prose-th:rounded-r-xl first:prose-td:rounded-l-xl last:prose-td:rounded-r-xl prose-table:border-spacing-px prose-figcaption:text-center prose-figcaption:italic prose-figcaption:!mt-3 prose-pre:scroll-sm prose-blockquote:!not-italic prose-blockquote:!font-normal prose-blockquote:bg-blue-50/50 [&>*]:prose-blockquote:before:hidden [&>*]:prose-blockquote:after:hidden prose-blockquote:py-1 first:[&>*]:prose-blockquote:!mt-2 last:[&>*]:prose-blockquote:!mb-2 prose-blockquote:pr-4 prose-blockquote:rounded-r-2xl prose-th:!align-middle'
				dangerouslySetInnerHTML={{
					__html: html,
				}}
			></p>
		</div>
	) : (
		<div className='flex items-start justify-start'>
			<Avatar
				noRing
				alt=''
				src={images.chatGPTLogo}
				className='bg-blue-500'
			/>

			<p className='py-3 px-4 ml-2 rounded-2xl rounded-tl-md bg-slate-200 mt-2 animate-pulse font-medium'>
				. . .
			</p>
		</div>
	)
}
