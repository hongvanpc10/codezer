import { FormGroup, FormGroupTextarea } from '~/components/form'
import Button from '~/components/button'
import { useForm } from 'react-hook-form'
import { Category, CategoryData } from '~/apiServices/categoriesService'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useAuth } from '~/hooks'
import { categoriesService } from '~/apiServices'
import { SetIsOpen } from '../modal'
import { Error } from '~/utils/request'
import { useState } from 'react'
import Loader from '../loader'
import Confirm from '../confirm'

export default function UpdateForm({
	setIsOpen,
	item,
}: {
	setIsOpen: SetIsOpen
	item: Category
}) {
	const {
		register,
		handleSubmit,
		formState: { errors },
		setError,
		setFocus,
	} = useForm<CategoryData>({
		defaultValues: {
			name: item.name,
			description: item.description,
		},
	})

	const { auth } = useAuth()
	const accessToken = auth?.accessToken

	const queyClient = useQueryClient()

	const [isDelete, setIsDelete] = useState(false)

	const { mutate: updateMutate, isLoading: isUpdating } = useMutation(
		(data: CategoryData) =>
			categoriesService.update(item._id, data, String(accessToken)),
		{
			onSuccess(data) {
				data &&
					queyClient.setQueryData<Category[]>(
						['categories'],
						oldData =>
							oldData &&
							oldData.map(category =>
								category._id === item._id ? data : category
							)
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
		if (data.name !== item.name || data.description !== item.description)
			updateMutate(data)
	})

	const { mutate: deleteMutate, isLoading: isDeleting } = useMutation(
		() => categoriesService.deleteCat(item._id, String(accessToken)),
		{
			onSuccess() {
				queyClient.setQueryData<Category[]>(
					['categories'],
					oldData =>
						oldData &&
						oldData.filter(category => category._id !== item._id)
				)

				setIsOpen(false)
			},
		}
	)

	return (
		<div>
			{(isUpdating || isDeleting) && <Loader />}

			{isDelete && (
				<Confirm
					message='Bạn có chắc chắn muốn xoá danh mục này?'
					subMessage='Nếu bạn xoá nó, bạn không thể khôi phục lại.'
					onClose={() => setIsDelete(false)}
					onConfirm={() => deleteMutate()}
				/>
			)}

			<h2 className='font-bold text-2xl mb-8 drop-shadow'>
				Sửa danh mục
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
					maxLength={500}
				/>

				<div className='flex justify-end space-x-3'>
					<Button
						color='red'
						component='div'
						onClick={() => {
							setIsDelete(true)
						}}
					>
						Xoá
					</Button>

					<Button>Lưu</Button>
				</div>
			</form>
		</div>
	)
}
