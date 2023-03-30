import { useQuery } from '@tanstack/react-query'
import { NextSeo } from 'next-seo'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { authService } from '~/apiServices'
import { CloseBulkIcon } from '~/components/icons'
import Loader from '~/components/loader'
import Logo from '~/components/logo'
import routes from '~/config/routes'
import { EmptyLayout } from '~/layouts'
import { Error } from '~/utils/request'
import { NextPageWithLayout } from '../_app'

const Active: NextPageWithLayout = () => {
	const router = useRouter()
	const token = router.query.token as string

	const [message, setMessage] = useState<string>()

	const { isLoading } = useQuery(
		['active'],
		() => authService.active(token),
		{
			enabled: !!token,
			onSuccess() {
				router.push(routes.login)
			},
			onError(error: Error) {
				if (error.errorCode === 'aac4002')
					setMessage('Liên kết đã hết hạn.')
				else if (error.errorCode === 'aac4003')
					setMessage('Liên kết không chính xác.')
				else if (error.errorCode === 'aac4001')
					setMessage('Tài khoản đã được kích hoạt trước đó.')
				else setMessage('Đã xãy ra lỗi máy chủ.')
			},
		}
	)

	return (
		<>
			{isLoading && <Loader />}

			<NextSeo title='Xác thực tài khoản' />

			{message && (
				<div className='bg-white-90 max-w-lg flex flex-col items-center w-full backdrop-blur px-5 py-6 rounded-3xl shadow-2xl shadow-blue-900/25'>
					<Logo />
					<h2 className='font-bold text-2xl mt-3'>
						Đăng kí tài khoản thất bại
					</h2>

					<CloseBulkIcon className='h-24 my-3 text-red-500' />

					<div className='text-center [&>p]:mb-3 font-medium'>
						<p className='text-lg font-semibold'>{message}</p>
						<p>Đã có lỗi xãy ra, hãy thử lại sau.</p>
						<p>
							Nếu vẫn không đươc, hãy thử{' '}
							<Link
								href={routes.register}
								className='text-blue-600'
							>
								đăng kí
							</Link>{' '}
							lại ngay.
						</p>
					</div>
				</div>
			)}
		</>
	)
}

Active.Layout = EmptyLayout

export default Active
