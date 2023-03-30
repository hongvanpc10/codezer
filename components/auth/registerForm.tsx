import { useMutation } from '@tanstack/react-query'
import Image from 'next/image'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { authService } from '~/apiServices'
import { RegisterData } from '~/apiServices/authService'
import images from '~/assets/images'
import Button from '~/components/button'
import { FormGroup } from '~/components/form'
import { EmailIcon, SecurityIcon, UserEditIcon } from '~/components/icons'
import Loader from '~/components/loader'
import Logo from '~/components/logo'
import pattern from '~/config/pattern'
import routes from '~/config/routes'
import { Error } from '~/utils/request'
import Modal from '../modal'
import ActiveMessage from './activeMessage'

export default function RegisterForm() {
	const {
		register,
		formState: { errors },
		handleSubmit,
		setError,
		setFocus,
	} = useForm<RegisterData>()

	const { mutate, isLoading, isSuccess } = useMutation(authService.register, {
		onError(error: Error) {
			if (error.errorCode === 'are4001') {
				setError('email', { message: 'Tài khoản đã tồn tại' })
				setFocus('email')
			}
		},
	})

	const onSubmit = handleSubmit(data => mutate(data))

	return (
		<>
			{isLoading && <Loader />}

			{isSuccess && (
				<Modal render={() => <ActiveMessage />} closeable={false} />
			)}

			<div className='md:p-4 p-3 sm:p-5 bg-white/95 backdrop-blur w-full max-w-lg md:max-w-4xl rounded-3xl shadow-2xl shadow-blue-900/25 flex items-stretch'>
				<div className='row'>
						<div className='col-6 show-on-md'>
							<div className='bg-blue-500 h-full flex items-center rounded-xl'>
								<Image alt='' src={images.register} />
							</div>
						</div>

					<div className='md:col-6 col-12'>
						<div className='flex-col flex items-center'>
							<Logo />

							<h1 className='font-display text-3xl font-bold mt-2'>
								Đăng kí
							</h1>

							<form
								className='w-full space-y-4 mt-4'
								onSubmit={onSubmit}
							>
								<FormGroup
									label='Họ và tên'
									autoFocus
									placeholder='Nhập họ và tên của bạn'
									icon={UserEditIcon}
									{...register('fullName', {
										required: 'Vui lòng nhập tên của bạn',
									})}
									error={errors.fullName?.message as string}
								/>

								<FormGroup
									label='Email'
									placeholder='Nhập email của bạn'
									icon={EmailIcon}
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
										pattern: {
											value: pattern.password,
											message: 'Mật khẩu chưa đủ mạnh',
										},
									})}
									error={errors.password?.message as string}
								/>

								<Button full large rounded className='!mt-10'>
									Đăng kí
								</Button>
							</form>

							<div className='mt-12 font-medium'>
								Bạn đã có tài khoản?{' '}
								<Link
									href={routes.login}
									className='text-blue-600'
								>
									Đăng nhập
								</Link>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}
