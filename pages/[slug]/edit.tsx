import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { NextSeo } from 'next-seo'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { ImageListType } from 'react-images-uploading'
import { blogsService, categoriesService } from '~/apiServices'
import { BlogData } from '~/apiServices/blogsService'
import { Category } from '~/apiServices/categoriesService'
import Box from '~/components/box'
import Button from '~/components/button'
import Editor from '~/components/editor'
import { Error, FormGroup, FormGroupTextarea, Label } from '~/components/form'
import ImageUpload from '~/components/imageUpload'
import Loader from '~/components/loader'
import { MultipleSelect } from '~/components/select'
import queryKeys from '~/config/queryKeys'
import routes from '~/config/routes'
import { useAuth, useBeforeUnload } from '~/hooks'
import { HeaderOnlyLayout } from '~/layouts'
import uploadImage from '~/utils/uploadImage'
import { NextPageWithLayout } from '../_app'

const EditBlog: NextPageWithLayout = () => {
	const router = useRouter()

	const slug = router.query.slug as string

	const { auth } = useAuth()

	const user = auth?.data
	const accessToken = auth?.accessToken

	const { data, isError } = useQuery(queryKeys.blog(slug), () =>
		blogsService.getDetail(slug)
	)

	const {
		register,
		formState: { errors },
		setError,
		handleSubmit,
		clearErrors,
		getValues,
	} = useForm<BlogData>()

	const [blogCategories, setBlogCategories] = useState<Category[]>([])

	const [content, setContent] = useState('')

	const [thumb, setThumb] = useState<ImageListType>([])

	const queyClient = useQueryClient()

	useBeforeUnload(
		() =>
			!!(
				(data &&
					(getValues('title') !== data.title ||
						getValues('description') !== data.description)) ||
				content !== data?.content ||
				blogCategories !== data.categories
			)
	)

	useEffect(() => {
		data?.thumb && setThumb([{ dataURL: data.thumb }])
		data?.categories && setBlogCategories(data.categories)
		data?.content && setContent(data.content)
	}, [data?.categories, data?.thumb, data?.content])

	const [isImageUploading, setIsImageUploading] = useState(false)

	const { data: categories } = useQuery(queryKeys.categories, () =>
		categoriesService.get()
	)

	const { mutate, isLoading } = useMutation(
		(payload: BlogData) =>
			blogsService.update(
				data?._id as string,
				payload,
				accessToken as string
			),
		{
			onSuccess(data) {
				router.push(routes.blog(data?.slug as string))
				queyClient.setQueryData(queryKeys.blog(slug), data)
			},
		}
	)

	const onSubmit = handleSubmit(async data => {
		if (blogCategories.length <= 0 || content.trim().length < 100) {
			return (() => {
				blogCategories.length <= 0 &&
					setError('categories', {
						message: 'Vui lòng chọn danh mục',
					})

				content.trim().length < 500 &&
					setError('content', { message: 'Nội dung quá ngắn' })
			})()
		}

		let uploadedThumb

		if (thumb[0]?.file && thumb[0].dataURL !== data.thumb) {
			setIsImageUploading(true)
			uploadedThumb = await uploadImage(thumb[0].file)
			setIsImageUploading(false)
		}

		mutate({
			...data,
			categories: blogCategories.map(category => category._id),
			thumb: uploadedThumb,
			content,
		})
	})

	if ((data?.author._id !== user?._id && user?.role !== 'admin') || isError)
		router.push(routes.blog(slug))

	return data && (data.author._id === user?._id || user?.role === 'admin') ? (
		<form onSubmit={onSubmit} className='space-y-10'>
			{(isImageUploading || isLoading) && <Loader />}

			<NextSeo title={`Chỉnh sửa - ${data.title}`} />

			<div className='row'>
				<div className='col-12 lg:col-5 space-y-6'>
					<Box>
						<FormGroup
							label='Tiêu đề'
							{...register('title', {
								required: 'Vui lòng nhập tiêu đề bài viết',
							})}
							error={errors.title?.message as string}
							placeholder='Nhập tiêu đề bài viết'
							maxLength={150}
							defaultValue={data.title}
						/>
					</Box>

					<Box>
						<Label>Chọn danh mục</Label>
						<MultipleSelect
							options={
								categories
									? categories.map(category => ({
											label: category.name,
											value: category,
									  }))
									: []
							}
							onChange={values => {
								clearErrors('categories')
								setBlogCategories(values)
							}}
							placeholder='Chọn danh mục bài viết'
							defaultValue={data.categories.map(category => ({
								label: category.name,
								value: category,
							}))}
						/>

						{errors.categories?.message && (
							<Error>{errors.categories.message}</Error>
						)}
					</Box>

					<Box>
						<FormGroupTextarea
							label='Mô tả'
							{...register('description')}
							error={errors.description?.message as string}
							placeholder='Nhập mô tả bài viết'
							maxLength={500}
							defaultValue={data.description}
						/>
					</Box>
				</div>

				<div className='col-12 lg:col-7'>
					<Box>
						<Label>Hình ảnh</Label>

						<ImageUpload onChange={setThumb} value={thumb} />
					</Box>
				</div>
			</div>

			<div>
				<Label>Nội dung</Label>
				<Editor
					placeholder='Nhập nội dung bài viết'
					onChange={text => {
						clearErrors('content')
						setContent(text)
					}}
					defaultValue={data.content}
				/>

				{errors.content?.message && (
					<Error>{errors.content.message}</Error>
				)}
			</div>

			<div className='flex justify-end'>
				<Button large>Lưu</Button>
			</div>
		</form>
	) : (
		<Loader.Inline />
	)
}

EditBlog.Layout = HeaderOnlyLayout
EditBlog.isPrivate = true

export default EditBlog
