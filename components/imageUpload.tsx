import ReactImageUploading, {
	ImageUploadingPropsType,
} from 'react-images-uploading'
import Button from './button'
import Error from './form/error'
import { GalleryIcon } from './icons'
import Image from './image'

export default function ImageUpload(props: ImageUploadingPropsType) {
	return (
		<ReactImageUploading maxFileSize={1024 * 1024} {...props}>
			{({
				dragProps,
				onImageUpload,
				imageList,
				onImageRemove,
				onImageUpdate,
				errors,
			}) => (
				<>
					{imageList[0] ? (
						<>
							<Image
								alt=''
								src={String(imageList[0].dataURL)}
								ratio={[16, 9]}
								rounded='2xl'
							/>

							<div className='mt-1 flex space-x-2'>
								<Button
									onClick={() => onImageUpdate(0)}
									small
									color='lightBlue'
									component='div'
								>
									Đổi
								</Button>

								<Button
									small
									color='lightRed'
									onClick={() => onImageRemove(0)}
									component='div'
								>
									Xoá
								</Button>
							</div>
						</>
					) : (
						<div
							onClick={onImageUpload}
							{...dragProps}
							className='w-full rounded-3xl flex flex-col items-center py-6 border-blue-500 border-2 border-dashed shadow-2xl shadow-blue-900/10 transition cursor-pointer hover:bg-blue-100/60 bg-blue-50'
						>
							<GalleryIcon className='h-16 text-blue-200' />
							<span className='font-medium px-5 text-center mt-4 text-[1.0625rem] text-blue-900/50'>
								Kéo ảnh vào đây hoặc chọn từ tệp
							</span>
						</div>
					)}

					{errors?.maxFileSize && (
						<Error>Kích thước ảnh quá lớn</Error>
					)}
				</>
			)}
		</ReactImageUploading>
	)
}
