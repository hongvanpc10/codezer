import { useEffect, useState } from 'react'
import Image from './image'
import ImagesViewer from './imagesViewer'

interface Props {
	images: string[]
}

export default function ImagesGrid({ images }: Props) {
	const [isOpen, setIsOpen] = useState(-1)

	return (
		<>
			<div
				className={`grid ${
					images.length >= 5
						? 'grid-cols-7 grid-rows-6'
						: images.length >= 3
						? 'grid-cols-2 grid-rows-2'
						: images.length === 2
						? 'grid-cols-1 grid-rows-2'
						: 'grid-cols-1 grid-rows-1'
				} gap-2`}
			>
				{images
					.slice(0, 5)
					.map((image, index) => ({
						url: image,
						className:
							images.length === 3
								? index === 1
									? 'row-span-2'
									: ''
								: images.length > 4
								? [
										'col-span-4 row-span-3',
										'col-span-3 row-span-2',
										'col-span-3 row-span-2',
										'col-span-4 row-span-3',
										'col-span-3 row-span-2',
								  ][index]
								: '',
						ratio:
							images.length >= 5
								? [5, 3]
								: images.length === 4
								? [1, 1]
								: images.length === 3
								? [4, index === 1 ? 6 : 3]
								: images.length === 2
								? [16, 7]
								: [16, 9],
					}))
					.map((image, index) => (
						<div
							className={`${image.className} relative cursor-pointer inline-flex`}
							key={index}
							onClick={() => setIsOpen(index)}
						>
							<Image
								alt=''
								rounded='md'
								src={image.url}
								ratio={image.ratio}
								className='ring-1 ring-blue-900/10'
								sizes={[100, 33, 33]}
							/>

							{images.length > 5 && index === 4 && (
								<div className='absolute text-white rounded-md text-3xl font-medium inset-0 flex items-center justify-center bg-slate-900/25'>
									+{images.length - 5}
								</div>
							)}
						</div>
					))}
			</div>

			<ImagesViewer
				images={images}
				isOpen={isOpen}
				setIsOpen={setIsOpen}
			/>
		</>
	)
}
