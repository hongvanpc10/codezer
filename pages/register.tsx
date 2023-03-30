import { NextSeo } from 'next-seo'
import { RegisterForm } from '~/components/auth'
import { EmptyLayout } from '~/layouts'
import { NextPageWithLayout } from './_app'

const Register: NextPageWithLayout = () => {
	return (
		<>
			<div className='hide-on-md'>
				<div className='block lg:hidden fixed inset-0 bg-gradient-to-br from-sky-500 via-blue-500 to-indigo-500' />
			</div>

			<RegisterForm />

			<NextSeo title='Đăng kí' />
		</>
	)
}

Register.Layout = EmptyLayout
Register.isRestricted = true

export default Register
