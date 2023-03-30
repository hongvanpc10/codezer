import { NextSeo } from 'next-seo'
import { LoginForm } from '~/components/auth'
import { EmptyLayout } from '~/layouts'
import { NextPageWithLayout } from './_app'

const Login: NextPageWithLayout = () => {
	return (
		<>
			<div className='hide-on-md'>
				<div className='block lg:hidden fixed inset-0 bg-gradient-to-br from-sky-500 via-blue-500 to-indigo-500' />
			</div>

			<NextSeo title='Đăng nhập' />

			<LoginForm />
		</>
	)
}

Login.Layout = EmptyLayout
Login.isRestricted = true

export default Login
