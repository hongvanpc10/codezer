import {
	InfiniteData,
	useMutation,
	useQueryClient,
} from '@tanstack/react-query'
import { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import ReactImageUploading, { ImageListType } from 'react-images-uploading'
import { postsService } from '~/apiServices'
import { CreatePostData, Post } from '~/apiServices/postsServices'
import { User } from '~/apiServices/usersService'
import queryKeys from '~/config/queryKeys'
import { DataWithPagination } from '~/utils/request'
import uploadImage from '~/utils/uploadImage'
import Avatar from '../avatar'
import Button from '../button'
import { Error } from '../form'
import { CloseIcon, EditIcon, GalleryBoldIcon, GlobalIcon } from '../icons'
import Image from '../image'
import Loader from '../loader'

interface Props {
	setIsOpen: Function
	user: User
	accessToken: string
	data: Post
}

export default function Update({ setIsOpen, user, accessToken, data }: Props) {
	const [images, setImages] = useState<ImageListType>(
		data.images.map(image => ({ dataURL: image }))
	)

	const [isImagesUploading, setIsImagesUploading] = useState(false)

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<{ content: string }>({
		defaultValues: { content: data.content },
	})

	const { ref, ...registerReturn } = register('content', {
		required: 'Vui lòng nhập nội dung bài post',
	})

	const textareaRef = useRef<HTMLTextAreaElement | null>(null)

	const queryClient = useQueryClient()

	const { isLoading, mutate } = useMutation(
		(payload: CreatePostData) =>
			postsService.update(data._id, payload, accessToken),
		{
			onSuccess(postData) {
				if (postData)
					[
						queryKeys.posts,
						queryKeys.followingsPosts(user._id),
						queryKeys.userPosts(postData.author._id),
					].forEach(key => {
						queryClient.setQueryData<
							InfiniteData<DataWithPagination<{ posts: Post[] }>>
						>(
							key,
							oldData =>
								oldData && {
									...oldData,
									pages: oldData.pages.map(page => ({
										...page,
										posts: page.posts.map(post =>
											post._id === postData._id
												? postData
												: post
										),
									})),
								}
						)
					})

				postData &&
					queryClient.setQueryData<Post>(
						queryKeys.postDetail(postData._id),
						oldData => oldData && { ...oldData, ...postData }
					)

				setIsOpen(false)
			},
		}
	)

	const onSubmit = handleSubmit(async ({ content }) => {
		let imagesUploaded: string[] = []

		if (images.length > 0) {
			setIsImagesUploading(true)

			for (let image of images) {
				if (image.file) {
					const url = await uploadImage(image.file)
					imagesUploaded.push(url)
				} else {
					image.dataURL && imagesUploaded.push(image.dataURL)
				}
			}

			setIsImagesUploading(false)
		}

		mutate({ content, images: imagesUploaded })
	})

	const autoResize = () => {
		if (textareaRef.current) {
			textareaRef.current.style.height = 'auto'
			textareaRef.current.style.height =
				textareaRef.current.scrollHeight + 'px'
		}
	}

	useEffect(autoResize, [])

	return (
		<form
			onSubmit={onSubmit}
			className='flex flex-col max-h-[calc(100vh-5rem)]'
		>
			{(isLoading || isImagesUploading) && <Loader />}

			<h2 className='text-2xl font-semibold pb-4 flex-grow'>
				Chỉnh sửa bài post
			</h2>

			<div className='overflow-y-auto scroll-sm -mx-3 px-2 pt-6 flex-1 pb-10'>
				<div className='flex items-center'>
					<Avatar alt='' size={11} noRing src={user.avatar} />
					<div className='ml-3'>
						<h3 className='font-semibold'>{user.fullName}</h3>

						<span className='inline-flex mt-1 text-xs text-blue-900/75 py-1 px-2 font-medium rounded-lg bg-slate-100 items-center'>
							<GlobalIcon className='h-3.5 mr-1.5' />
							Mọi người
						</span>
					</div>
				</div>

				<div className='mb-6 mt-3'>
					<textarea
						autoFocus
						className='w-full min-h-[10rem] bg-slate-50/50 rounded-2xl caret-blue-500 p-3 text-lg resize-none'
						placeholder={`${user.fullName} ơi, bạn đang nghĩ gì thế?`}
						{...registerReturn}
						ref={e => {
							ref(e)
							textareaRef.current = e
						}}
						spellCheck={false}
						onInput={autoResize}
						rows={5}
					></textarea>

					{errors.content?.message && (
						<Error>{errors.content.message}</Error>
					)}
				</div>

				<ReactImageUploading
					value={images}
					multiple
					onChange={value => setImages(value)}
					maxFileSize={1024 * 1024}
					maxNumber={20}
				>
					{({
						dragProps,
						onImageUpload,
						imageList,
						onImageRemove,
						onImageUpdate,
						errors,
					}) => (
						<div className='space-y-8'>
							{imageList.length > 0 && (
								<div className='space-y-8'>
									{imageList.map(
										(image, index) =>
											!!image.dataURL && (
												<div
													key={index}
													className='relative'
												>
													<Image
														src={image.dataURL}
														alt=''
														rounded='2xl'
														ratio={[16, 9]}
														className='ring-1 ring-offset-8 ring-blue-900/5'
													/>
													<div className='flex space-x-2 items-center absolute top-3 right-4'>
														<span
															onClick={() =>
																onImageUpdate(
																	index
																)
															}
															className='flex items-center justify-center w-8 h-8 rounded-full bg-slate-900/25 transition hover:bg-slate-900/30 text-white cursor-pointer'
														>
															<EditIcon className='h-4' />
														</span>

														<span
															onClick={() =>
																onImageRemove(
																	index
																)
															}
															className='flex items-center justify-center w-8 h-8 rounded-full bg-slate-900/25 transition hover:bg-slate-900/30 text-white cursor-pointer'
														>
															<CloseIcon className='h-4' />
														</span>
													</div>
												</div>
											)
									)}
								</div>
							)}

							<div>
								<div className='p-2 rounded-2xl border border-blue-900/5'>
									<div
										{...dragProps}
										onClick={onImageUpload}
										className='flex w-full transition hover:bg-slate-200/75 bg-slate-200/50 rounded-xl items-center cursor-pointer h-36 justify-center flex-col'
									>
										<GalleryBoldIcon className='h-12 opacity-10' />

										<span className='text-lg mt-2 font-medium opacity-40'>
											Thêm ảnh/video
										</span>
									</div>
								</div>

								{errors?.maxFileSize && (
									<Error>Kích thước ảnh quá lớn</Error>
								)}
								{errors?.maxNumber && (
									<Error>Chỉ tối đa 20 ảnh</Error>
								)}
							</div>
						</div>
					)}
				</ReactImageUploading>

				<div className='flex mt-16 items-center justify-end space-x-3'>
					<Button
						component='div'
						onClick={() => setIsOpen(false)}
						color='slate'
					>
						Hủy
					</Button>
					<Button>Lưu</Button>
				</div>
			</div>
		</form>
	)
}
