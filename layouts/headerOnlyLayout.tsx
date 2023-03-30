import ChatGPT from '~/components/chatGPT'
import Header from '~/components/header'
import { LayoutProps } from '.'

export default function HeaderOnlyLayout({ children }: LayoutProps) {
	return (
		<>
			<Header />
			<ChatGPT />
			<div className='container mx-auto pt-28 px-3 pb-36'>{children}</div>
		</>
	)
}
