import BaseImage from 'next/image'
import { CSSProperties, useState, useEffect, memo } from 'react'
import images from '~/assets/images'

interface Props {
	src: string
	alt: string
	width?: number | string
	height?: number | string
	className?: string
	containerClassName?: string
	rounded?: boolean | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | 'full'
	ratio?: number[]
	fallback?: string
	sizes?: [number, number, number]
}

export default memo(function Image({
	alt,
	src,
	height,
	width,
	className,
	containerClassName,
	rounded,
	ratio,
	fallback: _fallback = images.placeholder,
	sizes = [100, 100, 100],
}: Props) {
	const style: CSSProperties = {}

	const [fallback, setFallback] = useState<string>(src ? '' : _fallback)

	if (typeof width === 'string') style.width = width
	if (typeof height === 'string') style.height = height

	function handleError() {
		setFallback(_fallback)
	}

	return (
		<div
			className={`relative inline-block ${containerClassName} ${
				width ? typeof width === 'number' && `w-${width}` : 'w-full'
			} ${typeof height === 'number' && `h-${height}`} ${
				ratio && `aspect-w-${ratio[0]} aspect-h-${ratio[1]}`
			}`}
			style={style}
		>
			<BaseImage
				src={fallback || src}
				alt={alt}
				fill
				className={`${className} ${
					rounded &&
					(rounded === true ? 'rounded' : 'rounded-' + rounded)
				} object-cover`}
				onError={handleError}
				sizes={`(max-width: 768px) ${sizes[0]}vw,(max-width: 1200px) ${sizes[1]}vw,${sizes[2]}vw`}
			/>
		</div>
	)
})
