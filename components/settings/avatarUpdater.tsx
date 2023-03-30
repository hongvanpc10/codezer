import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import { FormEventHandler, useState } from 'react'
import ReactImageUploading, { ImageListType } from 'react-images-uploading'
import { usersService } from '~/apiServices'
import routes from '~/config/routes'
import { useAuth } from '~/hooks'
import uploadImage from '~/utils/uploadImage'
import Avatar from '../avatar'
import Button from '../button'
import { Error } from '../form'
import { CameraIcon } from '../icons'
import Loader from '../loader'
import Label from './label'

export default function AvatarUpdater({ value }: { value: string }) {
	const [avatar, setAvatar] = useState<ImageListType>([])

	const { auth, updateUser } = useAuth()

	const user = auth?.data
	const accessToken = auth?.accessToken

	const [isImageUploading, setIsImageUploading] = useState(false)

	const router = useRouter()

	const { mutate } = useMutation(
		(data: any) => usersService.update(data, accessToken as string),
		{
			onSuccess(data) {
				data && updateUser(data)
				router.push(routes.profile(data?.slug as string))
			},
			onMutate(data) {
				updateUser({ ...user, ...data })
			},
		}
	)

	const handleSubmit: FormEventHandler<HTMLFormElement> = async e => {
		e.preventDefault()

		if (avatar[0] && avatar[0].file) {
			let uploadedImage

			setIsImageUploading(true)
			uploadedImage = await uploadImage(avatar[0].file)
			setIsImageUploading(false)

			mutate({ avatar: uploadedImage })
		}
	}

	return (
		<>
			{isImageUploading && <Loader />}

			<Label>Avatar</Label>

			<form onSubmit={handleSubmit}>
				<ReactImageUploading
					value={avatar}
					onChange={setAvatar}
					maxFileSize={1024 * 1024}
				>
					{({
						onImageUpload,
						imageList,
						dragProps,
						onImageRemove,
						errors,
					}) => (
						<>
							<div className='flex items-center justify-between mt-3'>
								<div
									{...dragProps}
									className='inline-flex items-center justify-center relative'
									onClick={onImageUpload}
								>
									<Avatar
										alt=''
										src={
											imageList[0]
												? (imageList[0]
														.dataURL as string)
												: value
										}
										size={36}
										sizes={[75, 20, 15]}
									/>

									<CameraIcon className='h-8 absolute text-blue-900/75' />
								</div>

								<div className='flex items-center justify-end flex-1 space-x-2'>
									{imageList[0] && (
										<>
											<Button small color='lightBlue'>
												Lưu
											</Button>

											<Button
												small
												color='lightRed'
												component='div'
												onClick={() => onImageRemove(0)}
											>
												Xoá
											</Button>
										</>
									)}
								</div>
							</div>

							{errors?.maxFileSize && (
								<Error>Kích thước ảnh quá lớn</Error>
							)}
						</>
					)}
				</ReactImageUploading>
			</form>
		</>
	)
}
