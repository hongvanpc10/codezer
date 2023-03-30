import { NextSeo } from 'next-seo'
import Button from '~/components/button'
import routes from '~/config/routes'
import { HeaderOnlyLayout } from '~/layouts'
import { NextPageWithLayout } from './_app'

const _404: NextPageWithLayout = () => {
	return (
		<div className='flex justify-center'>
			<NextSeo title='Trang không tìm thấy' />

			<div className='max-w-lg w-full shadow-2xl shadow-blue-900/20 flex flex-col items-center p-10 rounded-3xl'>
				<h1 className='text-[10rem] leading-[10rem] font-extrabold text-transparent bg-clip-text bg-gradient-to-r via-blue-500 to-sky-500 from-indigo-500'>
					404
				</h1>

				<h2 className='text-xl font-bold mt-4 mb-8'>
					Opps! Trang không tìm thấy 😫
				</h2>

				<Button rounded href={routes.home}>
					Quay lại trang chủ
				</Button>
			</div>
		</div>
	)
}

_404.Layout = HeaderOnlyLayout

export default _404
