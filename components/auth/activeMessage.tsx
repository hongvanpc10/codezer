import Link from 'next/link'
import routes from '~/config/routes'
import { TickBulkIcon } from '../icons'
import Logo from '../logo'

export default function ActiveMessage() {
	return (
		<div className='flex flex-col items-center'>
			<Logo />
			<h2 className='font-bold text-2xl mt-3'>
				Đăng kí tài khoản thành công
			</h2>

			<TickBulkIcon className='h-24 my-3 text-green-500' />

			<div className='text-center [&>p]:mb-3 font-medium'>
				<p>
					Để tiếp tục hoàn thành việc đăng kí. Vui lòng kiểm tra email
					để thực hiện xác thực.
				</p>

				<p>
					Nếu bạn đã xác thực thành công, hãy{' '}
					<Link href={routes.login} className='text-blue-600'>
						đăng nhập
					</Link>{' '}
					ngay.
				</p>
			</div>
		</div>
	)
}
