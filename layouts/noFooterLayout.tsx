import ChatGPT from '~/components/chatGPT'
import Header from '~/components/header'
import Sidebar from '~/components/sidebar'
import { LayoutProps } from '.'

export default function NoFooterLayout({ children }: LayoutProps) {
	return (
		<>
			<Header />
			<div>
				<Sidebar />
				<div className='container mx-auto pt-28 px-3 pb-36 min-h-screen'>
					{children}
				</div>
				<ChatGPT />
			</div>
		</>
	)
}
