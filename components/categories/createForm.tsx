import { FormGroup, FormGroupTextarea } from '~/components/form'
import Button from '~/components/button'
import { useForm } from 'react-hook-form'
import { Category, CategoryData } from '~/apiServices/categoriesService'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useAuth } from '~/hooks'
import { categoriesService } from '~/apiServices'
import { SetIsOpen } from '../modal'
import { Error } from '~/utils/request'
import Loader from '../loader'
import queryKeys from '~/config/queryKeys'

export default function CreateForm({ setIsOpen }: { setIsOpen: SetIsOpen }) {
	const {
		register,
		handleSubmit,
		formState: { errors },
		setError,
		setFocus,
	} = useForm<CategoryData>()

	const { auth } = useAuth()
	const accessToken = auth?.accessToken

	const queyClient = useQueryClient()

	const { mutate, isLoading } = useMutation(
		(data: CategoryData) =>
			categoriesService.create(data, String(accessToken)),
		{
			onSuccess(data) {
				data &&
					queyClient.setQueryData<Category[]>(
						queryKeys.categories,
						oldData => oldData && [...oldData, data]
					)
				setIsOpen(false)
			},
			onError(error: Error) {
				if (error.errorCode === 'ccr4001') {
					setError('name', {
						message: 'Tên danh mục đã được sử dụng',
					})
					setFocus('name')
				}
			},
		}
	)

	const onSubmit = handleSubmit(data => {
		mutate(data)
	})

	return (
		<div>
			{isLoading && <Loader />}

			<h2 className='font-bold text-2xl mb-8 drop-shadow'>
				Tạo danh mục
			</h2>

			<form className='space-y-5' onSubmit={onSubmit}>
				<FormGroup
					label='Tên danh mục'
					placeholder='Nhập tên danh mục'
					autoFocus
					{...register('name', {
						required: 'Vui lòng nhập tên danh mục',
					})}
					error={errors.name?.message as string}
				/>

				<FormGroupTextarea
					label='Mô tả'
					placeholder='Nhập mô tả danh mục'
					{...register('description')}
				/>

				<div className='flex justify-end'>
					<Button>Thêm</Button>
				</div>
			</form>
		</div>
	)
}
