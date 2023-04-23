import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { usersService } from '~/apiServices'
import { ChangePasswordData } from '~/apiServices/usersService'
import pattern from '~/config/pattern'
import { useAuth } from '~/hooks'
import Box from '../box'
import Button from '../button'
import { FormGroup } from '../form'
import Modal from '../modal'
import Label from './label'
import { Error } from '~/utils/request'
import Loader from '../loader'

export default function Security() {
	return (
		<section>
			<h2 className='text-2xl font-bold mb-8'>Bảo mật</h2>

			<Box>
				<div className='flex items-center justify-between'>
					<Label>Mật khẩu</Label>

                    <Modal
                        scale={false}
						render={setIsOpen => (
							<ChangePassword setIsOpen={setIsOpen} />
						)}
						defaultOpen={false}
					>
						{setIsOpen => (
							<Button
								onClick={() => setIsOpen(true)}
								color='lightBlue'
								className='mb-1'
							>
								Đổi mật khẩu
							</Button>
						)}
					</Modal>
				</div>
			</Box>
		</section>
	)
}

function ChangePassword({ setIsOpen }: { setIsOpen: Function }) {
	const { auth } = useAuth()

	const {
		register,
		handleSubmit,
		formState: { errors },
		setFocus,
		setValue,
		setError,
	} = useForm<ChangePasswordData>()

	const { mutate, isLoading } = useMutation(
		(data: ChangePasswordData) =>
			usersService.changePassword(data, `${auth?.accessToken}`),
		{
			onError(error: Error) {
				if (error.errorCode === 'ucp4001') {
					setError('password', {
						message: 'Mật khẩu không chính xác',
					})
					setFocus('password')
					setValue('password', '')
					setValue('newPassword', '')
				}
			},
			onSuccess() {
				setIsOpen(false)
			},
		}
	)

	const onSubmit = handleSubmit(data => {
		mutate(data)
	})

	return (
		<div>
			<h2 className='text-2xl font-bold mb-6'>Đổi mật khẩu</h2>

			{isLoading && <Loader />}

			<form className='space-y-6' onSubmit={onSubmit}>
				<FormGroup
					label='Mật khẩu hiện tại'
					placeholder='Nhập mật khẩu hiện tại của bạn'
					autoFocus
					{...register('password', {
						required: 'Vui lòng nhập mật khẩu hiện tại',
					})}
					error={errors.password?.message}
					type='password'
				/>
				<FormGroup
					label='Mật khẩu mới'
					placeholder='Nhập mật khẩu mới'
					{...register('newPassword', {
						required: 'Vui lòng nhập mật khẩu hiện mới',
						pattern: {
							value: pattern.password,
							message: 'Mật khẩu không đủ mạnh',
						},
					})}
					type='password'
					error={errors.newPassword?.message}
				/>

				<div className='flex !mt-10 items-center justify-end space-x-3'>
					<Button
						component='div'
						color='slate'
						onClick={() => setIsOpen(false)}
					>
						Hủy
					</Button>
					<Button>Lưu</Button>
				</div>
			</form>
		</div>
	)
}
