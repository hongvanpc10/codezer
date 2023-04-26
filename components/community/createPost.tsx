import { useState } from 'react'
import ReactImageUploading, { ImageListType } from 'react-images-uploading'
import { User } from '~/apiServices/usersService'
import { useAuth } from '~/hooks'
import Avatar from '../avatar'
import {
	CloseIcon,
	EditIcon,
	GalleryBoldIcon,
	GlobalIcon,
	VideoIcon,
} from '../icons'
import Image from '../image'
import Modal from '../modal'
import Button from '../button'
import { useForm } from 'react-hook-form'
import { Error } from '../form'
import { useMutation } from '@tanstack/react-query'
import { CreatePostData } from '~/apiServices/postsServices'
import { postsService } from '~/apiServices'
import Loader from '../loader'
import uploadImage from '~/utils/uploadImage'

export default function CreatePost() {
	const { auth } = useAuth()
	const user = auth?.data

	return user ? (
		<div className='bg-white/90 rounded-3xl px-5 pt-6 pb-4 shadow-lg shadow-blue-900/5'>
			<div className='flex items-center'>
				<Avatar size={9} noRing alt='' src={user.avatar} />
				<Modal
					render={setIsOpen => (
						<CreatePostModal
							setIsOpen={setIsOpen}
							user={user}
							accessToken={auth.accessToken}
						/>
					)}
					defaultOpen={false}
					maxWidth='xl'
					scale={false}
					closeable={false}
				>
					{setIsOpen => (
						<input
							onClick={() => setIsOpen(true)}
							placeholder='Bạn đang nghĩ gì?'
							className='py-2.5 cursor-pointer transition placeholder:text-blue-900/50 hover:bg-blue-50/75 px-6 bg-blue-50/50 rounded-full flex-1 ml-2.5'
						/>
					)}
				</Modal>
			</div>

			<hr className='mt-4 mb-2 border-blue-900/5' />

			<div className='flex items-center'>
				<button className='flex-1 transition hover:bg-slate-100 font-medium justify-center py-2 rounded-xl flex items-center mr-1'>
					<GalleryBoldIcon className='h-7 mr-3 text-green-500' />
					Ảnh
				</button>
				<button className='flex-1 transition hover:bg-slate-100 font-medium justify-center py-2 rounded-xl flex items-center ml-1'>
					<VideoIcon className='h-7 mr-3 text-rose-500' />
					Video
				</button>
			</div>
		</div>
	) : null
}

interface CreatePostModalProps {
	setIsOpen: Function
	user: User
	accessToken: string
}

function CreatePostModal({
	setIsOpen,
	user,
	accessToken,
}: CreatePostModalProps) {
	const [images, setImages] = useState<ImageListType>([])
	const [isImagesUploading, setIsImagesUploading] = useState(false)

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<{ content: string }>()

	const { isLoading, mutate } = useMutation(
		(data: CreatePostData) => postsService.create(data, accessToken),
		{
			onSuccess() {
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
				}
			}

			setIsImagesUploading(false)
		}

		mutate({ content, images: imagesUploaded })
	})

	return (
		<form
			onSubmit={onSubmit}
			className='flex flex-col max-h-[calc(100vh-5rem)]'
		>
			{(isLoading || isImagesUploading) && <Loader />}

			<h2 className='text-2xl font-semibold mb-8 flex-grow'>
				Tạo bài post mới
			</h2>

			<div className='overflow-y-auto scroll-sm -mx-3 px-2 flex-1 pb-10'>
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
						className='w-full bg-slate-50/50 rounded-2xl caret-blue-500 p-3 text-lg resize-none'
						placeholder={`${user.fullName} ơi, bạn đang nghĩ gì thế?`}
						rows={3}
						{...register('content', {
							required: 'Vui lòng nhập nội dung bài post',
						})}
						spellCheck={false}
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
					maxNumber={10}
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
									<Error>Chỉ tối đa 10 ảnh</Error>
								)}
							</div>
						</div>
					)}
				</ReactImageUploading>
			</div>

			<div className='flex pt-3 bg-white/450 items-center justify-end space-x-3'>
				<Button
					component='div'
					onClick={() => setIsOpen(false)}
					color='slate'
				>
					Hủy
				</Button>
				<Button>Đăng</Button>
			</div>
		</form>
	)
}
