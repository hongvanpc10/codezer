import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { RegisterOptions, useForm } from 'react-hook-form'
import { usersService } from '~/apiServices'
import { User } from '~/apiServices/usersService'
import Button from '~/components/button'
import { Error, Input } from '~/components/form'
import { Props as InputProps } from '~/components/form/input'
import queryKeys from '~/config/queryKeys'
import { useAuth } from '~/hooks'
import Label from './label'

interface Props extends InputProps {
	label: string
	name: string
	value?: string
	rules?: RegisterOptions
	placeholder?: string
}

export default function Updater({
	label,
	name,
	value,
	rules,
	...inputProps
}: Props) {
	const [edit, setEdit] = useState(false)

	const { auth, updateUser } = useAuth()

	const user = auth?.data

	const queryClient = useQueryClient()

	const {
		register,
		formState: { errors },
		handleSubmit,
		clearErrors
	} = useForm({ defaultValues: { [name]: value } })

	const { mutate } = useMutation(
		(data: any) => usersService.update(data, auth?.accessToken as string),
		{
			onSuccess(data) {
				data && updateUser({ ...user, ...data })
				queryClient.setQueryData<User>(
					queryKeys.user(user?.slug as string),
					oldData =>
						oldData && {
							...oldData,
							...data,
						}
				)
			},
			onMutate(data) {
				setEdit(false)
				user && updateUser({ ...user, ...data })
				queryClient.setQueryData<User>(
					queryKeys.user(user?.slug as string),
					oldData =>
						oldData && {
							...oldData,
							...data,
						}
				)
			},
		}
	)

	const onSubmit = handleSubmit(data => {
		if (data[name] !== value) mutate(data)
	})

	return (
		<form onSubmit={onSubmit}>
			<Label>{label}</Label>

			<div className='flex md:items-center md:flex-row flex-col'>
				{edit ? (
					<Input
						{...inputProps}
						autoFocus
						{...register(name, rules)}
					/>
				) : (
					<p
						className={`py-2.5 flex-1 px-4 text-blue-900 font-medium border-b ${
							value ? 'text-opacity-90' : 'text-opacity-25'
						} border-blue-900/10 line-clamp-1`}
					>
						{value || '...'}
					</p>
				)}

				<div className='flex items-center md:ml-4 ml-auto md:mt-0 mt-3 space-x-2'>
					{edit ? (
						<>
							<Button small color='lightBlue'>
								Lưu
							</Button>

							<Button
								color='lightRed'
								component='div'
								onClick={() => {
									setEdit(false)
									clearErrors()
								}}
								small
							>
								Huỷ
							</Button>
						</>
					) : (
						<Button
							onClick={() => setEdit(true)}
							color='lightBlue'
							small
							component='div'
						>
							Sửa
						</Button>
					)}
				</div>
			</div>

			{errors[name] && <Error>{errors[name]?.message as string}</Error>}
		</form>
	)
}
