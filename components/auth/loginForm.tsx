import { useMutation } from '@tanstack/react-query'
import Image from 'next/image'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { authService } from '~/apiServices'
import { LoginData } from '~/apiServices/authService'
import images from '~/assets/images'
import Button from '~/components/button'
import { FormGroup } from '~/components/form'
import { EmailIcon, GithubIcon, SecurityIcon } from '~/components/icons'
import Logo from '~/components/logo'
import pattern from '~/config/pattern'
import routes from '~/config/routes'
import { useAuth } from '~/hooks'
import { Error } from '~/utils/request'
import Loader from '../loader'
import FaceBookLogin from './facebookLogin'
import GoogleLogin from './googleLogin'
import SocialLoginButton from './socialLoginButton'

export default function LoginForm() {
	const { login } = useAuth()

	const {
		register,
		formState: { errors },
		handleSubmit,
		setError,
		setFocus,
	} = useForm<LoginData>()

	const { mutate, isLoading } = useMutation(authService.login, {
		onError(error: Error) {
			if (error.errorCode === 'ali4001') {
				setError('email', { message: 'Email chưa được đăng kí' })
				setFocus('email')
			} else if (error.errorCode === 'ali4002') {
				setError('password', { message: 'Mật khẩu không chính xác' })
				setFocus('password')
			}
		},
		onSuccess(data) {
			login(data)
		},
	})

	const onSubmit = handleSubmit(data => mutate(data))

	return (
		<>
			{isLoading && <Loader />}

			<div className='md:p-4 sm:p-5 p-3 bg-white/95 backdrop-blur w-full max-w-lg md:max-w-4xl rounded-3xl shadow-2xl shadow-blue-900/25 flex items-stretch'>
				<div className='row'>
					<div className='col-6 show-on-md'>
						<div className='bg-blue-500 h-full flex items-center rounded-xl'>
							<Image alt='' src={images.login} />
						</div>
					</div>

					<div className='md:col-6 col-12'>
						<div className='flex-col flex items-center'>
							<Logo />

							<h1 className='font-display text-3xl font-bold mt-2'>
								Đăng nhập
							</h1>

							<form
								className='w-full space-y-5 mt-4'
								onSubmit={onSubmit}
							>
								<FormGroup
									label='Email'
									placeholder='Nhập email của bạn'
									icon={EmailIcon}
									autoFocus
									type='email'
									{...register('email', {
										required: 'Vui lòng nhập email của bạn',
										pattern: {
											value: pattern.email,
											message: 'Email không hợp lệ',
										},
									})}
									error={errors.email?.message as string}
								/>

								<FormGroup
									label='Mật khẩu'
									placeholder='Nhập mật khẩu của bạn'
									icon={SecurityIcon}
									type='password'
									{...register('password', {
										required:
											'Vui lòng nhập mật khẩu của bạn',
										minLength: {
											value: 8,
											message:
												'Mật khẩu tối thiểu 8 kí tự',
										},
									})}
									error={errors.password?.message as string}
								/>

								<div className='!mt-1.5 flex justify-end'>
									<Link
										href=''
										className='font-medium text-blue-600'
									>
										Quên mật khẩu?
									</Link>
								</div>

								<Button full large rounded className='!mt-9'>
									Đăng nhập
								</Button>
							</form>

							<div className='flex items-center w-10/12 my-4'>
								<div className='h-[1px] bg-blue-900/10 flex-1' />
								<span className='font-medium text-blue-900/25 mx-1'>
									Hoặc
								</span>
								<div className='h-[1px] bg-blue-900/10 flex-1' />
							</div>

							<div className='w-full flex'>
								<GoogleLogin />

								<FaceBookLogin />

								<SocialLoginButton
									icon={GithubIcon}
									onLogin={() => {}}
								/>
							</div>

							<div className='mt-8 font-medium'>
								Bạn chưa có tài khoản?{' '}
								<Link
									href={routes.register}
									className='text-blue-600'
								>
									Đăng kí
								</Link>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}
