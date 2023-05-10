import ChatGPT from '~/components/chatGPT'
import Footer from '~/components/footer'
import Header from '~/components/header'
import Sidebar from '~/components/sidebar'
import { LayoutProps } from '.'

export default function MainLayout({ children }: LayoutProps) {
	return (
		<>
			<Header />
			<div>
				<Sidebar />
				<div className='container mx-auto pt-28 px-2 sm:px-3 pb-36 min-h-screen'>
					{children}
				</div>
				<ChatGPT />
			</div>
			<Footer />
		</>
	)
}
